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
  ([id]
     (get-response id nil))
  ([id unique]
     (let [key (response-key id)]
       (if (nil? unique)
         (redis/hkeys db key)
         (json/read-json (redis/hget db key unique))))))
(defn del-response
  ([id]
     (redis/del db [(response-key id)]))
  ([id unique]
     (redis/hdel db (response-key id) unique)))
(defn all-responses []
  (map response-fix (get-keys (response-key "*"))))

;; studies
(def study-prefix "study:")
(defn study-fix [key]
  (second (string/split key #"study:")))
(defn add-study [id tree]
  (redis/set db (str study-prefix id) (json/json-str tree)))
(defn get-study [id]
  (json/read-json (redis/get db (str study-prefix id))))
(defn all-studies []
  (map study-fix (get-keys (str study-prefix "*"))))

;; users
(defn user-key [id] (str "user:" id))
(defn add-user [id]
  (let [key (user-key id)]
    (if (redis/exists db key)
      (throw (Exception. "User already exists"))
      (redis/hset db key "responses" (json/json-str [])))))
(defn del-user [id]
  (redis/del db [(user-key id)]))
(defn get-user [id]
  (redis/hgetall db (user-key id)))
(defn get-user-responses [id]
  (redis/hget db (user-key id) "responses"))
(defn all-users []
  (get-keys (user-key "*")))
