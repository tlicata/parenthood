(ns parenthood.data
  (:require [clojure.data.json :as json]
            [clojure.string :as string]
            [clojure-csv.core :as csv]
            [parenthood.db :as db]))

;; math
(defn avg [times]
  (let [total (count times)]
    (when-not (= total 0)
      (/ (reduce + times) total))))
(defn standard-deviation [times]
  (let [n (count times)]
    (if (= n 1)
      (first times)
      (when-not (= n 0)
        (let [mean (avg times)
              intermediate (map #(Math/pow (- % mean) 2) times)]
          (Math/sqrt
           (/ (reduce + intermediate) (- n 1))))))))

;; date
(def date-format (java.text.SimpleDateFormat. "yyyy-MM-dd HH:mm"))
(defn print-date [timestamp]
  (try
    (.format date-format (java.util.Date. timestamp))
    (catch Exception _ "Invalid Date")))
(defn sort-by-date [things-with-dates]
  {:pre [(every? :date things-with-dates)]}
  (sort-by :date things-with-dates))

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
(defn make-readable [raw]
  (map shrink (:results raw)))

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
(defn valid-id? [id]
  (and (not (nil? id)) (re-matches #".*0[1,2].*" id)))
(defn pluck-times [trials]
  (map :done trials))
(defn set-less-than-300-to-300 [trial]
  (if (under-300? trial)
    (assoc trial :done 300)
    trial))

;; scoring
(def incomp-pract "incompatiblepractice")
(def comp-pract "compatiblepractice")
(def incomp-test "incompatibletest")
(def comp-test "compatibletest")

(def scoreable-blocks [incomp-pract comp-pract incomp-test comp-test])

(defn get-scoreable-trials [screens]
  (apply concat (map #(get-trials % screens) scoreable-blocks)))

(defn score-lab-version [incomp comp mean-difference]
  (let [avg-std (avg [(standard-deviation incomp)
                      (standard-deviation comp)])]
    (/ mean-difference avg-std)))
(defn score-my-version [incomp comp mean-difference]
  (let [std-dev (standard-deviation (concat incomp comp))]
    (/ mean-difference std-dev)))
(defn score [incomp comp]
  (let [incomp-times (pluck-times incomp)
        comp-times (pluck-times comp)
        mean-difference (- (avg incomp-times) (avg comp-times))]
    (score-lab-version incomp-times comp-times mean-difference)))
(defn score-iat [screens]
  (try
    (let [pract (score (get-trials incomp-pract screens)
                       (get-trials comp-pract screens))
          test (score (get-trials incomp-test screens)
                      (get-trials comp-test screens))]
      (float (avg [pract test])))
    (catch Exception e Double/NaN)))

(defn generate-iat
  ([]
   (let [ids (filter valid-id? (db/get-response))]
       (flatten (map generate-iat ids))))
  ([id]
   (sort-by-date
    (flatten
     (map (fn [raw]
            (let [data (make-readable raw)
                  trials (get-scoreable-trials data)
                  total (count trials)]
              {:subjectId id
               :date (print-date (:timestamp raw))
               :total_incorrect (count (remove :correct trials))
               :flat_300_percent (float (/ (count (filter under-300? trials)) total))
               :iatall (score-iat data)
               :iat300recode (score-iat (map set-less-than-300-to-300 data))
               :iat300remove (score-iat (remove under-300? data))
               :iat10trials (score-iat (remove over-10000? data))}))
          (db/only-responses id))))))
(defn generate-nth-iat [n]
  (let [ids (filter valid-id? (db/get-response))
        iats-by-user (map generate-iat ids)
        the-nth #(nth % n nil)]
    (remove nil? (map the-nth iats-by-user))))
(def generate-iat-memo (memoize generate-iat))

(defn make-csv [results]
  (let [csv-head (map name (keys (first results)))]
    (csv/write-csv (concat [csv-head] (map #(map str (vals %)) results)) :end-of-line "\r\n")))

(defn write-to-file-iat [n]
  (with-open [w (clojure.java.io/writer (str "iat" (+ n 1) ".csv"))]
    (.write w (make-csv (generate-nth-iat n)))))
