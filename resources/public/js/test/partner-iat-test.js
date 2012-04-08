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
    });
}());