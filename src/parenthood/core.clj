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
        unique (db/add-response id user-agent)]
    (html
     (html5
      [:head
       (include-js
        "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
        "/js/lib/underscore-min.js"
        "/js/partner-iat.js?5")]
      [:body
       [:script {:type "text/javascript"}
        (str "$(function(){window.parenthood.init("
             unique
             ")}());")]]))))

(defpage [:post "/partner-iat.html"] {:keys [id results unique]}
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        fresh (db/update-response id unique user-agent results)]
    (if (nil? fresh)
      (response/status 403 "cannot overwrite existing data")
      (do
        (println (str "successful post to " id ":" unique))
        (response/json fresh)))))

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))

