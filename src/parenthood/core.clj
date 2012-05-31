(ns parenthood.core
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [hiccup.page-helpers :only [html5 include-js]])
  (:require [noir.response :as response]
            [noir.request :as request]
            [noir.server :as server]
            [parenthood.db :as db]))

(defpage "/" [] "Hello World!")

(defpage "/partner-iat.html" {:keys [id]}
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        ip (:remote-addr request)
        unique (db/add-response id user-agent ip)]
    (html
     (html5
      [:head
       (include-js
        "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
        "/js/lib/underscore-min.js"
        "/js/partner-iat.js")]
      [:body
       [:script {:type "text/javascript"}
        (str "$(function(){window.parenthood.init("
             unique
             ")}());")]]))))

(defpage [:post "/partner-iat.html"] {:keys [id results unique]}
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        ip (:remote-addr request)
        fresh (db/update-response id unique user-agent ip results)]
    (if fresh
      (response/json fresh)
      (response/status 403 {}))))

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))

