(ns parenthood.db
  (:require [clj-redis.client :as redis]
            [clojure.data.json :as json]
            [clojure.string :as string]))

(def db-url (System/getenv "REDISTOGO_URL"))
(def db (redis/init {:url (if (nil? db-url)
                             "http://localhost:6379"
                             db-url)}))

;; redis helpers
(defn get-keys [pattern]
  (redis/keys db pattern))
(defn inspect-top-level []
  (get-keys nil))

(defn has-response-data? [response]
  (contains? response :results))

;; responses
(defn response-key [id] (str "response:" id))
(defn response-fix [key]
  (second (string/split key #"response:")))


(defn get-id [id]
  (redis/hgetall db (response-key id)))
(defn get-uniques [id]
  (redis/hkeys db (response-key id)))
(defn get-iat [id unique]
  (redis/hget db (response-key id) unique))

(defn add-response [id user-agent ip]
  (let [unique (str (redis/incr db "responses"))
        key (response-key id)
        date (. (java.util.Date.) toString)
        body {:user-agent user-agent :ip ip :timestamp date}]
    (do
      (redis/hset db key unique (json/json-str body))
      unique)))
(defn get-response
  ([]
     (map response-fix (get-keys (response-key "*"))))
  ([id]
     (map #(get-response id %) (get-uniques id)))
  ([id unique]
     (json/read-json (get-iat id unique))))
(defn update-response [id unique user-agent results]
  (let [key (response-key id)
        stale (get-response id unique)
        fresh (assoc stale :results results)]
    (if (and (= (:user-agent stale) user-agent)
             (not (has-response-data? stale)))
      (do
        (println (str "updating response " id ":" unique))
        (redis/hset db key unique (json/json-str fresh)))
      (println (string/join ":" ["not updating response " id unique user-agent])))))
(defn del-response
  ([id]
     (redis/del db [(response-key id)]))
  ([id unique]
     (redis/hdel db (response-key id) unique)))

;; utils
(defn thaw [data]
  (assoc data :results (json/read-json (:results data))))
(defn non-responses
  ([]
     (let [ids (get-response)]
       (flatten (map non-responses ids))))
  ([id]
     (let [all (get-response id)]
       (remove has-response-data? all))))
(defn non-responses-ids []
  (let [ids (get-response)]
    (filter #(> (count (non-responses %)) 0) ids)))
(defn only-responses
  ([]
     (let [ids (get-response)]
       (flatten (map only-responses ids))))
  ([id]
     (let [all (get-response id)
           done (filter has-response-data? all)]
       (map #(assoc (thaw %) :id id) done))))
(def only-responses-memo (memoize only-responses))
(defn only-responses-ids []
  (let [ids (get-response)]
    (filter #(> (count (only-responses %)) 0) ids)))
(defn only-responses-ids-and-counts []
  (map (fn [id]
         (let [responses (only-responses id)]
           (hash-map :id id :count (count responses))))
       (only-responses-ids)))
