;(function () {

    var qunitTest = window.test;
    var test = (function () {
        var results = "";
        var startTime = new Date().getTime();
        return function (msg, func, isLast) {
            var timer1 = new Date().getTime();
            qunitTest(msg, func);
            var timer2 = new Date().getTime();
            results += (timer2 - timer1) + " ms: " + msg + "<br>";
            if (isLast) {
                results += "total: " + (timer2 - startTime) + " ms";
                setTimeout(function () {
                    $("body").append($("<div/>").html(results));
                }, 1000);
            }
        };
    }());

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
    };

    test("Make sure first block is shown automatically", function () {
        var table = getTable();
        var instr = getInstructions();
        ok(table.length == 1 &&
           table.find("tr").length == 4 &&
           instr == getBlock().instructions &&
           instr == getBlock(0).instructions);
    });

    test("Fake a space button press to advance passed the first screen.", function () {
        fakeSpacePress();
        var instr = getInstructions();
        ok(instr == getBlock().instructions &&
           instr == getBlock(1).instructions);
    }, true);
}());