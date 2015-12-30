(ns parenthood.core
  (:use [compojure.core :only [defroutes GET POST]]
        [hiccup.core :only [html]]
        [hiccup.page :only [html5 include-css include-js]]
        [ring.middleware.file :only [wrap-file]]
        [ring.middleware.file-info :only [wrap-file-info]]
        [ring.middleware.params :only [wrap-params]])
  (:require [noir.response :as response]
            [noir.request :as request]
            [parenthood.data :as data]
            [parenthood.db :as db]
            [parenthood.email :as email]
            [ring.adapter.jetty :as jetty]))

(def test-id "test-abc-124")

(defn live-iat [unique]
  {:head (include-js
          "/js/lib/jquery-1.7.2.min.js"
          "/js/lib/json2.js"
          "/js/lib/underscore-min.js?1"
          "/js/partner-iat.js?10")
   :body (list [:script {:type "text/javascript"}
                (str "$(function(){window.parenthood.init(" unique ")}());")])})

(defn test-iat [unique]
  (let [live (live-iat unique)
        test {:head (concat
                     (include-js
                      "/js/lib/qunit.js"
                      "/js/test/integration-tests.js")
                     (include-css
                      "/css/lib/qunit.css"))
              :body [[:h1#qunit-header "Integration Tests"]
                     [:h2#qunit-banner]
                     [:div#qunit-testrunner-toolbar]
                     [:h2#qunit-userAgent]
                     [:ol#qunit-tests]
                     [:div#qunit-fixture]]}]
    (merge-with concat live test)))

(defn iat-page [id live request]
  (let [ip (get-in request [:headers "x-forwarded-for"])
        user-agent (get-in request [:headers "user-agent"])
        unique (db/add-response id user-agent ip)
        page (if live (live-iat unique) (test-iat unique))]
    (do
      (try
        (let [subject (str "user " id " started")
              body (str ip " : " user-agent)]
          (email/send-email subject body))
        (catch Exception e nil))
      (html5
       [:head (:head page)]
       [:body (:body page)]))))

(defn store-results
  [id results unique request]
  (let [user-agent (get-in request [:headers "user-agent"])
        fresh (db/update-response id unique user-agent results)]
    (do
      (try
        (let [subject (str "results for user " id)
              body (str (vec (data/generate-iat id)) results user-agent)]
          (email/send-email subject body))
        (catch Exception e nil))
      (if (nil? fresh)
        (response/status 403 "cannot overwrite existing data")
        (do
          (println (str "successful post to " id ":" unique))
          (response/json fresh))))))

(defn convert-str-to-int [str]
  (try
    (Integer/parseInt str)
    (catch NumberFormatException _ nil)))

(defn view-results [id iat format]
  (let [data (doall (if-let [iat-num (convert-str-to-int iat)]
                      (if id
                        (parenthood.data/generate-nth-iat iat-num [id])
                        (parenthood.data/generate-nth-iat-memo iat-num))
                      (if id
                        (parenthood.data/generate-iat id)
                        (parenthood.data/generate-iat-memo))))]
    (if (= format "json")
      (response/json data)
      (html5
       [:head
        (include-css "/css/view-results.css")
        (include-js "/js/lib/jquery-1.7.2.min.js"
                    "/js/lib/jquery.dataTables.min.js"
                    "/js/view-results.js")]
       [:body
        [:table#results
         [:thead
          [:tr
           [:th "ID"]
           [:th "Date"]
           [:th "Total Incorrect"]
           [:th "Flat 300 Percent"]
           [:th "IAT All"]
           [:th "IAT 300 Recode"]
           [:th "IAT 300 Remove"]
           [:th "IAT 10 Trials"]]]
         [:tbody
          (map (fn [x]
                 [:tr
                  [:td (:subjectId x)]
                  [:td (:date x)]
                  [:td (:total_incorrect x)]
                  [:td (Math/ceil (* 100 (:flat_300_percent x)))]
                  [:td (:iatall x)]
                  [:td (:iat300recode x)]
                  [:td (:iat300remove x)]
                  [:td (:iat10trials x)]])
               data)]]]))))

(defroutes routes
  (GET "/" [] "Hello World!")
  (GET "/partner-iat.html" [id :as request]
       (iat-page id true request))
  (GET "/integration-tests.html" [:as request]
       (iat-page test-id false request))
  (GET "/test-data" [unique]
       (response/json (db/get-response test-id unique)))
  (GET "/view-results.html" [id iat format]
       (view-results id iat format))
  (POST "/partner-iat.html" [id results unique :as request]
        (store-results id results unique request))
  (POST "/integration-tests.html" [results unique :as request]
        (store-results test-id results unique request)))

(def app
  (-> #'routes
      wrap-params
      (wrap-file "resources/public")
      wrap-file-info))

(defn -main []
  (let [port (Integer/parseInt (or (System/getenv "PORT") "5000"))]
    (jetty/run-jetty app {:port port})))
