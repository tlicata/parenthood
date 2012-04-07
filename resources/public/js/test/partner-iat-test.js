;(function () {

    var fakeSpacePress = function () {
        var e = $.Event("keypress");
        e.keyCode = 32;
        $("body").trigger(e);
    };
    var getBlock = function (idx) {
        return window.parenthood.getBlock(idx);
    };
    var getTable = function () {
        return $("table#iatTable");
    };
    var getInstructions = function () {
        return getTable().find("#instructions").html();
    }

    var steps = [{
        desc: "Make sure first block is shown automatically",
        func: function () {
            var table = getTable();
            var instr = getInstructions();
            return table.length == 1 &&
                table.find("tr").length == 4 &&
                instr == getBlock().instructions &&
                instr == getBlock(0).instructions;
        }
    }, {
        desc: "Fake a space button press to advance passed the first screen.",
        func: function () {
            fakeSpacePress();
            var instr = getInstructions();
            return instr == getBlock().instructions &&
                instr == getBlock(1).instructions;
        }
    }];

    for (var i = 0, n = steps.length; i < n; i++) {
         (function (step) {
             asyncTest(step.desc, function () {
                 expect(1);
                 setTimeout(function () {
                     ok(step.func(), step.desc);
                     start();
                 }, 2000);
             });
         }(steps[i]));
    }
}());