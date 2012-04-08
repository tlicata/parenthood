;(function () {

    // If proper unit tests do not require a certain order,
    // then these are not proper unit tests. Below is a run
    // through of the whole IAT, so ordering was important.
    QUnit.config.reorder = false;

    // Our tests will mimic a user typing on a keyboard.  Accept
    // upper and lowercase keys to account for caps lock.
    var fakePress = function (keyCode) {
        var e = $.Event("keypress");
        e.keyCode = keyCode;
        $("body").trigger(e);
    };
    var fakeLeftPress = function () {
        fakePress(Math.random() > .5 ? 97 : 65);
    };
    var fakeRightPress = function () {
        fakePress(Math.random() > .5 ? 107 : 75);
    };
    var fakeSpacePress = function () {
        fakePress(32);
    };

    // Some methods to pull the current state out of the IAT.
    var getBlock = window.parenthood.getBlock;
    var getNumBlocks = window.parenthood.getNumBlocks;
    var getTrial = window.parenthood.getCurrentTrial;
    var isCorrectKey = window.parenthood.correctKey;
    var makeLabel = window.parenthood.makeLabel;
    var getTable = function () {
        return $("table#iatTable");
    };
    var getInstructions = function () {
        return getTable().find("#instructions").html();
    };

    // Put a block through its exercises.
    var workout = function (index) {

        // Make sure current block is pointing to the block
        // we're supposed to be at.
        var block = getBlock();
        equal(block, getBlock(index), "block");

        // Block starts with an instruction screen. Make sure
        // the right instructions appear in the html.
        equal(block.instructions, getInstructions(), "instructions");

        // Advance passed this block's instructions.
        fakeSpacePress();

        // Make sure proper categories appear in the top
        // left and right corners of the screen.
        equal($("#left").html(), makeLabel(block.leftWord), "left categor(y|ies)");
        equal($("#right").html(), makeLabel(block.rightWord), "right categor(y|ies)");

        // For each trial, make sure the proper key results
        // in successfully advancing to the next trial and
        // that the improper key shows an "X" and waits for
        // the correct response.
        var i = 0, n = block.trials.length;
        var doTrial = function () {

            if (i == n) {
                start();
                return;
            }

            var trial = getTrial();
            equal(block.trials[i], trial, trial.word);
            equal($("#center").html(), trial.word, trial.word + " html");
            if (isCorrectKey(block, trial, "LEFT")) {
                fakeLeftPress();
            } else if (isCorrectKey(block, trial, "RIGHT")) {
                fakeRightPress();
            } else {
                throw new Error("trial should fall into LEFT or RIGHT category");
            }

            i++;
            setTimeout(doTrial, 500);
        }
        doTrial();
    };

    // Tests
    test("Make sure first block is shown automatically.", function () {
        var table = getTable();
        var instr = getInstructions();
        ok(table.length == 1 &&
           table.find("tr").length == 4 &&
           instr == getBlock().instructions &&
           instr == getBlock(0).instructions);

        // Advance passed welcome screen.
        fakeSpacePress();
    });

    for (var i = 1, n = getNumBlocks(); i < n; i++) {
        (function (index) {
            test("Run through block no. " + index, function () {
                stop();
                workout(index);
            });
        }(i));
    };
}());