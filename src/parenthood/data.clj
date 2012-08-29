(ns parenthood.data
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]))

;; when we get the data out of the database, the top level
;; has been parsed out of json, but the results value is
;; still in json, so we need to extract that.
(defn parse [data]
  (assoc data :results (json/read-json (:results data))))

(defn screen-type [screen]
  (if (contains? screen :prompt)
    :input
    (if (contains? screen :instructions)
      :instructions
      (if (contains? screen :word) :trial :unknown))))

(defmulti shrink screen-type)
(defmethod shrink :input [screen]
  {:id (:id screen)
   :cat (:inputCategory screen)
   :resp (:response screen)})
(defmethod shrink :instructions [screen]
  {:time (:time screen)})
(defmethod shrink :trial [screen]
  (let [start (:time screen)
        responses (:responses screen)]
    {:word (:word screen)
     :tries (count responses)
     :done (- (:time (last responses)) start)}))

(defn shrink-data [results]
  (map shrink results))

(defn generate-report []
  (let [raw (db/only-responses)
        parsed (map parse raw)
        readable (map #(shrink-data (:results %)) parsed)]
    readable))
