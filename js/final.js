/* Turns line highlighting on/off. */
function toggleColor(target, color) {
	$(target).toggleClass(color);
}

/* Reveals text in a certain textbox when a given button is clicked. The button is disabled afterwards. */
function showValueOnClick(buttonName, boxName, value) {
	$(boxName).val(value);
	$(buttonName).addClass("disabled");
}

/* Constructor for answers to assessment problems.
 * Kind of hack-y (this requires separate maintenance of problem definitions and problem answers)
 * but taking the problem definitions from code and accounting for all the CSS/formatting manipulation
 * would take longer than is feasible for this project. Alas.
 */
function ProblemAnswer(options) {
	var options = options ? options : {};

	this.solnLineArray = options.solnLineArray ? options.solnLineArray : [];
	this.freeResponseArray = options.freeResponseArray ? options.freeResponseArray : [];
}

/* Checks user answers to assessment problems and returns a list of any errors the user has made.
 * Assumes all lines in a function are unique. This won't be true for any arbitrary code
 * (notably this might be buggy on two-function problems for global highlighting due to the multiple '}' lines),
 * but is good enough for the purposes of this project. */
function getProblemErrors(problemNumber) {
	var currentProblem = assessmentProblems[problemNumber-1];
	var errors = [];

	var highlightedLines = $("#try-" + problemNumber + " .well .yellow"); // array of span elements
	var numHighlightedLines = highlightedLines.length;
	var wantedLines = currentProblem.solnLineArray;
	var numWantedLines = wantedLines.length;
	var numMatchedLines = 0;
	var overHighlighted = false;
	var underHighlighted = false;

	/* Checking highlights */
	/*
	iterate through highlightedLines:
		if in wantedLines:
			increase counter
		else:
			add error: added at least one line too many
	if counter < wantedLines: this means at least one wanted line has not been highlighted
		add error: missing at least one line
	output list of errors (may be empty or non-empty depending on user errors)
	*/
	for(var i = 0; i < numHighlightedLines; i++) {
		var matchFound = false;
		for(var j = 0; j < numWantedLines; j++) {
			if($(highlightedLines[i]).text() === wantedLines[j]) {
				//console.log($(highlightedLines[i]).text());
				numMatchedLines++;
				matchFound = true;
				break;
			}
		}
		if(matchFound === false) {
			overHighlighted = true; // not in wantedLines => unwanted line
		}
	}
	underHighlighted = (numMatchedLines < numWantedLines); // missed some lines we want highlighted
	if(underHighlighted) {
		errors.push("You've missed some lines included in the specified scope.");
	}
	if(overHighlighted) {
		errors.push("You've added some lines that aren't actually in the specified scope.");
	}

	/* Checking free-response answers */
	var userAnswers = $("#try-" + problemNumber + " input"); // array of input elements
	var correctAnswers = currentProblem.freeResponseArray;
	var incorrectAnswersFound = false;
	if(userAnswers.length != correctAnswers.length) {
		console.log("ERROR: mismatch in problem definitions for problem " + problemNumber + ".");
	}
	for(var i = 0; i < userAnswers.length; i++) {
		if($(userAnswers[i]).val() == correctAnswers[i]) {
			$(userAnswers[i]).css('color','green');
		} else {
			$(userAnswers[i]).css('color','red');
			incorrectAnswersFound = true;
		}
	}
	if(incorrectAnswersFound) {
		errors.push("Some of your free response questions were incorrect.");
	}

	return errors;
}

/* Takes a list of errors and returns a string of formatted feedback for display. */
function getFeedbackText(errors) {
	var feedbackText = "";
	if(errors.length != 0) {
		feedbackText = "<p class='msg-error'>Try again!</p><ul>";
		for(var i = 0; i < errors.length; i++) {
			feedbackText += "<li class='msg-error'>" + errors[i] + "</li>";
		}
		feedbackText += "</ul>";
	} else {
		feedbackText = "<p class='msg-success'>Congratulations! You've successfully completed this problem.</p>"
	}
	return feedbackText;
}

var assessmentProblems = [];

/* Reads in a list of problem answer definitions and stores them in the global array assessmentProblems. */
function getProblems() {
	for (var i = 0; i < problemData.length; i++) {
		var newProblem = new ProblemAnswer(problemData[i]);
		assessmentProblems.push(newProblem);
	}
}


