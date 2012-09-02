(ns parenthood.data
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]))

;; when we get the data out of the database, the top level
;; has been parsed out of json, but the results value is
;; still in json, so we need to extract that.
(defn parse [data]
  (assoc data :results (json/read-json (:results data))))

(defn screen-type [screen]
  (if (contains? screen :id)
    :input
    (if (contains? screen :blockname)
      :instructions
      (if (contains? screen :word) :trial :unknown))))
(defn input? [screen]
  (= :input (screen-type screen)))
(defn instructions? [screen]
  (= :instructions (screen-type screen)))
(defn trial? [screen]
  (= :trial (screen-type screen)))

(defn under-300? [screen]
  (and (trial? screen)
       (< (:done screen) 300)))
(defn over-1000? [screen]
  (and (trial? screen)
       (> (:done screen) 10000)))

(defmulti shrink screen-type)
(defmethod shrink :input [screen]
  {:id (:id screen)
   :cat (:inputCategory screen)
   :resp (:response screen)})
(defmethod shrink :instructions [screen]
  {:time (:time screen)
   :blockname (:blockname screen)})
(defmethod shrink :trial [screen]
  (let [start (:time screen)
        responses (:responses screen)]
    {:word (:word screen)
     :tries (count responses)
     :done (- (:time (last responses)) start)
     :correct (== 1 (count responses))}))

(defn shrink-data [screens]
  (map shrink screens))
(defn make-readable [raw]
  (let [parsed (map parse raw)
        readable (map #(shrink-data (:results %)) parsed)]
    readable))

(defn generate-report
  ([]
     (make-readable (db/only-responses)))
  ([id]
     (make-readable (db/only-responses id))))
