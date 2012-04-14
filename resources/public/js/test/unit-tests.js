;(function () {
    test("Deep copy arrays and object", function () {
        var arr = [1, 2, {foo: "bar"}];
        var arrCopy = $.deepCopy(arr);
        deepEqual(arr, arrCopy);
        arrCopy[2].foo = "baz";
        notDeepEqual(arr, arrCopy);

        var obj = {a: "foo", b: "bar", c: [1, 2]};
        var objCopy = $.deepCopy(obj);
        deepEqual(obj, objCopy);
        objCopy.c[0] = "baz";
        notDeepEqual(obj, objCopy);
    });
}());