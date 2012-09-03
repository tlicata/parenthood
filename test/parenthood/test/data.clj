(ns parenthood.test.data
  (:use [parenthood.data])
  (:use [clojure.test]))

(deftest test-avg
  (is (= (avg [1 2 3 4 5]) 3))
  (is (= (avg [0 0 0 0 0]) 0))
  (is (= (avg [2]) 2))
  (is (= (avg [-2 -1 0 1 2]) 0)))

(deftest test-std-dev
  (is (= (standard-deviation [2 4 4 4 5 5 7 9]) 2.0))
  (is (= (standard-deviation [4 2 5 8 6.0]) 2.0)))