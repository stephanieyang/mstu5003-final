

function highlightCyan(target) {
	console.log("highlightCyan, target = " + target);
	console.log($(target));
	$(target).css("background-color","#00FFFF");
}

function revertHighlight(target) {
	console.log("revertHighlight, target = " + target);
	console.log($(target));
	$(target).css("background-color","transparent");
}

function toggleColor(target, color) {
	console.log("toggleColor");
	console.log($(target));
	$(target).toggleClass(color);
}

function toggleUnderline(target, color) {
	console.log("toggleUnderline");
	console.log($(target));
	$(target).toggleClass("underline-" + color);
}

function getFeedbackText(errors) {
	var feedbackText = "";
	if(errors.length != 0) {
		feedbackText = "<ul>";
		for(var i = 0; i < errors.length; i++) {
			feedbackText += "<li class='msg-error'>" + errors[i] + "</li>";
		}
		feedbackText += "</ul>";
	} else {
		feedbackText = "<p class='msg-success'>Congratulations! You've successfully completed this problem.</p>"
	}
	return feedbackText;
}

function getErrors(problemNumber) {
	return ["fake error"];
}

function ProblemAnswer(problemNumber, lineArray, colorArray, freeResponseArray) {
	this.problemNumber = problemNumber;
	this.lineArray = lineArray;
	this.colorArray = colorArray;
	this.freeResponseArray = freeResponseArray;

}

function showValueOnClick(buttonName, boxName, value) {
	console.log("here");
	$(boxName).val(value);
	$(buttonName).addClass("disabled");
}

$(document).ready(function() {
	console.log("ready");
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
	$("#check-local-copies-argC").click(function() { showValueOnClick("#check-local-copies-argC", "#show-local-copies-argC", "-999"); });
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


	$("#try-1 .highlightable").click(function() { $(this).toggleClass("magenta"); });

	$("#try button").click(function() {
		var problemName = $(this).parent().parent().attr("id");
		var problemNumber = problemName[problemName.length - 1];
		// TODO: FIX
		// $($("#try-1 .well span.highlightable")[4]).text()
		// $($("#try-1 .well .magenta")[0])
		var errors = getErrors(problemNumber);
		var feedback = getFeedbackText(errors);
		console.log(feedback);
		$("#feedback-" + problemNumber).html(feedback);
	});

	console.log("done");
    //$("ol").sortable();
    //$(".test").css("background-color","#00FFFF");
    //highlightCyan(".scope-A");
});

/*
$(document).ready(function() {
	$(".var-A").hover(function() {
		$(".scope-A").css("background-color","#00FFFF");
	}, function() {
		$(".scope-A").css("background-color","transparent");
	});
    //$("ol").sortable();
});

function highlightCyan(target) {
	$(".scope-A").css("background-color","#00FFFF");
}

function revertHighlight(target) {
	$(".scope-A").css("background-color","transparent");
}
*/