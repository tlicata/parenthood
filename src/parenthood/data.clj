(ns parenthood.data
  (:require [clojure.data.json :as json]
            [parenthood.db :as db]))

;; math
(defn avg [times]
  (/ (reduce + times) (count times)))
(defn standard-deviation [times]
  (let [n (count times)
        mean (avg times)
        intermediate (map #(Math/pow (- %1 mean) 2) times)]
    (Math/sqrt
          (/ (reduce + intermediate) (- n 1)))))

;; when we get the data out of the database, the top level
;; has been parsed out of json, but the results value is
;; still in json, so we need to extract that.
(defn parse [data]
  (assoc data :results (json/read-json (:results data))))

;; functions for branching on screen type
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

;; validation helpers
(defn under-300? [screen]
  (and (trial? screen)
       (< (:done screen) 300)))
(defn over-10000? [screen]
  (and (trial? screen)
       (> (:done screen) 10000)))

;; turn raw data into a more minimal/readable format
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
(defn make-readable-shrink-data [screens]
  (map shrink screens))
(defn make-readable-helper [raw]
  (let [parsed (map parse raw)
        readable (map #(make-readable-shrink-data (:results %)) parsed)]
    readable))
(defn make-readable [id]
  (make-readable-helper (db/only-responses id)))

;; extract a single block (or only its trials) from a user's test
(defn get-block [blockname screens]
  (let [start (drop-while #(not= (:blockname %) blockname) screens)]
    (take-while (fn [trial]
                  (let [name (:blockname trial)]
                    (or (nil? name) (= name blockname))))
                start)))
(defn get-trials [blockname screens]
  (let [block (get-block blockname screens)]
    (filter trial? block)))

;; helper functions
(defn pluck-times [trials]
  (map :done trials))
(defn set-less-than-300-to-300 [trial]
  (if (under-300? trial)
    (assoc trial :done 300)
    trial))

(defn score [incomp comp]
  (let [incomp-times (pluck-times incomp)
        comp-times (pluck-times comp)
        incomp-avg-latency (avg incomp-times)
        comp-avg-latency (avg comp-times)
        std-dev (standard-deviation (concat incomp-times comp-times))]
    (/ (- incomp-avg-latency comp-avg-latency) std-dev)))
(defn score-iat [screens]
  (let [pract (score (get-trials "incompatiblepractice" screens)
                     (get-trials "compatiblepractice" screens))
        test (score (get-trials  "compatiblepractice" screens)
                    (get-trials "incompatibletest" screens))]
    (avg [pract test])))

(defn generate-iat [id]
  (let [readable (first (make-readable id))
        trials (filter trial? readable)]
    {:subjectId id
     :total_incorrect (count (remove :correct trials))
     :flat_300_percent (/ (count (filter under-300? trials)) (count trials))
     :iatall (score-iat readable)
     :iat300recode (score-iat (map set-less-than-300-to-300 readable))
     :iat300remove (score-iat (remove under-300? readable))
     :iat10trials (score-iat (remove over-10000? readable))}))
