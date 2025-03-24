/**
 * JavaScript for Session 2: Functions & DOM Interaction
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

// DOM Content Loaded event listener
document.addEventListener("DOMContentLoaded", function () {
	// Create toggle button for sidebar
	const toggleButton = document.createElement("button");
	toggleButton.innerHTML = "☰";
	toggleButton.className = "sidebar-toggle";
	toggleButton.setAttribute("aria-label", "Toggle sidebar");

	toggleButton.addEventListener("click", function (e) {
		e.stopPropagation();
		toggleSidebar();
	});

	document.body.appendChild(toggleButton);

	// Basic Function Demo - Greeting Button
	const greetButton = document.getElementById("greet-button");
	if (greetButton) {
		greetButton.addEventListener("click", function () {
			alert("Hello! Welcome to Session 2!");
		});
	}

	// Function Parameters Demo
	const personalizedGreetButton = document.getElementById(
		"personalized-greet-button"
	);
	if (personalizedGreetButton) {
		personalizedGreetButton.addEventListener("click", function () {
			const nameInput = document.getElementById("name-input").value.trim();
			const timeSelect = document.getElementById("time-select").value;
			const greetingOutput = document.getElementById("greeting-output");

			// Function with parameters
			function createGreeting(name, time) {
				// Use default value if name is empty
				const userName = name === "" ? "Guest" : name;
				return `Good ${time}, ${userName}! Welcome to our JavaScript tutorial.`;
			}

			const greetingMessage = createGreeting(nameInput, timeSelect);
			greetingOutput.textContent = greetingMessage;
			greetingOutput.style.display = "block";
		});
	}

	// Function Return Values Demo
	const calculateButton = document.getElementById("calculate-button");
	if (calculateButton) {
		calculateButton.addEventListener("click", function () {
			const width = parseFloat(document.getElementById("width-input").value);
			const height = parseFloat(document.getElementById("height-input").value);

			function calculateArea(width, height) {
				return width * height;
			}

			function calculatePerimeter(width, height) {
				return 2 * (width + height);
			}

			document.getElementById("area-output").textContent = calculateArea(
				width,
				height
			);
			document.getElementById("perimeter-output").textContent =
				calculatePerimeter(width, height);
		});
	}

	// Function Scope Demo
	// Global variable
	let count = 0;

	const localIncrementButton = document.getElementById(
		"local-increment-button"
	);
	const globalIncrementButton = document.getElementById(
		"global-increment-button"
	);

	if (localIncrementButton && globalIncrementButton) {
		function incrementLocal() {
			let count = 10; // Local variable that shadows the global count
			count++;
			return count;
		}

		function incrementGlobal() {
			count++; // Modifies the global count
			return count;
		}

		localIncrementButton.addEventListener("click", function () {
			const result = incrementLocal();
			document.getElementById("local-count-display").textContent = result;
			// Update display of global count (which remains unchanged)
			document.getElementById("global-count-display").textContent = count;
		});

		globalIncrementButton.addEventListener("click", function () {
			const result = incrementGlobal();
			document.getElementById("global-result-display").textContent = result;
			// Update display of global count (which has changed)
			document.getElementById("global-count-display").textContent = count;
		});
	}

	// Arrow Functions Demo
	const filterTraditionalBtn = document.getElementById("filter-traditional");
	const filterArrowBtn = document.getElementById("filter-arrow");

	if (filterTraditionalBtn && filterArrowBtn) {
		function filterEvenNumbers(numbers) {
			return numbers.filter(function (num) {
				return num % 2 === 0;
			});
		}

		const filterEvenArrow = (numbers) => {
			return numbers.filter((num) => num % 2 === 0);
		};

		function processInput() {
			const numbersInput = document.getElementById("numbers-input").value;
			// Parse the comma-separated input to an array of numbers
			const numbersArray = numbersInput
				.split(",")
				.map((num) => parseInt(num.trim()))
				.filter((num) => !isNaN(num));
			return numbersArray;
		}

		filterTraditionalBtn.addEventListener("click", function () {
			const numbers = processInput();
			const result = filterEvenNumbers(numbers);
			document.getElementById("filter-result").textContent = result.join(", ");
		});

		filterArrowBtn.addEventListener("click", function () {
			const numbers = processInput();
			const result = filterEvenArrow(numbers);
			document.getElementById("filter-result").textContent = result.join(", ");
		});
	}

	// DOM Manipulation Demo
	const textButton = document.getElementById("text-button");
	const colorButtons = [
		document.getElementById("color-red"),
		document.getElementById("color-green"),
		document.getElementById("color-blue"),
	];
	const toggleButtons = [
		document.getElementById("toggle-bold"),
		document.getElementById("toggle-italic"),
		document.getElementById("toggle-highlight"),
	];
	const resetButton = document.getElementById("reset-button");

	if (textButton && colorButtons[0] && toggleButtons[0] && resetButton) {
		const demoElement = document.getElementById("demo-element");
		const demoText = document.getElementById("demo-text");
		const originalHTML = demoElement.innerHTML;

		textButton.addEventListener("click", function () {
			const newText = document.getElementById("text-input").value;
			demoText.textContent = newText;
		});

		colorButtons[0].addEventListener("click", function () {
			demoText.style.color = "red";
		});

		colorButtons[1].addEventListener("click", function () {
			demoText.style.color = "green";
		});

		colorButtons[2].addEventListener("click", function () {
			demoText.style.color = "blue";
		});

		toggleButtons[0].addEventListener("click", function () {
			demoText.classList.toggle("fw-bold");
		});

		toggleButtons[1].addEventListener("click", function () {
			demoText.classList.toggle("fst-italic");
		});

		toggleButtons[2].addEventListener("click", function () {
			demoText.classList.toggle("bg-warning");
		});

		resetButton.addEventListener("click", function () {
			demoElement.innerHTML = originalHTML;
		});
	}

	// Event Handling Demo
	const eventPlayground = document.getElementById("event-playground");
	const eventButton = document.getElementById("event-button");
	const eventInfo = document.getElementById("event-info");
	const eventLog = document.getElementById("event-log");

	if (eventPlayground && eventButton && eventInfo && eventLog) {
		function logEvent(eventType, additionalInfo = "") {
			const logEntry = document.createElement("div");
			const time = new Date().toLocaleTimeString();
			logEntry.innerHTML = `<small>${time}: <strong>${eventType}</strong> ${additionalInfo}</small>`;
			eventLog.prepend(logEntry);

			// Update event info display
			eventInfo.textContent = `Last event: ${eventType}`;
		}

		// Mouse events
		eventPlayground.addEventListener("click", function (e) {
			if (e.target !== eventButton) {
				// Prevent duplicate for button clicks
				logEvent("click", `at position (${e.offsetX}, ${e.offsetY})`);
			}
		});

		eventPlayground.addEventListener("dblclick", function (e) {
			logEvent("dblclick", `at position (${e.offsetX}, ${e.offsetY})`);
		});

		eventPlayground.addEventListener("mouseover", function () {
			logEvent("mouseover");
		});

		eventPlayground.addEventListener("mouseout", function () {
			logEvent("mouseout");
		});

		// Button events
		eventButton.addEventListener("click", function (e) {
			e.stopPropagation(); // Prevent event bubbling to playground
			logEvent("button click");
		});

		// Keyboard events
		eventPlayground.tabIndex = 0; // Make div focusable
		eventPlayground.addEventListener("keydown", function (e) {
			logEvent("keydown", `Key: ${e.key}`);
		});

		eventPlayground.addEventListener("keyup", function (e) {
			logEvent("keyup", `Key: ${e.key}`);
		});
	}

	// Grocery List Implementation
	const groceryInput = document.getElementById("grocery-input");
	const addButton = document.getElementById("add-button");
	const groceryList = document.getElementById("grocery-list");
	const errorMessage = document.getElementById("error-message");

	if (groceryInput && addButton && groceryList && errorMessage) {
		function addGroceryItem() {
			const itemText = groceryInput.value.trim();

			// Validate input
			if (itemText === "") {
				errorMessage.textContent = "Please enter a grocery item.";
				errorMessage.style.display = "block";
				return;
			}

			// Clear any previous error messages
			errorMessage.style.display = "none";

			// Create a new list item
			const li = document.createElement("li");
			li.className = "list-group-item";
			li.textContent = itemText;

			// Add the new item to the list
			groceryList.appendChild(li);

			// Clear the input field
			groceryInput.value = "";

			// Focus back on the input field
			groceryInput.focus();
		}

		// Add event listener for the Add button
		addButton.addEventListener("click", addGroceryItem);

		// Add event listener for Enter key in the input field
		groceryInput.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				addGroceryItem();
			}
		});
	}

	// Practice Exercises
	// Exercise 1: Create a Function
	const exercise1RunButton = document.getElementById("exercise1-run");
	if (exercise1RunButton) {
		exercise1RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise1-input").value;
			const outputDiv = document.getElementById("exercise1-output");

			try {
				// Evaluate the user's code
				const userFunction = new Function("return " + code)();

				// Check if the user code contains a function named greetPerson
				if (
					typeof userFunction === "function" &&
					userFunction.name === "greetPerson"
				) {
					// Test the function with example values
					const result = userFunction("John", 25);

					// Check if result matches expected format
					if (
						typeof result === "string" &&
						result.includes("John") &&
						result.includes("25")
					) {
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML = `<strong>Great job!</strong> Your function returned: "${result}"`;
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML =
							"<strong>Almost there!</strong> Make sure your function returns a string with both name and age.";
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a function named 'greetPerson'.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});
	}

	// Exercise 2: DOM Manipulation
	const exercise2RunButton = document.getElementById("exercise2-run");
	const exercise2ResetButton = document.getElementById("exercise2-reset");

	if (exercise2RunButton && exercise2ResetButton) {
		const buttonContainer = document.getElementById("button-container");
		const originalContainerHTML = buttonContainer.innerHTML;

		exercise2RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise2-input").value;
			const outputDiv = document.getElementById("exercise2-output");

			try {
				// Execute the user's code
				eval(code);

				// Check if a button was added to the container
				const addedButton = buttonContainer.querySelector("button");

				if (addedButton) {
					if (
						addedButton.textContent === "Click Me" &&
						addedButton.className.includes("btn") &&
						addedButton.className.includes("btn-success")
					) {
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML =
							"<strong>Great job!</strong> You've successfully created and added a button.";
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML =
							"<strong>Almost there!</strong> Make sure your button has the text 'Click Me' and the correct CSS classes.";
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> No button was added to the container.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});

		exercise2ResetButton.addEventListener("click", function () {
			buttonContainer.innerHTML = originalContainerHTML;
			document.getElementById("exercise2-output").style.display = "none";
		});
	}

	// Exercise 3: Event Handling
	const exercise3RunButton = document.getElementById("exercise3-run");
	const exercise3ResetButton = document.getElementById("exercise3-reset");

	if (exercise3RunButton && exercise3ResetButton) {
		const colorBox = document.getElementById("color-box");
		const originalBoxStyle = colorBox.style.backgroundColor;
		const originalBoxHTML = colorBox.innerHTML;

		exercise3RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise3-input").value;
			const outputDiv = document.getElementById("exercise3-output");

			try {
				// Execute the user's code
				eval(code);

				// Get a fresh reference to the color box after code execution
				const updatedColorBox = document.getElementById("color-box");

				// Test if the click event changes the color
				const initialColor = getComputedStyle(updatedColorBox).backgroundColor;

				// Simulate a click to test
				const clickEvent = new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				});
				updatedColorBox.dispatchEvent(clickEvent);

				// Check if color changed
				const newColor = getComputedStyle(updatedColorBox).backgroundColor;

				if (initialColor !== newColor) {
					outputDiv.className = "alert alert-success";
					outputDiv.innerHTML =
						"<strong>Great job!</strong> Your code changes the color on click.";

					// Simulate another click to verify toggling
					updatedColorBox.dispatchEvent(clickEvent);
					const toggledColor =
						getComputedStyle(updatedColorBox).backgroundColor;

					if (toggledColor !== newColor) {
						outputDiv.innerHTML +=
							" And it successfully toggles between colors!";
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> The color doesn't change when clicked.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});

		exercise3ResetButton.addEventListener("click", function () {
			try {
				// Get a fresh reference to the color box
				const boxToReset = document.getElementById("color-box");

				if (boxToReset) {
					boxToReset.style.backgroundColor = originalBoxStyle;
					boxToReset.innerHTML = originalBoxHTML;

					// Remove all event listeners by cloning and replacing
					if (boxToReset.parentNode) {
						const newColorBox = boxToReset.cloneNode(true);
						boxToReset.parentNode.replaceChild(newColorBox, boxToReset);
					}
				}

				document.getElementById("exercise3-output").style.display = "none";
			} catch (error) {
				console.error("Reset error:", error);
			}
		});
	}
});

document.querySelectorAll(".code-block").forEach((block) => {
	block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
});
