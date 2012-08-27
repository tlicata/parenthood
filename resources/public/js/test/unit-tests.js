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

    test("Check if object is last element in array", function () {
        var obj = {foo: "bar"};
        var arr = [1, 2, 3];
        var arrObj = [1, 2, obj];
        ok($.isLastItem(3, arr), "can find number at last array index");
        ok($.isLastItem(obj, arrObj), "can find object at last array index");
        ok($.isLastItem(null, []), "special case we require for trials");
    });

    test("Replace placeholders with input", function () {
        var inputs = {bird: "chimp"};
        var subs = parenthood.substitute;

        equal(subs("to", inputs), "to");
        equal(subs("the", inputs), "the");
        equal(subs("${bird}", inputs), "chimp");

        deepEqual(subs(["other", "${bird}"], inputs), ["other", "chimp"])
    });

    test("Expand tree structure into array of screens", function () {
        var tree = window.parenthood.getBlocks();
        var screens = window.parenthood.treeIntoScreens(tree);
        equal(screens.length, _.reduce(tree, function (count, block) {
            if (block.instructions) {
                count++;
            }
            if (block.trials) {
                count += block.trials.length;
            }
            return count;
        }, 0));
    });

    test("Grow an array", function () {
        var grow = window.parenthood.grow;
        var arr = [1, 2, 3, 4, 5];

        equal(grow(arr).length, 5);
        equal(grow(arr, -5).length, 0);
        equal(grow(arr, 3).length, 3);
        equal(grow(arr, 5).length, 5)
        equal(grow(arr, 10).length, 10);
    });

    test("Generate partner trials", function () {
        var makePartnerTrials = window.parenthood.makePartnerTrials;
        var small = makePartnerTrials(4);
        var exact = makePartnerTrials(10);
        var big = makePartnerTrials(20);

        equal(small.length, 4)
        equal(exact.length, 10);
        equal(big.length, 20);
    });
}());
