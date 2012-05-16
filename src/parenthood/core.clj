(ns parenthood.core
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [hiccup.page-helpers :only [html5]])
  (:require [noir.request :as request]
            [noir.server :as server]
            [parenthood.db :as db]))

(defpage "/" [] "Hello World!")

(defpage "/response/:id" {:keys [id]}
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        ip (:remote-addr request)
        unique (db/add-response id user-agent ip)]
    (html (html5 [:p ip] [:p user-agent] [:p unique]))))

(defpage "/study/" []
  (let [id (first (db/all-studies))
        study (db/get-study id)]
    (html (html5 [:p (:name study)]))))

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))
