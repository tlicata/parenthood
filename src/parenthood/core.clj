(ns parenthood.core
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [hiccup.page-helpers :only [html5 include-css include-js link-to]])
  (:require [noir.response :as response]
            [noir.request :as request]
            [noir.server :as server]
            [parenthood.data :as data]
            [parenthood.db :as db]
            [parenthood.email :as email]))

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

(defn iat-page [id live]
  (let [request (request/ring-request)
        ip (get-in request [:headers "x-forwarded-for"])
        user-agent (get-in request [:headers "user-agent"])
        unique (db/add-response id user-agent ip)
        page (if live (live-iat unique) (test-iat unique))]
    (do
      (try
        (let [subject (str "user " id " started")
              body (str ip " : " user-agent)]
          (email/send-email subject body))
        (catch Exception e nil))
      (html
       (html5
        [:head (:head page)]
        [:body (:body page)])))))

(defn store-results
  [id results unique]
  (let [request (request/ring-request)
        user-agent (get-in request [:headers "user-agent"])
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

(defpage "/" []
  (html
   (html5
    [:head
     [:title "Transition to Parenthood"]
     (include-css "/css/site.css" "http://fonts.googleapis.com/css?family=Marcellus")]
    [:body
     [:div#container
      [:div#header
       [:h1 "Transition to Parenthood"]
       [:button#signin "Sign In"]]
      [:div#nav
       [:ul
        [:li (link-to "#" "Home")]
        [:li (link-to "#" "Particpate")]
        [:li (link-to "#" "Create Your Own")]
        [:li (link-to "#" "Contact")]]]
      [:div#main
       [:img {:src "/img/ub.jpeg" :alt "University of Buffalo logo"}]]
      [:div#footer]]])))

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

