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
    var PARTNER_WORDS = [
        "${first}",
        "${last}",
        "${nick}",
        "${relation}",
        "${birthday}"
    ];
    var NOT_PARTNER_WORDS = [
        "${firstNot}",
        "${lastNot}",
        "${birthdayNot}",
        "${stateNot}",
        "${countryNot}"
    ];

    var PARTNER_CATEGORY = "${nameCategory}";
    var NOT_PARTNER_CATEGORY = "Not " + PARTNER_CATEGORY;
    var PLEASANT_CATEGORY = "Pleasant";
    var UNPLEASANT_CATEGORY = "Unpleasant";

    var PARTNER_COLOR = "white";
    var PLEASANT_COLOR = "#00FF00";

    var input = {};

    var makeTrials = function (words, category) {
        return _.map(words, function (word) {
            return {word:word, category:category};
        });
    };
    var makePartnerTrials = function (count) {
        var half = Math.floor(count / 2);
        var partner = _.shuffle(PARTNER_WORDS).slice(0, half);
        var nonpartner = _.shuffle(NOT_PARTNER_WORDS).slice(0, count - half);

        partner = makeTrials(partner, PARTNER_CATEGORY);
        nonpartner = makeTrials(nonpartner, NOT_PARTNER_CATEGORY);

        return _.shuffle(partner.concat(nonpartner));
    };
    var makePleasantTrials = function (count) {
        var half = Math.floor(count / 2);
        var pleasant = _.shuffle(PLEASANT_WORDS).slice(0, half);
        var unpleasant = _.shuffle(UNPLEASANT_WORDS).slice(0, count - half);

        pleasant = makeTrials(pleasant, PLEASANT_CATEGORY);
        unpleasant = makeTrials(unpleasant, UNPLEASANT_CATEGORY);

        return _.shuffle(pleasant.concat(unpleasant));
    };
    var makeMixedTrials = function (count) {
        var half = Math.floor(count / 2);
        var pleasant = makePleasantTrials(half);
        var partner= makePartnerTrials(count - half);
        return _.shuffle(pleasant.concat(partner));
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
            "\"Your partner\" and \"Not your partner\" categories.  ",
            "In the task your partner's name will appear instead of the word ",
            "\"Partner\".  All of the information recorded here is completely ",
            "confidential. We will delete this information after the study is ",
            "completed."].join(""),
        trials: [
            {prompt: ["Please enter the name of your romantic partner. Please ",
                      "make sure to only capitalize the first letter in your ",
                      "partner's name."].join(""),
             id: "nameCategory"}
        ]
    }, {
        inputCategory: PARTNER_CATEGORY,
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
        inputCategory: NOT_PARTNER_CATEGORY,
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
                       "categories above. The rules are the same. When the item ",
                       "belongs to a category on the left, press the E key; when ",
                       "the item belongs to a category on the right, press the I ",
                       "key. Items belong to only one category. An X appears after an ",
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
        getPreviousItem: function (item, array) {
            var index = $.inArray(item, array);
            var previousIndex = index - 1;
            return previousIndex >= 0 ? array[previousIndex] : null;
        },
        isFirstItem: function (item, array) {
            return item === array[0];
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
    // Make the category labels that appear in the top
    // left and right corners of the screen. They must
    // be colored correctly and, if there's an array,
    // multiple labels must be shown.
    var makeLabel = (function () {
        var isPleasant = function (category) {
            return category == PLEASANT_CATEGORY ||
                category == UNPLEASANT_CATEGORY;
        };
        var color = function (category) {
            var hex = isPleasant(category) ? PLEASANT_COLOR : PARTNER_COLOR
            return $("<div/>").text(category).css({
                "color": hex,
                "font-size": "1.4em"
            });
        };
        return function (category) {
            if (_.isString(category)) {
                return color(category);
            } else if (_.isArray(category)) {
                var or = $("<div/>").text("or").css("color", "white");
                return [color(category[0]), or, color(category[1])]
            };
            return color("");
        };
    }());
    var colorContent = function (word) {
        var isPleasantWord = _.include(UNPLEASANT_WORDS, word) ||
            _.include(PLEASANT_WORDS, word);
        var color = isPleasantWord ? PLEASANT_COLOR : PARTNER_COLOR;
        return $("<span/>").text(word).css("color", color);
    };
    var isBackspace = function (key) {
        return key == 8;
    };
    var isEnter = function (key) {
        return key == 13;
    };
    var isSpace = function (key) {
        return key == 32;
    };
    var isLeft = function (key) {
        return key == 101 || key == 69;
    };
    var isRight = function (key) {
        return key == 105 || key == 73;
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

    // If a trial word contains ${}, replace it with
    // user input. Put the id of the input you want
    // between the brackets.
    var substitute = function (word, inputs) {
        if (_.isString(word)) {
            var match = word.match(INPUT_REGEX);
            if (match) {
                word = word.replace(INPUT_REGEX, inputs[match[1]]);
            }
        } else if (_.isArray(word)) {
            word = _.map(word, function (category) {
                return substitute(category, inputs);
            });
        }
        return word;
    };
    var treeIntoScreens = function (tree) {
        return _.reduce(tree, function (screens, block) {
            if (block.instructions) {
                screens.push({instructions: block.instructions});
            }
            var allTrials = (block && block.trials) || [];
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
                } else if (isInput(trial) && block.inputCategory) {
                    _.extend(trial, {
                        inputCategory: block.inputCategory
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
            $("#center").empty();
        };

        var error = (function () {
            var intervalId;
            var show = function () {
                clearTimeout(intervalId);
                $("#errorDisplay").text("X");
                intervalId = setTimeout(hide, 500);
            };
            var hide = function () {
                clearTimeout(intervalId);
                $("#errorDisplay").text("");
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
        };

        var inputDOM = function (screen) {
            var id = makeInputId(screen);
            var topLabel = makeLabel(screen.inputCategory).css({
                "min-height": "50px",
                "text-align": "center",
                "width": "100%"
            });
            var inputLabel = $("<label/>")
                .attr("for", id)
                .html(screen.prompt)
                .css({
                    "display": "block",
                    "font-size": ".8em",
                    "margin-bottom": "1em"
                });
            var textInput = $("<input/>").attr({
                "autofocus": true,
                "id": id,
                "name": id
            }).css({
                "margin-left": "30%",
                "width": "40%"
            }).focus();
            // On windows machines, the call to focus() above
            // isn't doing anything. Call it again after a delay.
            setTimeout(function () {
                textInput.focus();
            }, 250);
            return $("<div/>")
                .append(topLabel, inputLabel, textInput)
                .css({
                    "margin-left": "20%",
                    "width": "60%",
                });
        };
        var instructionsDOM = function (screen) {
            var instr = $("<div/>")
                .html(screen.instructions)
                .css({
                    "line-height": "1.2em"
                });
            var buttons = $("<div/>").css({
                "margin-top": "1em",
                "min-height": "1.1em",
                "position": "relative",
                "width": "100%"
            });
            if (!$.isFirstItem(screen, SCREENS)) {
                buttons.append($("<button/>").css({
                    "font-size": ".8em",
                    "margin-left": "1em"
                }).text("Press Backspace to previous"));
            }
            buttons.append($("<button/>").css({
                "font-size": ".8em",
                "position": "absolute",
                "right": "1em"
            }).text("Press Enter to continue"));
            return $("<div/>").css({
                background: "white",
                color: "black",
                padding: "1em",
                marginLeft: "20%",
                width: "60%"
            }).append(instr, buttons);
        };
        var trialDOM = function (screen) {
            var leftElem = $("<div/>").css({
                "left": "1em",
                "position": "absolute"
            });
            leftElem.append.apply(leftElem, makeLabel(screen.left));
            var rightElem = $("<div/>").css({
                position: "absolute",
                right: "1em"
            });
            rightElem.append.apply(rightElem, makeLabel(screen.right));
            var errorElem = $("<div/>").attr("id", "errorDisplay").css({
                color: "red",
                fontSize: "2em",
                position: "absolute",
                top: "115px",
                textAlign: "center",
                width: "100%"
            });
            var centerElem = $("<div/>").attr("id", "center").css({
                fontSize: "1.4em",
                position: "absolute",
                textAlign: "center",
                top: "200px",
                width: "100%"
            }).append(colorContent(screen.word));
            return $("<div/>").append(leftElem, rightElem, errorElem, centerElem);
        };

        var update = function (screen) {
            var domFunc = inputDOM;
            if (isInstructions(screen)) {
                domFunc = instructionsDOM;
            } else if (isTrial(screen)) {
                domFunc = trialDOM;
            }
            $("body").empty().append(domFunc(screen));
        };

        return {
            clear: clear,
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

    var show = function (fresh) {
        screen = $.extend(fresh, {
            category: substitute(fresh.category, input),
            inputCategory: substitute(fresh.inputCategory, input),
            left: substitute(fresh.left, input),
            right: substitute(fresh.right, input),
            word: substitute(fresh.word, input),
            time: new Date().getTime()
        });
        display.update(screen);
    };
    var showPreviousScreen = function () {
        show($.getPreviousItem(screen, SCREENS));
    };
    var showNextScreen = function () {
        if (screen) {
            results.push($.deepCopy(screen));
        }
        show($.getNextItem(screen, SCREENS));
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
                    if (isTrial(screen)) {
                        setTimeout(doAdvanceTest, DELAY);
                    } else {
                        doAdvanceTest();
                    }
                }
            } else if (isTrial(screen) && (isLeft(key)||isRight(key))) {
                display.error.show();
            }

            // Prevent default behavior is backspace key is pressed.
            // (i.e., prevent browser from going back a page).
            return !(isInstructions(screen) && isBackspace(key));
        };
        var handleKeyDown = function (e) {
            if (isInstructions(screen) && isBackspace(e.which)) {
                // Intercept backspace press, pass it to the normal
                // handler, and then prevent the browser from going
                // back to the previous page (the default behavior).
                handleKeyPress(e);
                return false;
            };
        };

        showNextScreen();
        $("body")
            .on("keypress", handleKeyPress)
            .on("keydown", handleKeyDown)
            .css({
                "background-color": "#004B97",
                "color": "white",
                "font-family": "sans-serif",
                "font-size": "1.4em"
            });
    });

    // Expose some methods. Mainly for testing.
    return {
        correctKey: correctKey,
        display: display,
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
