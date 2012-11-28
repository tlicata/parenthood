(ns parenthood.email
  (:require [clojure.string :as string]
            [postal.core :as postal]))

(def port (System/getenv "MAILGUN_SMTP_PORT"))
(def server (System/getenv "MAILGUN_SMTP_SERVER"))
(def login (System/getenv "MAILGUN_SMTP_LOGIN"))
(def password (System/getenv "MAILGUN_SMTP_PASSWORD"))
(def email (System/getenv "EMAIL"))

(defn emails-as-array [csv]
  (if (string? csv)
    (map string/trim (string/split csv #","))
    ""))

(defn send-email [subject body]
  (postal/send-message ^{:host server
                         :user login
                         :pass password
                         :ssl true}
                       {:from "parenthood"
                        :to (emails-as-array email)
                        :subject subject
                        :body body}))
