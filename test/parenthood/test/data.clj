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

(deftest test-get-block
  (let [screens [{:time "0" :blockname "foo"}
                 {:time "100" :blockname "bar"}
                 {:id "x" :cat "x" :resp "x"}
                 {:id "y" :cat "y" :resp "y"}
                 {:time "1000" :blockname "baz"}
                 {:done "1200" :word "a"}
                 {:done "1600" :word "b"}
                 {:done "2000" :word "c"}]]
    (is (= 1 (count (get-block "foo" screens))))
    (is (= 0 (count (get-trials "foo" screens))))
    (is (= 3 (count (get-block "bar" screens))))
    (is (= 0 (count (get-trials "bar" screens))))
    (is (= 4 (count (get-block "baz" screens))))
    (is (= 3 (count (get-trials "baz" screens))))))

(deftest test-pluck-times
  (let [screens [{:done 1} {:done 2} {:done 3}]]
    (is (= [1 2 3] (pluck-times screens)))))
