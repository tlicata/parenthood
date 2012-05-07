(ns parenthood.db
  (:require [clj-redis.client :as redis]
            [clojure.data.json :as json]))

(def db-url (System/getenv "REDISTOGO_URL"))
(def db (redis/init {:url (if (nil? db-url)
                             "http://localhost:6379"
                             db-url)}))

;; redis helpers
(defn get-keys [pattern]
  (redis/keys db pattern))
(defn inspect-top-level []
  (get-keys nil))

;; studies
(def study-prefix "study:")
(defn add-study [id tree]
  (redis/set db (str study-prefix id) (json/json-str tree)))
(defn get-study [id]
  (json/read-json (redis/get db (str study-prefix id))))
(defn all-studies []
  (get-keys (str study-prefix "*")))

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
