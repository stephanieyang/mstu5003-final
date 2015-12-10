

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
	return [];
}

$(document).ready(function() {
	console.log("ready");
	$("#var-what-global").hover(function() { toggleColor("#scope-what-global", "cyan"); });
	$("#var-what-arg").hover(function() { toggleColor("#scope-what-arg", "magenta"); });
	$("#var-what-local").hover(function() { toggleColor("#scope-what-local", "yellow"); });
	$("#var-how-global-global").hover(function() { toggleColor("#scope-how-global-global", "cyan"); });
	$(".var-A").hover(function() { toggleColor(".scope-A", "cyan"); });
	$(".var-B").hover(function() { toggleColor(".scope-B", "magenta"); });
	$(".var-C").hover(function() { toggleColor(".scope-C", "yellow"); });
	$(".var-D").hover(function() { toggleUnderline(".scope-D", "red"); });
	$(".var-E").hover(function() { toggleUnderline(".scope-E", "green"); });
	//$(".var-A").hover(function() { $(".scope-A").toggleClass("cyan"); });

	$("#try-1 .highlightable").click(function() {
		$(this).toggleClass("magenta");
	});

	$("button").click(function() {
		var problemName = $(this).parent().parent().attr("id");
		var problemNumber = problemName[problemName.length - 1];
		// TODO: FIX
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