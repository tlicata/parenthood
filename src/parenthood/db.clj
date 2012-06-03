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

;; responses
(defn response-key [id] (str "response:" id))
(defn response-fix [key]
  (second (string/split key #"response:")))
(defn add-response [id user-agent ip]
  (let [unique (str (redis/incr db "responses"))
        key (response-key id)
        body {:ip ip :user-agent user-agent}]
    (do
      (redis/hset db key unique (json/json-str body))
      unique)))
(defn get-response
  ([]
     (map response-fix (get-keys (response-key "*"))))
  ([id]
     (let [uniques (get-response id nil)]
       (map #(get-response id %) uniques)))
  ([id unique]
     (let [key (response-key id)]
       (if (nil? unique)
         (into #{} (redis/hkeys db key))
         (json/read-json (redis/hget db key unique))))))
(defn update-response [id unique user-agent ip results]
  (let [key (response-key id)
        stale (get-response id unique)
        fresh (assoc stale :results results)]
    (if (and (= (:user-agent stale) user-agent)
             (= (:ip stale) ip))
        (redis/hset db key unique (json/json-str fresh)))))
(defn del-response
  ([id]
     (redis/del db [(response-key id)]))
  ([id unique]
     (redis/hdel db (response-key id) unique)))
