(ns parenthood.core
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [hiccup.page-helpers :only [html5]])
  (:require [noir.server :as server]
            [parenthood.db :as db]))

(defpage "/" [] "Hello World!")

(defpage "/study/" []
  (let [id (first (db/all-studies))
        study (db/get-study id)]
    (html (html5 [:p (:name study)]))))

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))
