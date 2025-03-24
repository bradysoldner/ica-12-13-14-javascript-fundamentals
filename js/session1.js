/**
 * JavaScript for Session 1: JavaScript Fundamentals
 */

// Toggle sidebar visibility
function toggleSidebar() {
	const contentCol = document.querySelector(".col-md-9");
	const sidebarCol = document.querySelector(".col-md-3");

	if (sidebarCol.style.display === "none") {
		// Show sidebar
		sidebarCol.style.display = "";
		contentCol.className = "col-md-9";
	} else {
		// Hide sidebar
		sidebarCol.style.display = "none";
		contentCol.className = "col-md-12";
	}
}

// Function to scroll to top
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

// Show/hide back to top button based on scroll position
window.onscroll = function () {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("back-to-top").style.display = "block";
	} else {
		document.getElementById("back-to-top").style.display = "none";
	}
};

// DOM Content Loaded event listener to ensure the DOM is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
	// Create toggle button
	const toggleButton = document.createElement("button");
	toggleButton.innerHTML = "☰";
	toggleButton.className = "sidebar-toggle";
	toggleButton.setAttribute("aria-label", "Toggle sidebar");

	// Only add the click event to the button itself
	toggleButton.addEventListener("click", function (e) {
		// Prevent the event from bubbling up
		e.stopPropagation();
		toggleSidebar();
	});

	// Add the button to the page
	document.body.appendChild(toggleButton);

	// Console demo functionality
	const executeBtn = document.getElementById("execute-btn");
	if (executeBtn) {
		executeBtn.addEventListener("click", function () {
			let code = document.getElementById("console-input").value;
			let output = document.getElementById("console-output");

			try {
				let result = eval(code);
				output.innerText = result;
				output.style.color = "white";
			} catch (error) {
				output.innerText = "Error: " + error.message;
				output.style.color = "#ff6b6b";
			}
		});
	}
});

// Exercise 1 check
function checkExercise1() {
	let code = document.getElementById("exercise1-input").value;
	let feedback = document.getElementById("exercise1-feedback");

	// Check if code includes the required variables
	let hasGreeting = /let\s+greeting|const\s+greeting|var\s+greeting/.test(code);
	let hasAge = /let\s+age|const\s+age|var\s+age/.test(code);
	let hasIsStudent = /let\s+isStudent|const\s+isStudent|var\s+isStudent/.test(
		code
	);
	let hasConsoleLog = /console\.log/.test(code);

	if (hasGreeting && hasAge && hasIsStudent && hasConsoleLog) {
		feedback.className = "alert alert-success";
		feedback.innerHTML =
			"<strong>Great job!</strong> Your code includes all the required elements.";
		feedback.style.display = "block";
	} else {
		feedback.className = "alert alert-warning";
		feedback.innerHTML =
			"<strong>Almost there!</strong> Make sure you've included: " +
			(!hasGreeting ? "<br>- A variable named 'greeting'" : "") +
			(!hasAge ? "<br>- A variable named 'age'" : "") +
			(!hasIsStudent ? "<br>- A variable named 'isStudent'" : "") +
			(!hasConsoleLog ? "<br>- console.log() statements" : "");
		feedback.style.display = "block";
	}
}

// Exercise 2 functionality
function runExercise2() {
	let code = document.getElementById("exercise2-input").value;
	let feedback = document.getElementById("exercise2-feedback");

	try {
		// Execute the code
		eval(code);

		// Check if the paragraph has been modified
		let paragraph = document.getElementById("exercise2-paragraph");
		let styleChanged = paragraph.style.color || paragraph.style.backgroundColor;
		let contentChanged =
			paragraph.innerText !==
			'This paragraph has an ID of "exercise2-paragraph". Your task is to modify it using JavaScript.';

		if (styleChanged && contentChanged) {
			feedback.className = "alert alert-success";
			feedback.innerHTML =
				"<strong>Excellent!</strong> You've successfully modified both the content and styling of the paragraph.";
		} else if (styleChanged || contentChanged) {
			feedback.className = "alert alert-warning";
			feedback.innerHTML =
				"<strong>Good start!</strong> You've changed " +
				(contentChanged ? "the content" : "the styling") +
				" of the paragraph. Now try to change " +
				(contentChanged ? "the styling too" : "the content too") +
				".";
		} else {
			feedback.className = "alert alert-danger";
			feedback.innerHTML =
				"<strong>Try again!</strong> Your code ran but didn't modify the paragraph.";
		}

		feedback.style.display = "block";
	} catch (error) {
		feedback.className = "alert alert-danger";
		feedback.innerHTML = "<strong>Error:</strong> " + error.message;
		feedback.style.display = "block";
	}
}

function resetExercise2() {
	let paragraph = document.getElementById("exercise2-paragraph");
	paragraph.innerText =
		'This paragraph has an ID of "exercise2-paragraph". Your task is to modify it using JavaScript.';
	paragraph.style = "";
	document.getElementById("exercise2-feedback").style.display = "none";
}

// Exercise 3 functionality
function runExercise3() {
	let code = document.getElementById("exercise3-input").value;
	let feedback = document.getElementById("exercise3-feedback");

	try {
		// Execute the code
		eval(code);

		feedback.className = "alert alert-success";
		feedback.innerHTML =
			"<strong>Code executed!</strong> See if your code produces the desired behavior when you click the button.";
		feedback.style.display = "block";
	} catch (error) {
		feedback.className = "alert alert-danger";
		feedback.innerHTML = "<strong>Error:</strong> " + error.message;
		feedback.style.display = "block";
	}
}

function resetExercise3() {
	let container = document.getElementById("exercise3-container");
	container.innerHTML = `
        <h4 id="exercise3-heading">Hello, World!</h4>
        <p id="exercise3-text">Click the button below to change this text.</p>
        <button id="exercise3-button" class="btn btn-primary">Click Me</button>
    `;
	document.getElementById("exercise3-feedback").style.display = "none";
}

// DOM Demo functions
function changeHeading() {
	let heading = document.getElementById("demo-heading");
	heading.innerHTML = "Updated Heading!";
}

function changeParagraphColor() {
	let paragraph = document.getElementById("demo-paragraph");
	paragraph.style.color = "red";
}

function changeButtonText() {
	let button = document.getElementById("demo-button");
	button.innerHTML = "Clicked!";
}

function addBorder() {
	let demoElement = document.getElementById("demo-element");
	demoElement.style.border = "3px solid purple";
}

function resetDemo() {
	let heading = document.getElementById("demo-heading");
	heading.innerHTML = "Original Heading";

	let paragraph = document.getElementById("demo-paragraph");
	paragraph.style.color = "";

	let button = document.getElementById("demo-button");
	button.innerHTML = "Click Me";

	let demoElement = document.getElementById("demo-element");
	demoElement.style.border = "1px solid #dee2e6";
}

// Process code blocks to prevent line wrapping
document.querySelectorAll(".code-block").forEach((block) => {
	block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
});
