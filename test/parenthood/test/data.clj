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

(deftest test-under-300
  (let [under {:done 200 :word "foo"}
        on {:done 300 :word "bar"}
        over {:done 400 :word "baz"}]
    (is (under-300? under))
    (is (not (under-300? on)))
    (is (not (under-300? over)))))

(deftest test-over-10000
  (let [under {:done 300 :word "foo"}
        on {:done 10000 :word "bar"}
        over {:done 10001 :word "baz"}]
    (is (not (over-10000? under)))
    (is (not (over-10000? on)))
    (is (over-10000? over))))
