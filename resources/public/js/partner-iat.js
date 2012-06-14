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

    // Pattern to replace with user input.
    var INPUT_REGEX = /\${(.*)}/;

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

    var isInput = function (screen) {
        return screen && screen.prompt ? true : false;
    };
    var isInstructions = function (screen) {
        return screen && screen.instructions ? true : false;
    };
    var isTrial = function (screen) {
        return screen && screen.word ? true : false;
    };
    var makeLabel = function (category) {
        return $.isArray(category) ? category.join("<br>") : category;
    };
    var isEnter = function (key) {
        return key == 13;
    };
    var isSpace = function (key) {
        return key == 32;
    };
    var isLeft = function (key) {
        return key == 97 || key == 65;
    };
    var isRight = function (key) {
        return key == 107 || key == 75;
    };
    var correctKey = function (screen, key, time) {
        var isCorrect = false;
        if (isInput(screen)) {
            isCorrect = isEnter(key);
            // We aren't really getting the input from the keystrokes,
            // but instead reaching into the page to pull out the form
            // value.  Building it from the keystrokes would have the
            // problem of dealing with backspaces or mouse highlights
            // and deletions.
            if (isCorrect) {
                var form = $("#"+display.makeInputId(screen));
                if (form.length != 1) {
                    throw new Error("should be one matching input element");
                }
                addInput(screen, form.val());
            }
        } else if (isTrial(screen)) {
            if (isLeft(key)) {
                var left = screen ? screen.left : null;
                isCorrect = $.isArray(left) ?
                    $.inArray(screen.category, left) !== -1 :
                    left == screen.category;
            } else if (isRight(key)) {
                var right = screen ? screen.right : null;
                isCorrect = $.isArray(right) ?
                    $.inArray(screen.category, right) !== -1 :
                    right == screen.category;
            }

            var keyEvent = {time:time, key:key, correct:isCorrect};
            if (screen.responses) {
                screen.responses.push(keyEvent);
            } else {
                screen.responses = [keyEvent];
            }
        } else if (isInstructions(screen)) {
            isCorrect = isSpace(key);
        }
        return isCorrect;
    };

    var addInput = function (screen, answer) {
        var id = screen.id;
        if (input[id]) {
            throw new Error("duplicate ids");
        } else {
            input[id] = answer;
            screen.response = answer;
        }
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
    var substitute = function (word, inputs) {
        if (_.isString(word)) {
            var match = word.match(INPUT_REGEX);
            if (match) {
                word = word.replace(INPUT_REGEX, inputs[match[1]]);
            }
        }
        return word;
    };
    var treeIntoScreens = function (tree) {
        return _.reduce(tree, function (screens, block) {
            if (block.instructions) {
                screens.push({instructions: block.instructions});
            }
            var allTrials = (block && block.trials) || [];
            allTrials = expand(allTrials);
            if (_.all(allTrials, isTrial)) {
                allTrials = _.shuffle(allTrials);
            }
            for (var i = 0, n = allTrials.length; i < n; i++) {
                var trial = $.deepCopy(allTrials[i]);
                if (isTrial(trial)) {
                    _.extend(trial, {
                        left: block.leftWord,
                        right: block.rightWord
                    });
                }
                screens.push(trial);
            }
            return screens;
        }, []);
    };

    var display = (function () {

        var clear = function () {
            error.hide();
            $("#center").text("");
        };

        // Build table and style it in JavaScript
        // so it applies to tests too.
        var createTable = _.once(function () {
            $("body").prepend($([
                '<table id="iatTable" width="100%">',
                '<tbody>','<tr>',
                '<td width="20%"><div id="left" class="labels"></div></td>',
                '<td width="60%"></td>',
                '<td width="20%"><div id="right" class="labels"></div></td>',
                '</tr>','<tr>',
                '<td colspan="3" height="100">',
                '<div id="instructions" class="instructions">',
                '</div>','</td>','</tr>','<tr>',
                '<td width="15%"></td>',
                '<td width="50%"><div id="center" class="labels"></div></td>',
                '<td width="15%"></td>',
                '</tr>','<tr>',
                '<td width="15%"></td>',
                '<td width="50%"><div class="labels"></div></td>',
                '<td width="15%"></td>',
                '</tr>','</tbody>','</table>'].join("")));

            $("body").css({
                "background-color": "steelblue",
                "color": "white",
                "font-family": "sans-serif"
            });
            $("td,div.center,div.instructions").css("text-align", "center");
            $("div.labels").css({
                "font-size": "30px",
                "min-height": "50px"
            });
        });

        var error = (function () {
            var intervalId;
            var show = function () {
                clearTimeout(intervalId);
                $("#instructions").text("X").css({
                    color: "red",
                    fontSize: "2em"
                });
                intervalId = setTimeout(hide, 500);
            };
            var hide = function () {
                clearTimeout(intervalId);
                $("#instructions").text("").css({
                    color: "white",
                    fontSize: "1em"
                });
            };
            return {
                show: show,
                hide: hide
            }
        }());

        var makeInputId = function (screen) {
            return "input" + screen.id;
        };

        var showEndMessage = function () {
            $("#left, #right, #center").text("");
            $("#instructions").text("Test Finished. Thank you!");
        };

        var update = function (screen) {
            $("#instructions").html((screen && screen.instructions) || "");
            if (isInput(screen)) {
                var id = makeInputId(screen);
                var inputLabel = $("<label/>").attr({
                    "for": id
                }).html(screen.prompt);
                var textInput = $("<input/>").attr({
                    "autofocus": true,
                    "id": id,
                    "name": id
                }).focus();
                $("#center").append(inputLabel, textInput);
                // On windows machines, the call to focus() above
                // isn't doing anything. Call it again after a delay.
                setTimeout(function () {
                    textInput.focus();
                }, 250);
            } else {
                var word = screen.word;
                $("#left").html(isTrial(screen) ?  makeLabel(screen.left) : "");
                $("#right").html(isTrial(screen) ? makeLabel(screen.right) : "");
                $("#center").html(isInstructions(screen) ? "Press space to continue" : word);
            }
        };

        return {
            clear: clear,
            createTable: createTable,
            error: error,
            makeInputId: makeInputId,
            showEndMessage: showEndMessage,
            update: update
        };
    }());

    var input = {};
    var remote = {};
    var results = [];
    var SCREENS = treeIntoScreens(BLOCKS);
    var screen = null;

    var showNextScreen = function () {
        if (screen) {
            results.push($.deepCopy(screen));
        }
        var next = $.getNextItem(screen, SCREENS);
        screen = $.extend(next, {
            word: substitute(next.word, input),
            time: new Date().getTime()
        });
        display.update(screen);
    };

    var init = _.once(function (unique) {

        var inReadMode = true;

        remote.submitResults = function (data) {
            $.ajax({
                data: {
                    results: JSON.stringify(data),
                    unique: unique
                },
                type: "POST",
                url: ""
            });
        };

        var handleKeyPress = function (e) {
            var time = new Date().getTime();

            if (!inReadMode) {
                return;
            }

            var key = e.which;
            if (correctKey(screen, key, time)) {
                inReadMode = false;
                display.clear();
                if ($.isLastItem(screen, SCREENS)) {
                    // If user just finished last step, display
                    // a message of completion and leave test
                    // with inReadMode set to false so no more
                    // input is allowed. Remove key press handler
                    // to further shut things down.
                    display.showEndMessage();
                    $("body").off("keypress", handleKeyPress);
                    remote.submitResults(results);
                } else {
                    var doAdvanceTest = function () {
                        inReadMode = true;
                        showNextScreen();
                    };
                    if (isInput(screen)) {
                        doAdvanceTest();
                    } else {
                        setTimeout(doAdvanceTest, DELAY);
                    }
                }
            } else if (isTrial(screen) && (isLeft(key)||isRight(key))) {
                display.error.show();
            }
        };

        display.createTable();
        showNextScreen(unique);
        $("body").on("keypress", handleKeyPress);
    });

    // Expose some methods. Mainly for testing.
    return {
        correctKey: correctKey,
        display: display,
        expand: expand,
        getBlocks: function () {
            return BLOCKS;
        },
        getDelay: function () {
            return DELAY;
        },
        getInputRegex: function () {
            return INPUT_REGEX;
        },
        getNumScreens: function () {
            return SCREENS.length;
        },
        getScreen: function (idx) {
            return $.deepCopy(isNaN(idx) ? screen : SCREENS[idx]);
        },
        init: init,
        isInput: isInput,
        isInstructions: isInstructions,
        isTrial: isTrial,
        makeLabel: makeLabel,
        submitResults: function (data) {
            remote.submitResults(data);
        },
        substitute: substitute,
        treeIntoScreens: treeIntoScreens
    }
}(window.jQuery));
