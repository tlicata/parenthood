(ns parenthood.core
  (:use [noir.core :only [defpage]])
  (:require [noir.server :as server]))

(defpage "/" [] "Hello World!")

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))
