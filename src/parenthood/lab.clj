(ns parenthood.lab
  (:use [clojure.string :only [join]]
        [clojure-csv.core :only [write-csv]])
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]
            [parenthood.data :as data]))

(defn get-num [blockname]
  (case blockname
    "getTargetItems" "1"
    "incompatiblepractice" "4"
    "incompatibletest" "6"
    "compatiblepractice" "8"
    "compatibletest" "10"))

(defn with-blockcode [blockname screens]
  (let [existing (data/get-block blockname screens)
        to-append {:blockcode blockname :blocknum (get-num blockname)}]
    (map #(merge % to-append) existing)))

(defn get-all-blocks [screens]
  (concat (with-blockcode "getTargetItems" screens)
          (with-blockcode "incompatiblepractice" screens)
          (with-blockcode "incompatibletest" screens)
          (with-blockcode "compatiblepractice" screens)
          (with-blockcode "compatibletest" screens)))

(defn append-day-and-time [screens]
  (let [date (java.util.Date. (:time (first screens)))
        day (. (java.text.SimpleDateFormat. "MMddyy") format date)
        time (. (java.text.SimpleDateFormat. "HH:mm") format date)
        cols {:date day :time time}]
    (map #(merge % cols) screens)))

(defn append-id [id screens]
  (map #(assoc % :subject id) screens))

(defn make-csv [results]
  (let [csv-head ["date" "time" "subject" "blockcode" "blocknum"
                  "response" "correct" "RT"]
        to-csv (fn [%]
                 [(:date %) (:time %) (:subject %)
                  (:blockcode %) (:blocknum %)
                  (if (nil? (:resp %)) "" (:resp %))
                  (if (:correct %) "1" "0") (str (:done %))])]
    (write-csv (concat [csv-head] (map to-csv results)) :end-of-line "\r\n")))

(defn valid-id? [id]
  (and (not (nil? id)) (re-matches #".*0[1,2]?.*" id)))

(defn output-lab-iat-format
  ([]
     (let [ids (filter valid-id? (db/get-response))]
       (mapcat output-lab-iat-format ids)))
  ([id]
     (map
      (fn [results]
        (let [all (get-all-blocks results)
              with-dates (append-day-and-time all)
              with-ids (append-id id with-dates)]
          (make-csv (remove data/instructions? with-ids))))
      (data/make-readable (db/only-responses id)))))

(defn write-to-file []
  (with-open [w (clojure.java.io/writer "all.csv")]
    (doseq [line (output-lab-iat-format)]
      (.write w line))))
