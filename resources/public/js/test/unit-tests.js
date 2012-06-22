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

    test("Expand counts in trials", function () {
        var trials = [{word: "test", category: "easter"}, // stays the same
                      {word: "wonk", category: "awesome", count: -1}, // removed
                      {word: "work", category: "egg", count: 0}, // removed
                      {word: "unit", category: "hunt", count: 1}, // stay the same
                      {word: "yes", category: "please", count: "5"}]; // 5 copies
        var expanded = parenthood.expand(trials);

        equal(5, trials.length); // original array is not modified
        equal(7, expanded.length); // expanded array has proper length
        equal(3, _.uniq(expanded, false, function (trial, index, array) {
            // make sure expanded contains only 3 items. kept the
            // trial with no count specifed, and removed the items
            // with counts of 0 or negative.
            return trial.word;
        }).length);
    });

    test("Replace placeholders with input", function () {
        var inputs = {bird: "chimp"};
        var subs = parenthood.substitute;

        equal(subs("to", inputs), "to");
        equal(subs("the", inputs), "the");
        equal(subs("${bird}", inputs), "chimp");
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
}());
