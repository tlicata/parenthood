(ns parenthood.lab
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]
            [parenthood.data :as data]))

(defn get-num [blockname]
  (case blockname
    "getTargetItems" 1
    "incompatiblepractice" 4
    "incompatibletest" 6
    "compatiblepractice" 8
    "compatibletest" 10))

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

(defn output-lab-iat-format
  ([]
     (let [ids (db/get-response)]
       (map output-lab-iat-format ids)))
  ([id]
     (map
      (fn [results]
        (let [all (get-all-blocks results)
              with-dates (append-day-and-time all)
              with-ids (append-id id with-dates)]
          with-ids))
      (data/make-readable (db/only-responses id)))))
