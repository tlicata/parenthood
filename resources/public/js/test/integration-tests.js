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
    var getDelay = window.parenthood.getDelay;
    var getNumBlocks = window.parenthood.getNumBlocks;
    var getTrial = window.parenthood.getCurrentTrial;
    var isCorrectKey = window.parenthood.correctKey;
    var isInput = window.parenthood.isInput;
    var makeLabel = window.parenthood.makeLabel;
    var substitute = window.parenthood.substitute;
    var getTable = function () {
        return $("table#iatTable");
    };
    var getInstructions = function () {
        return getTable().find("#instructions").html();
    };

    // Grab a copy of the original BLOCKS datastructure so
    // we can test that several transformations happen.
    var ORIG_BLOCKS = (function () {
        var arr = [];
        for (var i = 0, n = getNumBlocks(); i < n; i++) {
            arr.push($.deepCopy(getBlock(i)));
        }
        return arr;
    }());
    var INPUTS = {
        name: "boy",
        pname: "girl",
        food: "pizza",
        pfood: "tacos"
    };

    // Put a block through its exercises.
    var workout = function (index) {

        // Make sure current block is pointing to the block
        // we're supposed to be at.
        var block = getBlock();
        equal(block, getBlock(index), "block");

        if (block.instructions) {
            // Block starts with an instruction screen. Make sure
            // the right instructions appear in the html.
            equal(block.instructions, getInstructions(), "instructions");

            // Advance passed this block's instructions.
            fakeSpacePress();
        }

        // Make sure proper categories appear in the top
        // left and right corners of the screen.
        if (block.leftWord && block.rightWord) {
            equal($("#left").html(), makeLabel(block.leftWord), "left categor(y|ies)");
            equal($("#right").html(), makeLabel(block.rightWord), "right categor(y|ies)");
        }

        var i = 0, n = block.trials.length;

        // Make sure the trials have been shuffled and substituted. So their
        // order is random (unless it's an input block), and their words with
        // placeholders have been swapped for input.
        if (n > 0) {
            (function () {
                var getUniqueId = function (trial) {
                    return isInput(trial) ? trial.id : trial.word;
                };
                var nowWords = _.map(substitute(block.trials, INPUTS), getUniqueId);
                var origWords = _.map(substitute(ORIG_BLOCKS[index].trials, INPUTS), getUniqueId);
                var uniqNow = _.uniq(nowWords);
                var uniqOrig = _.uniq(origWords);
                if (_.any(block.trials, isInput)) {
                    deepEqual(uniqNow, uniqOrig, "input order should not be shuffled");
                } else {
                    notDeepEqual(uniqNow, uniqOrig, "trial order should be shuffled");
                }
            }());
        }

        // For each trial, make sure the proper key results
        // in successfully advancing to the next trial and
        // that the improper key shows an "X" and waits for
        // the correct response.
        var afterDelay = function () {
            setTimeout(doTrial, getDelay() + 100);
        };
        var doTrial = function () {

            if (i == n) {
                start();
                return;
            }

            var trial = getTrial();
            if (isInput(trial)) {
                $(document.activeElement).trigger("submit");
            } else {
                equal(block.trials[i], trial, trial.word);
                equal($("#center").html(), trial.word, trial.word + " html");
                if (isCorrectKey(block, trial, "LEFT")) {
                    fakeLeftPress();
                } else if (isCorrectKey(block, trial, "RIGHT")) {
                    fakeRightPress();
                } else {
                    throw new Error("trial should fall into LEFT or RIGHT category");
                }
            }

            i++;
            afterDelay();
        }
        afterDelay();
    };

    // Tests
    for (var i = 0, n = getNumBlocks(); i < n; i++) {
        (function (index) {
            test("Run through block no. " + index, function () {
                // Insert IAT into DOM. Have to do this after
                // $.onReady() but before tests run.
                if (index == 0) {
                    window.parenthood.init();
                }
                stop();
                workout(index);
            });
        }(i));
    };
}());