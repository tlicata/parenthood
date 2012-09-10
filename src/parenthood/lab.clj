(ns parenthood.lab
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]
            [parenthood.data :as data]))

(defn get-all-blocks [screens]
  (concat (data/get-block "getTargetItems" screens)
          (data/get-block "incompatiblepractice" screens)
          (data/get-block "incompatibletest" screens)
          (data/get-block "compatiblepractice" screens)
          (data/get-block "compatibletest" screens)))

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
      (fn [{results :results}]
        (let [all (get-all-blocks results)
              with-dates (append-day-and-time all)
              with-ids (append-id id with-dates)]
          with-ids))
      (db/only-responses id))))