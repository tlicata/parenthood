window.parenthood = (function ($) {
    var BLOCKS = [{
        // Block 0
        instructions: [
            "This measure is a reaction time task.  Since this task is timed, ",
            "once you begin, you must finish the whole task before taking a ",
            "break.<br><br>Please do not begin this task unless you are sure",
            "you have 5 minutes to complete the whole thing.<br><br>"].join(""),
        trials: []
    }, {
        // Block 1
        instructions: [
            "The two categories you must distinguish are:<br><br>",
            "UNPLEASANT vs. PLEASANT  words.<br><br>",
            "Press the \"a\" key if the stimulus is an UNPLEASANT word.<br>",
            "Press the \"k\" key if the stimulus is a PLEASANT word.<br><br>",
            "Please place your hands on the keyboard now, so that you can ",
            "press the \"a\" key with your left hand, ",
            "and the \"k\" key with your right hand.<br><br>",
            "Make sure that your hands are positioned correctly because only \"a\" and",
            " \"k\" will be recognized by the program.<br>"].join(""),
        leftWord: "unpleasant",
        rightWord: "pleasant",
        trials: [
            {word: "party", category: "pleasant"},
            {word: "disease", category: "unpleasant"},
            {word: "smile",  category: "pleasant"},
            {word: "friend", category: "pleasant"},
            {word: "joy", category: "pleasant"},
            {word: "happy", category: "pleasant"},
            {word: "cockroach", category: "unpleasant"},
            {word: "sunshine", category: "pleasant"},
            {word: "garbage", category: "unpleasant"},
            {word: "death", category: "unpleasant"},
            {word: "love", category: "pleasant"},
            {word: "agony", category: "unpleasant"},
            {word: "pain", category: "unpleasant"},
            {word: "evil", category: "unpleasant"},
            {word: "gift", category: "pleasant"},
            {word: "holiday", category: "pleasant"},
            {word: "warmth", category: "pleasant"},
            {word: "vomit", category: "unpleasant"},
            {word: "disaster", category: "unpleasant"},
            {word: "stink", category: "unpleasant"}]
    }, {
        // Block 2
        instructions: [
		    "The next two categories that you are to distinguish are:<br><br>",
		    "SELF vs. OBJECT words.<br><br>",
		    "Press the \"a\" key if the stimulus is a SELF word.<br>",
		    "Press the \"k\" key if the stimulus is an OBJECT word.<br><br>",
		    "Please place your hands on the keyboard now, so that you can ",
		    "press the \"a\" key with your left hand, ",
            "and the \"k\" key with your right hand.<br><br>"].join(""),
        leftWord: "self",
        rightWord: "object",
        trials: [
            {word: "me", category: "self", count: "4"},
            {word: "myself", category: "self", count: "4"},
            {word: "it", category: "object", count: "4"},
            {word: "that", category: "object", count: "4"}]
    }, {
        // Block 3
        instructions: [
		    "The four categories that you are to distinguish are:<br><br>",
		    "UNPLEASANT vs. PLEASANT words.<br>",
		    "OR<br>",
		    "SELF vs. OBJECT words.<br><br>",
		    "Press the \"a\" key if the stimulus is an UNPLEASANT word OR a SELF word.<br>",
		    "Press the \"k\" key if the stimulus is a PLEASANT word OR an OBJECT word.<br><br>",
		    "Please place your hands on the keyboard now, so that you can ",
		    "press the \"a\" key with your left hand, ",
            "and the \"k\" key with your right hand.<br><br>"].join(""),
        leftWord: ["unpleasant", "self"],
        rightWord: ["pleasant", "object"],
        trials: [
            {word: "party", category: "pleasant"},
            {word: "disease", category: "unpleasant"},
            {word: "smile", category: "pleasant"},
            {word: "friend", category: "pleasant"},
            {word: "joy", category: "pleasant"},
            {word: "happy", category: "pleasant"},
            {word: "cockroach", category: "unpleasant"},
            {word: "sunshine", category: "pleasant"},
            {word: "garbage", category: "unpleasant"},
            {word: "death", category: "unpleasant"},
            {word: "love", category: "pleasant"},
            {word: "agony", category: "unpleasant"},
            {word: "pain", category: "unpleasant"},
            {word: "evil", category: "unpleasant"},
            {word: "gift", category: "pleasant"},
            {word: "holiday", category: "pleasant"},
            {word: "warmth", category: "pleasant"},
            {word: "vomit", category: "unpleasant"},
            {word: "disaster", category: "unpleasant"},
            {word: "stink", category: "unpleasant"},
            {word: "me", category: "self", count: "4"},
            {word: "myself", category: "self", count: "4"},
            {word: "it", category: "object", count: "4"},
            {word: "that", category: "object", count: "4"}]
    }, {
        // Block 4
        instructions: [
		    "The next two categories that you are to distinguish are:<br><br>",
		    "OBJECT vs. SELF words.<br><br>",
		    "Press the \"a\" key if the stimulus is an OBJECT word.<br>",
		    "Press the \"k\" key if the stimulus is a SELF word.<br><br>",
		    "Please place your hands on the keyboard now, so that you can ",
		    "press the \"a\" key with your left hand, ",
            "and the \"k\" key with your right hand.<br><br>"].join(""),
        leftWord: "object",
        rightWord: "self",
        trials: [
            {word: "me", category: "self", count:"4"},
            {word: "myself", category: "self", count:"4"},
            {word: "it", category: "object", count:"4"},
            {word: "that", category: "object", count:"4"}]
    }, {
        // Block 5
        instructions: [
		    "The four categories that you are to distinguish are:<br><br>",
		    "UNPLEASANT vs. PLEASANT words.<br>",
		    "OR<br>",
		    "OBJECT vs. SELF words.<br><br>",
		    "Press the \"a\" key if the stimulus is an UNPLEASANT word OR an OBJECT word.<br>",
		    "Press the \"k\" key if the stimulus is a PLEASANT word OR an SELF word.<br><br>",
		    "Please place your hands on the keyboard now, so that you can ",
		    "press the \"a\" key with your left hand, ",
            "and the \"k\" key with your right hand.<br><br>"].join(""),
        leftWord: ["unpleasant", "object"],
        rightWord: ["pleasant", "self"],
        trials: [
            {word: "party", category: "pleasant"},
            {word: "disease", category: "unpleasant"},
            {word: "smile", category: "pleasant"},
            {word: "friend", category: "pleasant"},
            {word: "joy", category: "pleasant"},
            {word: "happy", category: "pleasant"},
            {word: "cockroach", category: "unpleasant"},
            {word: "sunshine", category: "pleasant"},
            {word: "garbage", category: "unpleasant"},
            {word: "death", category: "unpleasant"},
            {word: "love", category: "pleasant"},
            {word: "agony", category: "unpleasant"},
            {word: "pain", category: "unpleasant"},
            {word: "evil", category: "unpleasant"},
            {word: "gift", category: "pleasant"},
            {word: "holiday", category: "pleasant"},
            {word: "warmth", category: "pleasant"},
            {word: "vomit", category: "unpleasant"},
            {word: "disaster", category: "unpleasant"},
            {word: "stink", category: "unpleasant"},
            {word: "me", category: "self", count: "4"},
            {word: "myself", category: "self", count: "4"},
            {word: "it", category: "object", count: "4"},
            {word: "that", category: "object", count: "4"}]
    }];

    // After answering a trial, how many milliseconds until
    // the next trial is displayed (and input is accepted).
    var DELAY = 300;

    // Extend jQuery with utility methods.
    $.extend({
        deepCopy: function (obj) {
            return $.isArray(obj) ?
                $.extend(true, [], obj) :
                $.extend(true, {}, obj);
        },
        getNextItem: function (item, array) {
            var index = $.inArray(item, array);
            var nextIndex = index + 1;
            return nextIndex < array.length ? array[nextIndex] : null;
        },
        // Is the item last element in array?
        isLastItem: function (item, array) {
            var index = $.inArray(item, array);
            return index == (array.length - 1);
        }
    });

    var block = null;
    var trial = null;

    var isLastTrialInBlock = function (block, trial) {
        return $.isLastItem(trial, block.trials);
    };
    var isLastBlock = function (block) {
        return $.isLastItem(block, BLOCKS);
    };
    var isEnd = function (block, trial) {
        return isLastBlock(block) && isLastTrialInBlock(block, trial);
    };
    var makeLabel = function (category) {
        return $.isArray(category) ? category.join("<br>") : category;
    };
    var advanceTest = (function () {
        var getNextBlock = function (block) {
            var next = $.getNextItem(block, BLOCKS);
            if (!next) {throw new Error("no next block");}
            return next;
        };
        var getNextTrial = function (block, trial) {
            var next = $.getNextItem(trial, block.trials);
            if (!next) {throw new Error("no next trial");}
            return next;
        };
        return function () {
            if (!block || isLastTrialInBlock(block, trial)) {
                block = getNextBlock(block);
                block.trials = _.shuffle(block.trials);
                trial = null;
            } else {
                trial = getNextTrial(block, trial);
            }

            $("#instructions").html(trial ? "" : block.instructions);
            $("#left").html(trial ?  makeLabel(block.leftWord) : "");
            $("#right").html(trial ? makeLabel(block.rightWord) : "");
            $("#center").html(trial ? trial.word : "Press space to continue");
        };
    }());

    var getKey = function (event) {
        var code = event.keyCode;
        var key = null;
        if (code == 32) {
            key = "SPACE";
        } else if (code == 97 || code == 65) {
            key = "LEFT";
        } else if (code == 107 || code == 75) {
            key = "RIGHT";
        }
        return key;
    };
    var correctKey = function (block, trial, key) {
        if (block && trial) {
            if (key == "LEFT") {
                var left = block ? block.leftWord : null;
                return $.isArray(left) ?
                    $.inArray(trial.category, left) !== -1 :
                    left == trial.category;
            } else if (key == "RIGHT") {
                var right = block ? block.rightWord : null;
                return $.isArray(right) ?
                    $.inArray(trial.category, right) !== -1 :
                    right == trial.category;
            }
            return false;
        }
        return key == "SPACE";
    };

    var init = function () {

        var error = (function () {
            var intervalId;
            var show = function () {
                clearTimeout(intervalId);
                $("#instructions").text("X").css({
                    color: "red",
                    fontSize: "2em",
                    fontFamily: "sans-serif"
                });
                intervalId = setTimeout(hide, 500);
            };
            var hide = function () {
                clearTimeout(intervalId);
                $("#instructions").text("").css({
                    color: "black",
                    fontSize: "1em",
                    fontFamily: "serif"
                });
            };
            return {
                show: show,
                hide: hide
            }
        }());

        var handleKeyPress = (function () {
            var inReadMode = true;

            var clearDisplay = function () {
                error.hide();
                $("#center").text("");
            };
            var showEndMessage = function () {
                $("#left, #right, #center").text("");
                $("#instructions").text("Test Finished. Thank you!");
            };

            return function (e) {
                var time = new Date().getTime();

                if (!inReadMode) {
                    return;
                }

                var key = getKey(e);
                if (correctKey(block, trial, key)) {
                    inReadMode = false;
                    clearDisplay();
                    if (isEnd(block, trial)) {
                        // If user just finished last step, display
                        // a message of completion and leave test
                        // with inReadMode set to false so no more
                        // input is allowed. Remove key press handler
                        // to further shut things down.
                        showEndMessage();
                        $("body").off("keypress", handleKeyPress);
                    } else {
                        var doAdvanceTest = function () {
                            inReadMode = true;
                            advanceTest();
                        };
                        if (key == "SPACE") {
                            doAdvanceTest();
                        } else {
                            setTimeout(doAdvanceTest, DELAY);
                        }
                    }
                } else if (trial && (key == "LEFT" || key == "RIGHT")) {
                    error.show();
                }
            }
        }());
        $("body").on("keypress", handleKeyPress);

        var createTable = function () {
            $("body").append($(['<table id="iatTable" width="100%">',
                                '<tbody>',
                                '<tr>',
                                '<td width="20%"><div id="left" class="labels"></div></td>',
                                '<td width="60%"></td>',
                                '<td width="20%"><div id="right" class="labels"></div></td>',
                                '</tr>',
                                '<tr>',
                                '<td colspan="3" height="100">',
                                '<div id="instructions" class="instructions">',
                                '</div>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td width="15%"></td>',
                                '<td width="50%"><div id="center" class="labels"></div></td>',
                                '<td width="15%"></td>',
                                '</tr>',
                                '<tr>',
                                '<td width="15%"></td>',
                                '<td width="50%"><div class="labels"></div></td>',
                                '<td width="15%"></td>',
                                '</tr>',
                                '</tbody>',
                                '</table>'].join("")));
        };

        // initialize
        createTable();
        advanceTest();
    };

    // Expose some methods. Mainly for testing.
    return {
        correctKey: correctKey,
        getBlock: function (idx) {
            return isNaN(idx) ? block : BLOCKS[idx];
        },
        getCurrentTrial: function () {
            return trial;
        },
        getDelay: function () {
            return DELAY;
        },
        getNumBlocks: function () {
            return BLOCKS.length;
        },
        init: init,
        makeLabel: makeLabel
    }
}(window.jQuery));
