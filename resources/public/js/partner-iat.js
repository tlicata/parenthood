window.parenthood = (function ($) {
    var BLOCKS = [{
        trials: [
            {id: "name", prompt: "your first name"},
            {id: "pname", prompt: "your partner's first name"},
            {id: "food", prompt: "your favorite food"},
            {id: "pfood", prompt: "your partner's favorite food"}
        ]
    }, {
        instructions: [
            "This measure is a reaction time task.  Since this task is timed, ",
            "once you begin, you must finish the whole task before taking a ",
            "break.<br><br>Please do not begin this task unless you are sure",
            "you have 5 minutes to complete the whole thing.<br><br>"].join(""),
        trials: []
    }, {
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
            {word: "${name}", category: "self", count: "4"},
            {word: "${food}", category: "self", count: "4"},
            {word: "${pname}", category: "object", count: "4"},
            {word: "${pfood}", category: "object", count: "4"}]
    }, {
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
        deparam: function (str) {
            return _.reduce(str.split("&"), function (memo, pair) {
                var arr = pair.split("=");
                memo[arr[0]] = arr[1];
                return memo;
            }, {});
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

    var blockGlobal = null;
    var trial = null;
    var input = {};

    var isInput = function (trial) {
        return trial && trial.prompt ? true : false;
    };
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
    // If a trial is specified with count property of n, then
    // replace that trial with n copies of the trial (with the
    // count properties removed).
    var expand = function (trials) {
        return _.flatten(_.map(trials, function (trial) {
            var count = parseInt(trial.count);
            var keys = _.reject(_.keys(trial), function (val) {
                return val == "count";
            });
            return _.isFinite(count) ?
                _.map(_.range(0, count), function () {
                    return _.pick(trial, keys);
                }) : trial;
        }));
    };
    // If a trial word contains ${}, replace it with
    // user input. Put the id of the input you want
    // between the brackets.
    var substitute = (function () {
        var regex = /\${(.*)}/;
        var sub = function (t, inputs) {
            var word = t.word;
            if (_.isString(word)) {
                var match = word.match(regex);
                if (match) {
                    t.word = word.replace(regex, inputs[match[1]]);
                }
            }
            return t;
        };
        return function (trials, inputs) {
            return _.map(trials, function (t) {
                return sub(t, inputs);
            });
        };
    }());
    var advanceTest = (function () {
        var addInput = function (id, answer) {
            if (input.id) {
                throw new Error("duplicate ids");
            } else {
                input[id] = answer;
            }
        };
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
            if (!blockGlobal || isLastTrialInBlock(blockGlobal, trial)) {
                blockGlobal = getNextBlock(blockGlobal);
                blockGlobal.trials = expand(blockGlobal.trials);
                blockGlobal.trials = substitute(blockGlobal.trials, input);
                // Shuffle trials, but not input blocks.
                if (!_.any(blockGlobal.trials, isInput)) {
                    blockGlobal.trials = _.shuffle(blockGlobal.trials);
                }

                // Show instructions if exist, otherwise
                // jump right to the trials.
                if (blockGlobal.instructions) {
                    trial = null;
                } else {
                    trial = getNextTrial(blockGlobal, null);
                }
            } else {
                trial = getNextTrial(blockGlobal, trial);
            }

            $("#instructions").html(trial ? "" : blockGlobal.instructions);
            if (isInput(trial)) {
                var inputLabel = $("<label/>").attr({
                    "for": trial.id
                }).html(trial.prompt);
                var textInput = $("<input/>").attr({
                    "autofocus": true,
                    "name": trial.id
                });
                var form = $("<form/>")
                    .append(inputLabel, textInput)
                    .submit(function () {
                        addInput(trial.id, textInput.val())
                        advanceTest();
                        return false;
                    });
                $("#center").html(form);
            } else {
                $("#left").html(trial ?  makeLabel(blockGlobal.leftWord) : "");
                $("#right").html(trial ? makeLabel(blockGlobal.rightWord) : "");
                $("#center").html(trial ? trial.word : "Press space to continue");
            }
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
        if (isInput(trial)) {
            return false;
        }
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

    var init = _.once(function () {

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

                if (!inReadMode || isInput(trial)) {
                    return;
                }

                var key = getKey(e);
                if (correctKey(blockGlobal, trial, key)) {
                    inReadMode = false;
                    clearDisplay();
                    if (isEnd(blockGlobal, trial)) {
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

        // Build table and style it in JavaScript
        // so it applies to tests too.
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

            $("td,div.center,div.instructions").css("text-align", "center");
            $("div.labels").css("font-size", "30px");
        };

        // initialize
        createTable();
        advanceTest();
    });

    // Expose some methods. Mainly for testing.
    return {
        correctKey: correctKey,
        expand: expand,
        getBlock: function (idx) {
            return isNaN(idx) ? blockGlobal : BLOCKS[idx];
        },
        getBlocks: function () {
            var arr = [];
            for (var i = 0, n = this.getNumBlocks(); i < n; i++) {
                arr.push($.deepCopy(this.getBlock(i)));
            }
            return arr;
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
        isInput: isInput,
        makeLabel: makeLabel,
        substitute: substitute
    }
}(window.jQuery));
