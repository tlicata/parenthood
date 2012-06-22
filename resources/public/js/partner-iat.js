window.parenthood = (function ($) {
    var PLEASANT_WORDS = [
        "Vacation",
        "Success",
        "Peace",
        "Health",
        "Freedom",
        "Gold",
        "Cheer",
        "Sunrise",
        "Rainbow",
        "Pleasure"
    ];
    var UNPLEASANT_WORDS = [
        "Bomb",
        "Rotten",
        "Poison",
        "Cancer",
        "Crash",
        "Filth",
        "Murder",
        "Grief",
        "Tradgedy",
        "Jail"
    ];

    var PARTNER_CATEGORY_KEY = "nameCategory";
    var PARTNER_CATEGORY = "${" + PARTNER_CATEGORY_KEY + "}";
    var NOT_PARTNER_CATEGORY = "Not " + PARTNER_CATEGORY;
    var PLEASANT_CATEGORY = "Pleasant";
    var UNPLEASANT_CATEGORY = "Unpleasant";

    var input = {};
    var partner_words = [];
    var nonpartner_words = [];

    var makePartnerTrials = function (count) {
        return function () {
            var half = Math.floor(count / 2);
            var partner = _.shuffle(partner_words).slice(0, half);
            var nonpartner = _.shuffle(nonpartner_word).slice(0, count - half);

            partner = makeTrials(partner, substitute(PARTNER_CATEGORY, inputs));
            nonpartner = makeTrials(nonpartner, substitute(NOT_PARTNER_CATEGORY, inputs));

            return _.shuffle(partner.concat(nonpartner));
        };
    };
    var makePleasantTrials = function (count) {
        return function () {
            var half = Math.floor(count / 2);
            var pleasant = _.shuffle(PLEASANT_WORDS).slice(0, half);
            var unpleasant = _.shuffle(UNPLEASANT_WORDS).slice(0, count - half);

            pleasant = makeTrials(pleasant, "pleasant");
            unpleasant = makeTrials(unpleasant, "unpleasant");

            return _.shuffle(pleasant.concat(unpleasant));
        };
    };
    var makeMixedTrials = function (count) {
        return function () {
            var half = Math.floor(count / 2);
            var pleasant = makePleasantTrials(half)();
            var partner= markPartnerTrials(count - half)();
            return _.shuffle(pleasant.concat(partner));
        };
    };

    var BLOCKS = [{
        instructions: [
            "You are about to begin a timed sorting task. You will be shown ",
            "words one at a time in the middle of the computer screen. Your ",
            "task will be to classify the words as quickly as possible into the ",
            "following categories:<br><br>",
            "\"Pleasant\", \"Unpleasant\"<br><br>",
            "\"Your partner\" and \"Not your partner\"."].join("")
    }, {
        instructions: [
            "Before you begin the sorting task, the computer will prompt you ",
            "through a series of questions. The purpose of these questions is to:<br>",
            "1) Develop a series of brief (usually 1 word) items that will be used ",
            "to describe your partner.<br>",
            "2) Develop another series of items that are NOT associated with your ",
            "partner."].join("")
    }, {
        instructions: [
            "Your responses to these questions will later be used in the ",
            "\"Your partner\" and \"Not your partner\" categories.",
            "In the task your partner's name will appear instead of the word ",
            "\"Partner\". All of the information recorded here is completely ",
            "confidential. We will delete this information after the study is ",
            "completed."].join(""),
        trials: [
            {prompt: ["Please enter the name of your romantic partner. Please ",
                      "make sure to only capitalize the first letter in your ",
                      "partner's name."].join(""),
             id: PARTNER_CATEGORY_KEY}
        ]
    }, {
        center: PARTNER_CATEGORY,
        trials: [{
            prompt: ["First we will start with the 'Partner' questions. Please retype ",
                     "your partner's first name in the space provided (this information ",
                     "will be deleted at the end of the study). Please make sure to only ",
                     "capitalize the first letter in your partner's name."].join(""),
            id: "first"
        }, {
            prompt: ["Please type your partner's last (or family) name in the space ",
                     "provided (this information will be deleted at the end of the ",
                     "study). Please make sure to only capitalize the first letter in ",
                     "your partner's last name."].join(""),
            id: "last"
        }, {
            prompt: ["Please type your partner's nickname in the space provided. ",
                     "The nickname can be a shortened version of your partner's ",
                     "first name (e.g., Angie instead of Angelina). If you don't ",
                     "have a nickname for your partner you can type a term of ",
                     "affection that you use to describe your partner (e.g. Sweetie). ",
                     "Please capitalize the first letter."].join(""),
            id: "nick"
        }, {
            prompt: ["Please type in the space provided one of the following words ",
                     "that best describes your partner: Boyfriend, Girlfriend, Fiance, ",
                     "Fiancee, Husband, Wife. Please capitalize the first letter ",
                     "(e.g., Boyfriend)."].join(""),
            id: "relation"
        }, {
            prompt: ["Please type the month and day of your partner's birthday in the ",
                     "space provided. For example, if your partner's birthday is ",
                     "October 19th, write Oct 19. Abbreviate the months as follows: ",
                     "Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"].join(""),
            id: "birthday"
        }]
    }, {
        center: NOT_PARTNER_CATEGORY,
        trials: [{
            prompt: ["Now you will be asked questions that are not related to your ",
                     "partner. Choose a first name from the list below that does not ",
                     "at all represent your romantic partner and type it in the space ",
                     "provided. The name should be familiar but neither strongly liked ",
                     "nor disliked. Try not to pick a name for which you have strong ",
                     "feelings (e.g., not a name of a friend or family member). Make ",
                     "sure you pick a name that belongs to the same gender as your ",
                     "romantic partner (if your partner is male, choose a male name). ",
                     "Please capitalize the first letter only.<br>",
                     "Male: Jose, Anthony, David, Daniel, Michael, Jacob, Tyler, ",
                     "Joshua, Mathew, Ethan, Joseph, Luis, Juan, Gavin, Miguel, Jalen, ",
                     "Devon, Donovan, Jie<br>",
                     "Female: Jessica, Stephanie, Jennifer, Tia, Ashley, Kimberley, Lin, ",
                     "Maria, Rachel, Emily, Madison, Hannah, Emma, Alexis, Sarah, ",
                     "Jasmine, Makayla, Aaliyah, Heather"].join(""),
            id: "firstNot"
        }, {
            prompt: ["Choose a last name from the list below that does not at all ",
                     "represent your romantic partner and type it in the space ",
                     "provided. The name should be familiar but neither strongly ",
                     "liked nor disliked. Try not to pick a name for which you have ",
                     "strong feelings (e.g., not a name of a friend or family member). ",
                     "Please capitalize the first letter only. Smith, Johnson, ",
                     "Williams, Jones, Byrne, Garcia, Lee, Zhao, Moore, Taylor, ",
                     "Rodriguez, Wong, Young, King, Lewis"].join(""),
            id: "lastNot"
        }, {
            prompt: ["Choose a date of birth from the list below that is not ",
                     "associated with your romantic partner and type it in the ",
                     "space provided. The date and month should not be strongly ",
                     "liked nor disliked. Try not to pick a date for which you ",
                     "have strong feelings (e.g., not a birthday of a friend or ",
                     "family member). Please capitalize the first letter only.<br>",
                     "Please type the date of birth in the following format and ",
                     "choose one of these dates:<br>",
                     "Jan 5, Feb 15, Mar 19, Apr 20, May 8, Jun 23, Jul 28, Aug 12, ",
                     "Sep 10, Oct 14, Nov 22, Dec 12"].join(""),
            id: "birthdayNot"
        }, {
            prompt: ["Choose a state from the list below that is not associated ",
                     "with your romantic partner and type it in the space provided. ",
                     "The state should be familiar but neither strongly liked nor ",
                     "disliked. Try not to pick a state for which you have strong ",
                     "feelings (e.g., not a state associated with a friend or family ",
                     "member). Please capitalize the first letter only.<br>",
                     "Alabama, California, Colorado, Connecticut, Delaware, Florida, ",
                     "Idaho, Illinois, Kentucky, Maine, Michigan, Montana, Nebraska, ",
                     "Ohio, Oregon, Texas, Virginia, Wyoming"].join(""),
            id: "stateNot"
        }, {
            prompt: ["Choose a country from the list below that is not associated with ",
                     "your romantic partner and type it in the space provided. The ",
                     "country should be familiar but neither strongly liked nor ",
                     "disliked. Try not to pick a country for which you have strong ",
                     "feelings (e.g., not a country associated with a friend or family ",
                     "member). Please capitalize the first letter only.<br>",
                     "Argentina, Australia, Brazil, China, Denmark, Egypt, England, ",
                     "Hungary, India, Italy, Laos, Mexico, Norway, Russia, Spain, ",
                     "Sudan, Thailand, Venezuela"].join(""),
            id: "countryNot"
        }]
    }, {
        block: "practice1",
        instructions: ["Put your middle or index fingers on the E and I keys of your ",
                       "keyboard. Words representing the categories at the top will ",
                       "appear one-by-one in the middle of the screen. When the item ",
                       "belongs to a category on the left, press the E key; when the ",
                       "item belongs to a category on the right, press the I key. ",
                       "Items belong to only one category. If you make an error, an ",
                       "X will appear - fix the error by hitting the other key.<br>",
                       "This is a timed sorting task. GO AS FAST AS YOU CAN while ",
                       "making as few mistakes as possible. Going too slow or making ",
                       "too many errors will result in an uninterpretable score. This ",
                       "task will take about 5 minutes to complete."].join(""),
        leftWord: UNPLEASANT_CATEGORY,
        rightWord: PLEASANT_CATEGORY,
        trials: makePleasantTrials(20)
    }, {
        block: "practice2",
        instructions: ["Notice above that the categories have changed. You will ",
                       "now classify the items you provided earlier into the ",
                       "categories above. The rules, are the same. When the item ",
                       "belongs to a category on the left, press the E key; when ",
                       "the item belongs to a category on the right, press the I ",
                       "key. Items belong to only one category. A X appears after an",
                       "error - fix the error by hitting the other key. GO AS FAST ",
                       "AS YOU CAN."].join(""),
        leftWord: PARTNER_CATEGORY,
        rightWord: NOT_PARTNER_CATEGORY,
        trials: makePartnerTrials(20)
    }, {
        block: "practice3",
        instructions: ["Notice above that the four categories you saw separately ",
                       "now appear together. You will either classify the items you ",
                       "provided earlier into the categories Partner or Not Partner, ",
                       "or you will classify words into the Pleasant or Unpleasant ",
                       "categories.<br>",
                       "Use the E key to classify items into the categories on the left.",
                       "Use the I key to classify items into the categories on the right. ",
                       "Correct errors by hitting the other key."].join(""),
        leftWord: [UNPLEASANT_CATEGORY, PARTNER_CATEGORY],
        rightWord: [PLEASANT_CATEGORY, NOT_PARTNER_CATEGORY],
        trials: makeMixedTrials(20)
    }, {
        block: "test1",
        instructions: ["Sort the same four categories again. Remember to go as fast as ",
                       "you can while making as few mistakes as possible.<br>",
                       "The green and white labels and items may help you identify the ",
                       "appropriate category. Use the E key to classify items into the ",
                       "categories on the left. Use the I key to classify items into the ",
                       "categories on the right. Correct errors by hitting the other key."
                      ].join(""),
        leftWord: [UNPLEASANT_CATEGORY, PARTNER_CATEGORY],
        rightWord: [PLEASANT_CATEGORY, NOT_PARTNER_CATEGORY],
        trials: makeMixedTrials(40)
    }, {
        block: "practice4",
        instructions: [
		    "Notice above that there are only two categories and they have switched ",
            "positions. The category that was previously on the left is now on the ",
            "right, and the category that was on the right is now on the left. ",
            "Practice this new configuration.<br>",
            "Use the E and I keys to categorize items left and right, and correct ",
            "errors by hitting the other key."].join(""),
        leftWord: NOT_PARTNER_CATEGORY,
        rightWord: PARTNER_CATEGORY,
        trials: makePartnerTrials(20)
    }, {
        block: "practice5",
        instructions: [
            "Notice above that the four categories now appear together in a new ",
            "configuration. Remember, each item belongs to only one group.<br>",
            "The green and white labels and items may help to identify the ",
            "appropriate category. Use the E key to classify items into the ",
            "categories on the left. Use the I key to classify items into the ",
            "categories on the right. Correct errors by hitting the other key."].join(""),
        leftWord: [NOT_PARTNER_CATEGORY, PLEASANT_CATEGORY],
        rightWord: [PARTNER_CATEGORY, UNPLEASANT_CATEGORY],
        trials: makeMixedTrials(20)
    }, {
        block: "test2",
        instructions: [
            "Sort the same four categories again. Remember to go as fast as you ",
            "can while making as few mistakes as possible.<br>",
            "The green and white labels and items may help to identify the ",
            "appropriate category. Use the E key to classify items into the ",
            "categories on the left. Use the I key to classify items into the ",
            "categories on the right. Correct errors by hitting the other key."].join(""),
        leftWord: [NOT_PARTNER_CATEGORY, PLEASANT_CATEGORY],
        rightWord: [PARTNER_CATEGORY, UNPLEASANT_CATEGORY],
        trials: makeMixedTrials(40)
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

        // Define this here so "unique" is closed over.
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
        showNextScreen();
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