$(document).ready(function() {
	getProblems();

	// buggy code - intended to read in data for the first and set highlights accordingly
	/*
	for(var i = 0; i < whatExample.length; i++) {
		var example = whatExample[i];
		var varID = example.varID;
		console.log(example);
		console.log(varID);
		console.log(example.color);
		var varName = "#var-" + varID;
		var scopeName = "#scope-" + varID;
		console.log(varName);
		console.log(scopeName);
		$(varName).hover(function() { toggleColor(scopeName, example.color); });
	}
	*/

	/* Would be nice to get rid of this repetitive code, but that takes more time than I have. :( */


	/* "What is scope" highlightable demo. */
	$("#var-what-global").hover(function() { toggleColor("#scope-what-global", "cyan"); });
	$("#var-what-arg").hover(function() { toggleColor("#scope-what-arg", "magenta"); });
	$("#var-what-local").hover(function() { toggleColor("#scope-what-local", "yellow"); });

	/* Global scope example. */
	$("#var-global-global").hover(function() { toggleColor("#scope-global-global", "cyan"); });
	$("#check-global-global").click(function() { showValueOnClick("#check-global-global", "#show-global-global", "5"); });


	/* Local scope example. */
	$("#var-local-global1").hover(function() { toggleColor("#scope-local-global1", "cyan"); });
	$("#var-local-local").hover(function() { toggleColor("#scope-local-local", "magenta"); });
	$("#var-local-global2").hover(function() { toggleColor("#scope-local-global2", "yellow"); });

	$("#check-local-global1").click(function() { showValueOnClick("#check-local-global1", "#show-local-global1", "3"); });
	$("#check-local-local").click(function() { showValueOnClick("#check-local-local", "#show-local-local", "nonexistent!"); });
	$("#check-local-global2").click(function() { showValueOnClick("#check-local-global2", "#show-local-global2", "7"); });


	/* Function argument scope example.
	 * To maintain color consistency, the local arg will be higlighted in magenta and the global variable will be highlighted in cyan. */
	$("#var-local-arg-arg").hover(function() { toggleColor("#scope-local-arg-arg", "magenta"); });
	$("#var-local-arg-global").hover(function() { toggleColor("#scope-local-arg-global", "cyan"); });

	$("#check-local-arg-arg").click(function() { showValueOnClick("#check-local-arg-arg", "#show-local-arg-arg", "nonexistent!"); });
	$("#check-local-arg-global").click(function() { showValueOnClick("#check-local-arg-global", "#show-local-arg-global", "\"Hello world\""); });


	/* Function copies scope example. Same highlighting process as previous example. */
	$("#var-local-copies-arg").hover(function() { toggleColor("#scope-local-copies-arg", "magenta"); });
	$("#var-local-copies-global").hover(function() { toggleColor("#scope-local-copies-global", "cyan"); });

	$("#check-local-copies-globalA").click(function() { showValueOnClick("#check-local-copies-globalA", "#show-local-copies-globalA", "3"); });
	$("#check-local-copies-argA").click(function() { showValueOnClick("#check-local-copies-argA", "#show-local-copies-argA", "nonexistent!"); });
	$("#check-local-copies-globalB").click(function() { showValueOnClick("#check-local-copies-globalB", "#show-local-copies-globalB", "3"); });
	$("#check-local-copies-argB").click(function() { showValueOnClick("#check-local-copies-argB", "#show-local-copies-argB", "3"); });
	$("#check-local-copies-globalC").click(function() { showValueOnClick("#check-local-copies-globalC", "#show-local-copies-globalC", "3"); });
	$("#check-local-copies-argC").click(function() { showValueOnClick("#check-local-copies-argC", "#show-local-copies-argC", "5"); });
	$("#check-local-copies-globalD").click(function() { showValueOnClick("#check-local-copies-globalD", "#show-local-copies-globalD", "3"); });
	$("#check-local-copies-argD").click(function() { showValueOnClick("#check-local-copies-argD", "#show-local-copies-argD", "nonexistent!"); });


	/* No need for JQuery/JS in the shadowing examples... */


	/* Hoisting example. */
	$("#var-local-hoisting1-global").hover(function() { toggleColor("#scope-local-hoisting1-global", "cyan"); });
	$("#check-local-hoisting1-globalA").click(function() { showValueOnClick("#check-local-hoisting1-globalA", "#show-local-hoisting1-globalA", "undefined"); });
	$("#check-local-hoisting1-globalB").click(function() { showValueOnClick("#check-local-hoisting1-globalB", "#show-local-hoisting1-globalB", "3"); });

	$("#var-local-hoisting2-global").hover(function() { toggleColor("#scope-local-hoisting2-global", "cyan"); });


	/* Block scope examples. */
	$("#var-local-block-true").hover(function() { toggleColor("#scope-local-block-true", "cyan"); });
	$("#check-local-block-true").click(function() { showValueOnClick("#check-local-block-true", "#show-local-block-true", "\"Hello!\""); });

	$("#var-local-block-false").hover(function() { toggleColor("#scope-local-block-false", "cyan"); });
	$("#check-local-block-false").click(function() { showValueOnClick("#check-local-block-false", "#show-local-block-false", "undefined"); });

	
	/* Code hover-highlighting for the different assessment problems. Using yellow instead of cyan and magenta (previously associated with global/local.) */
	$("#try .highlightable").click(function() { $(this).toggleClass("yellow"); });

	/* Setting up evaluation and feedback for user submissions on assessment problems. */
	$("#try button").click(function() {
		var problemName = $(this).parent().parent().attr("id");
		var problemNumber = problemName[problemName.length - 1];

		var errors = getProblemErrors(problemNumber)
		var feedback = getFeedbackText(errors);
		$("#feedback-" + problemNumber).html(feedback);
	});

	/* User free answer are colored red/green upon evaluation, so turn the text black again if they try anything else. */
	$("#try input").keypress(function() { $(this).css('color','black'); });
});