(ns parenthood.core
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [hiccup.page-helpers :only [html5 include-css include-js]])
  (:require [noir.response :as response]
            [noir.request :as request]
            [noir.server :as server]
            [parenthood.db :as db]
            [parenthood.email :as email]))

(def test-id "test-abc-123")

(defn live-iat [unique]
  {:head (include-js
          "/js/lib/jquery-1.7.2.min.js"
          "/js/lib/json2.js"
          "/js/lib/underscore-min.js"
          "/js/partner-iat.js?7")
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

(defn iat-page [id live]
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        unique (db/add-response id user-agent)
        page (if live (live-iat unique) (test-iat unique))]
    (html
     (html5
      [:head (:head page)]
      [:body (:body page)]))))

(defn store-results
  [id results unique]
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
        fresh (db/update-response id unique user-agent results)]
    (do
      (try
        (email/send-email (str "results for user " id)
                          (str results user-agent))
        (catch Exception e nil))
      (if (nil? fresh)
        (response/status 403 "cannot overwrite existing data")
        (response/json fresh)))))

(defpage "/" [] "Hello World!")

(defpage "/partner-iat.html" {:keys [id]}
  (iat-page id true))
(defpage "/integration-tests.html" []
  (iat-page test-id false))

(defpage [:post "/partner-iat.html"] {:keys [id results unique]}
  (store-results id results unique))
(defpage [:post "/integration-tests.html"] {:keys [results unique]}
  (store-results test-id results unique))

(defpage "/test-data" {:keys [unique]}
  (response/json (db/get-response test-id unique)))

(defn -main []
  (let [port (Integer/parseInt (System/getenv "PORT"))]
    (server/start port)))

