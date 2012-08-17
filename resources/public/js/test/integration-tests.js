;(function () {

    // If proper unit tests do not require a certain order,
    // then these are not proper unit tests. Below is a run
    // through of the whole IAT, so ordering was important.
    QUnit.config.reorder = false;

    // Our tests will mimic a user typing on a keyboard.  Accept
    // upper and lowercase keys to account for caps lock.
    var fakePress = function (keyCode, context) {
        var e = $.Event("keydown");
        e.which = keyCode;
        if (context) {
            context.trigger(e);
        } else {
            $(document).trigger(e);
        }
    };
    var getEnterKeyCode = function () {
        return 13;
    };
    var getLeftKeyCode = function () {
        return Math.random() > .5 ? 101 : 69;
    };
    var getRightKeyCode = function () {
        return Math.random() > .5 ? 105 : 73;
    };
    var getSpaceKeyCode =  function () {
        return 32;
    };
    var fakeEnterPress = function () {
        fakePress(getEnterKeyCode());
    };
    var fakeLeftPress = function () {
        fakePress(getLeftKeyCode());
    };
    var fakeRightPress = function () {
        fakePress(getRightKeyCode());
    };
    var fakeSpacePress = function () {
        fakePress(getSpaceKeyCode());
    };

    // Some methods to pull the current state out of the IAT.
    var createCenterWord = window.parenthood.createCenterWord;
    var equalsResults = window.parenthood.equalsResults;
    var getDelay = window.parenthood.getDelay;
    var getNumScreens = window.parenthood.getNumScreens;
    var getPromise = window.parenthood.remote.getPromise;
    var getScreen = window.parenthood.getScreen;
    var getTestData = window.parenthood.remote.getTestData;
    var isCorrectKey = window.parenthood.correctKey;
    var isInput = window.parenthood.isInput;
    var isTrial = window.parenthood.isTrial;
    var isInstructions = window.parenthood.isInstructions;
    var makeLabel = window.parenthood.makeLabel;

    var getInstructions = function () {
        return $("#instructions span").html();
    };

    var INPUT_REGEX = window.parenthood.getInputRegex();
    var INPUTS = {
        nameCategory: "Partner's First Name",
        first: "Partner's First Name Again",
        last: "Partner's Last Name",
        nick: "Partner's Nick Name",
        relation: "Partner's Relationship",
        birthday: "Partner's Birthday",
        firstNot: "Random First Name",
        lastNot: "Random Last Name",
        birthdayNot: "Random Birthday",
        stateNot: "Random State",
        countryNot: "Random Country"
    };

    var leftIsCorrect = function (screen) {
        return isCorrectKey(screen, getLeftKeyCode());
    };
    var rightIsCorrect = function (screen) {
        return isCorrectKey(screen, getRightKeyCode());
    };

    // The HTML I put into IE7/8 isn't always the html that
    // comes out. Lowercase tags (<br>) get turned into
    // uppercase tags (<BR>) and multiple spaces get turned
    // into one.
    var normalizeForIE = function (str) {
        return str.toLowerCase().replace("  ", " ");
    };

    // Put a screen through its exercises.
    var workout = function (index) {
        // Make sure current screen is correct.
        var screen = getScreen();
        deepEqual(screen, getScreen(index), "screen " + index);

        if (isInstructions(screen)) {
            equal(normalizeForIE(screen.instructions),
                  normalizeForIE(getInstructions()),
                  "instructions");
            fakeEnterPress();
        } else if (isInput(screen)) {
            var active = $(document.activeElement);
            // IE7/8 sometimes have the body as the active element.
            if (!active.is("input")) {
                active = $("input");
                if (active.length > 1) {
                    throw new Error("should only be one input");
                }
            }
            if (active.is("input")) {
                var value = INPUTS[screen.id];
                active.val(value);
                _.map(value.split(""), function (letter) {
                    fakePress(letter.charCodeAt(0), active);
                });
            } else {
                throw new Error("active element should be form input");
            }
            fakeEnterPress();
        } else if (isTrial(screen)) {
            // Make sure proper categories appear in the top
            // left and right corners of the screen and the
            // prompt appears in the center.
            equal($("#left").html(), makeLabel(screen.left).html(),"left");
            equal($("#right").html(), makeLabel(screen.right).html(), "right");
            equal($("#center").html(), createCenterWord(screen.word).html(), screen.word);

            // Try to verify that input replacement happened properly.
            notEqual(screen.word, undefined, "word should not be undefined");
            notEqual(screen.word, "undefined", "word should not be string undefined");
            strictEqual($("#center").html().match(INPUT_REGEX), null, "word should not contain input regex");

            // Press the correct key for the trial.
            if (leftIsCorrect(screen)) {
                fakeLeftPress();
            } else if (rightIsCorrect(screen)) {
                fakeRightPress();
            } else {
                throw new Error("trial should fall into LEFT or RIGHT category");
            }
        } else {
            throw new Error("screen should be instructions, input, or trial");
        }
        setTimeout(start, getDelay() + 100);
    };

    for (var i = 0, n = getNumScreens(); i < n; i++) {
        (function (index) {
            test("screen "  + index, function () {
                stop();
                // Must defer first test so that html renders
                // and the first input can receive focus.
                _.defer(function () {
                    workout(index);
                });
            });
        }(i));
    };

    test("save data to server", function () {
        stop();
        getPromise().complete(function (jqXHR) {
            var success = (jqXHR.status == 200);
            ok(success, "POST response code should be 200");
            if (success) {
                getTestData().complete(function (xhr) {
                    var response = xhr.responseText;
                    var obj = JSON.parse(response);
                    var results = JSON.parse(obj.results);
                    ok(equalsResults(results), "saved data equals sent data");
                    start();
                });
            } else {
                start();
            }
        });
    });
}());
