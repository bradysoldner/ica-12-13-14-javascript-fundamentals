/**
 * JavaScript for Session 3: Control Flow & More DOM Manipulation
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

	// Conditionals Demo
	const checkAgeButton = document.getElementById("check-age-button");
	const ageInput = document.getElementById("age-input");
	const ageResult = document.getElementById("age-result");

	if (checkAgeButton && ageInput && ageResult) {
		checkAgeButton.addEventListener("click", function () {
			const age = parseInt(ageInput.value);
			let message = "";

			if (isNaN(age)) {
				message = "Please enter a valid age";
				ageResult.className = "alert alert-danger";
			} else {
				if (age < 13) {
					message = "You are a child.";
					ageResult.className = "alert alert-info";
				} else if (age < 18) {
					message = "You are a teenager.";
					ageResult.className = "alert alert-info";
				} else if (age < 65) {
					message = "You are an adult.";
					ageResult.className = "alert alert-info";
				} else {
					message = "You are a senior.";
					ageResult.className = "alert alert-info";
				}
			}

			ageResult.textContent = message;
			ageResult.classList.remove("d-none");
		});
	}

	// Logical Operators Demo
	const calculatePriceButton = document.getElementById(
		"calculate-price-button"
	);
	const priceResult = document.getElementById("price-result");

	if (calculatePriceButton && priceResult) {
		calculatePriceButton.addEventListener("click", function () {
			const age = parseInt(document.getElementById("visitor-age").value);
			const dayOfWeek = document.getElementById("day-of-week").value;
			const isStudent = document.getElementById("is-student").checked;

			// Base ticket price
			let price = 10;
			let discounts = [];

			// Apply age-based discounts
			if (age < 12) {
				price *= 0.5; // 50% off for children
				discounts.push("Child discount: 50% off");
			} else if (age >= 65) {
				price *= 0.7; // 30% off for seniors
				discounts.push("Senior discount: 30% off");
			}

			// Apply day of week adjustment
			if (dayOfWeek === "weekend") {
				price *= 1.2; // 20% more on weekends
				discounts.push("Weekend surcharge: 20% additional");
			}

			// Apply student discount (if applicable)
			if (isStudent && age >= 12) {
				price *= 0.85; // 15% off for students
				discounts.push("Student discount: 15% off");
			}

			// Format the price with 2 decimal places and $ sign
			const formattedPrice = `$${price.toFixed(2)}`;

			// Display the result
			let resultHTML = `<strong>Ticket Price: ${formattedPrice}</strong>`;
			if (discounts.length > 0) {
				resultHTML += `<ul class="mb-0 mt-2">`;
				discounts.forEach((discount) => {
					resultHTML += `<li>${discount}</li>`;
				});
				resultHTML += `</ul>`;
			}

			priceResult.innerHTML = resultHTML;
			priceResult.classList.remove("d-none");
		});
	}

	// Arrays Demo
	let shoppingList = [];
	const itemInput = document.getElementById("item-input");
	const addItemButton = document.getElementById("add-item-button");
	const displayItemsButton = document.getElementById("display-items-button");
	const removeLastButton = document.getElementById("remove-last-button");
	const clearItemsButton = document.getElementById("clear-items-button");
	const arrayOutput = document.getElementById("array-output");

	if (itemInput && addItemButton && arrayOutput) {
		function updateDisplay() {
			arrayOutput.textContent = `Current array: [${shoppingList.join(", ")}]`;
		}

		addItemButton.addEventListener("click", function () {
			const item = itemInput.value.trim();
			if (item !== "") {
				shoppingList.push(item);
				itemInput.value = "";
				updateDisplay();
			}
		});

		if (displayItemsButton) {
			displayItemsButton.addEventListener("click", function () {
				updateDisplay();
			});
		}

		if (removeLastButton) {
			removeLastButton.addEventListener("click", function () {
				if (shoppingList.length > 0) {
					shoppingList.pop();
					updateDisplay();
				}
			});
		}

		if (clearItemsButton) {
			clearItemsButton.addEventListener("click", function () {
				shoppingList = [];
				updateDisplay();
			});
		}

		// Initialize the display
		updateDisplay();
	}

	// Array Methods Demo
	const numbers = [12, 5, 8, 130, 44];
	const findEvenButton = document.getElementById("find-even-button");
	const multiplyByTwoButton = document.getElementById("multiply-by-two-button");
	const sumAllButton = document.getElementById("sum-all-button");
	const findLargeButton = document.getElementById("find-large-button");
	const sortButton = document.getElementById("sort-button");
	const arrayMethodsOutput = document.getElementById("array-methods-output");

	if (arrayMethodsOutput) {
		// Find even numbers
		if (findEvenButton) {
			findEvenButton.addEventListener("click", function () {
				const evenNumbers = numbers.filter((num) => num % 2 === 0);
				arrayMethodsOutput.textContent = `Even numbers: [${evenNumbers.join(
					", "
				)}]`;
			});
		}

		// Multiply all by 2
		if (multiplyByTwoButton) {
			multiplyByTwoButton.addEventListener("click", function () {
				const doubled = numbers.map((num) => num * 2);
				arrayMethodsOutput.textContent = `Numbers multiplied by 2: [${doubled.join(
					", "
				)}]`;
			});
		}

		// Sum all numbers
		if (sumAllButton) {
			sumAllButton.addEventListener("click", function () {
				const sum = numbers.reduce((total, num) => total + num, 0);
				arrayMethodsOutput.textContent = `Sum of all numbers: ${sum}`;
			});
		}

		// Find numbers > 10
		if (findLargeButton) {
			findLargeButton.addEventListener("click", function () {
				const largeNumbers = numbers.filter((num) => num > 10);
				arrayMethodsOutput.textContent = `Numbers greater than 10: [${largeNumbers.join(
					", "
				)}]`;
			});
		}

		// Sort numbers
		if (sortButton) {
			sortButton.addEventListener("click", function () {
				const sortedNumbers = [...numbers].sort((a, b) => a - b);
				arrayMethodsOutput.textContent = `Sorted numbers: [${sortedNumbers.join(
					", "
				)}]`;
			});
		}
	}

	// Creating Elements Demo
	const elementType = document.getElementById("element-type");
	const elementContent = document.getElementById("element-content");
	const elementClass = document.getElementById("element-class");
	const createElementButton = document.getElementById("create-element-button");
	const elementDisplay = document.getElementById("element-display");
	const clearElementsButton = document.getElementById("clear-elements-button");

	if (createElementButton && elementDisplay) {
		createElementButton.addEventListener("click", function () {
			// Get input values
			const type = elementType.value;
			let content = elementContent.value;
			const className = elementClass.value;

			// Create the element
			const newElement = document.createElement(type);

			// Set content or attributes based on element type
			if (type === "img") {
				// For images, use content as the source
				newElement.src = content || "https://via.placeholder.com/150";
				newElement.alt = "Dynamic image";
				newElement.style.maxWidth = "100%";
			} else {
				// For other elements, set text content
				newElement.textContent = content || `A ${type} element`;
			}

			// Add CSS class if provided
			if (className) {
				newElement.className = className;
			}

			// Add some default styling for better visibility
			newElement.style.margin = "10px";
			newElement.style.padding = "10px";
			if (type !== "img") {
				newElement.style.border = "1px solid #ccc";
				newElement.style.borderRadius = "4px";
			}

			// Clear the "Created elements will appear here" message if it's the first element
			if (elementDisplay.querySelector(".text-muted")) {
				elementDisplay.innerHTML = "";
			}

			// Append the new element to the display area
			elementDisplay.appendChild(newElement);

			// Clear input fields
			elementContent.value = "";
			elementClass.value = "";
		});

		if (clearElementsButton) {
			clearElementsButton.addEventListener("click", function () {
				elementDisplay.innerHTML =
					'<p class="text-muted text-center">Created elements will appear here</p>';
			});
		}
	}

	// Modifying DOM Demo
	const taskInput = document.getElementById("task-input");
	const addTaskButton = document.getElementById("add-task-button");
	const taskList = document.getElementById("task-list");
	const clearTasksButton = document.getElementById("clear-tasks-button");

	if (addTaskButton && taskList) {
		// Add task function
		function addTask() {
			const taskText = taskInput.value.trim();
			if (taskText === "") return;

			// Create list item
			const li = document.createElement("li");
			li.className = "list-group-item";
			li.textContent = taskText;

			// Create remove button
			const removeBtn = document.createElement("button");
			removeBtn.className = "btn btn-danger btn-sm float-end remove-task";
			removeBtn.textContent = "Remove";

			// Add button to list item
			li.appendChild(removeBtn);

			// Add list item to task list
			taskList.appendChild(li);

			// Clear input
			taskInput.value = "";
			taskInput.focus();
		}

		// Handle add task button click
		addTaskButton.addEventListener("click", addTask);

		// Handle task input enter key
		taskInput.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				addTask();
			}
		});

		// Handle remove task clicks using event delegation
		taskList.addEventListener("click", function (event) {
			if (event.target.classList.contains("remove-task")) {
				// Get the parent list item and remove it
				const li = event.target.parentElement;
				taskList.removeChild(li);
			}
		});

		// Handle clear all tasks
		if (clearTasksButton) {
			clearTasksButton.addEventListener("click", function () {
				taskList.innerHTML = "";
			});
		}
	}

	// Grocery Project Demo
	const groceryName = document.getElementById("grocery-name");
	const groceryQuantity = document.getElementById("grocery-quantity");
	const groceryPrice = document.getElementById("grocery-price");
	const groceryCategory = document.getElementById("grocery-category");
	const addGroceryButton = document.getElementById("add-grocery-button");
	const groceryListBody = document.getElementById("grocery-list-body");
	const emptyListMessage = document.getElementById("empty-list-message");
	const clearGroceryListButton = document.getElementById(
		"clear-grocery-list-button"
	);

	if (addGroceryButton && groceryListBody) {
		// Add grocery item function
		function addGroceryItem() {
			// Get input values
			const name = groceryName.value.trim();
			const quantity = groceryQuantity.value;
			const price = groceryPrice.value;
			const category = groceryCategory.value;

			// Validate inputs
			if (name === "" || quantity <= 0 || price <= 0) {
				alert("Please enter valid item details");
				return;
			}

			// Calculate total price
			const totalPrice = (quantity * price).toFixed(2);

			// Create new table row
			const tr = document.createElement("tr");

			// Add row content with template literal
			tr.innerHTML = `
				<td>${name}</td>
				<td>${quantity}</td>
				<td>$${price}</td>
				<td>${category}</td>
				<td>$${totalPrice}</td>
				<td><button class="btn btn-danger btn-sm remove-item">Remove</button></td>
			`;

			// Add to the grocery list
			groceryListBody.appendChild(tr);

			// Hide empty list message
			if (emptyListMessage) {
				emptyListMessage.style.display = "none";
			}

			// Clear input fields
			groceryName.value = "";
			groceryQuantity.value = "1";
			groceryPrice.value = "1.99";
			groceryName.focus();
		}

		// Handle add grocery button click
		addGroceryButton.addEventListener("click", addGroceryItem);

		// Handle remove item clicks using event delegation
		groceryListBody.addEventListener("click", function (event) {
			if (event.target.classList.contains("remove-item")) {
				// Get the parent row and remove it
				const tr = event.target.closest("tr");
				groceryListBody.removeChild(tr);

				// Show empty list message if no items left
				if (groceryListBody.children.length === 0 && emptyListMessage) {
					emptyListMessage.style.display = "block";
				}
			}
		});

		// Handle clear grocery list
		if (clearGroceryListButton) {
			clearGroceryListButton.addEventListener("click", function () {
				groceryListBody.innerHTML = "";
				if (emptyListMessage) {
					emptyListMessage.style.display = "block";
				}
			});
		}
	}

	// Practice Exercise 1: Conditionals
	document
		.getElementById("exercise1-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise1-input").value;
			const numToCheck = Number(
				document.getElementById("number-to-check").value
			);
			const resultDiv = document.getElementById("exercise1-result");

			try {
				// Extract and run the function
				const functionBody = code.substring(
					code.indexOf("{") + 1,
					code.lastIndexOf("}")
				);
				const checkNumber = new Function("num", functionBody);

				// Test the function
				const result = checkNumber(numToCheck);

				// Check result
				let isCorrect = false;
				if (numToCheck > 0 && result === "positive") isCorrect = true;
				if (numToCheck < 0 && result === "negative") isCorrect = true;
				if (numToCheck === 0 && result === "zero") isCorrect = true;

				if (isCorrect) {
					resultDiv.className = "alert alert-success";
					resultDiv.innerHTML = `<strong>Correct!</strong> ${numToCheck} is ${result}.`;
				} else {
					resultDiv.className = "alert alert-warning";
					resultDiv.innerHTML = `<strong>Try again!</strong> Your function returned "${result}" for ${numToCheck}.`;
				}
			} catch (error) {
				resultDiv.className = "alert alert-danger";
				resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}
		});

	// Practice Exercise 2: Arrays
	// Exercise 2 functionality
	document
		.getElementById("exercise2-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise2-input").value;
			const testArrayStr = document.getElementById("test-array").value;
			const resultDiv = document.getElementById("exercise2-result");

			try {
				// Parse the input array
				const testArray = testArrayStr
					.split(",")
					.map((num) => Number(num.trim()));

				// Extract and run the function
				const functionBody = code.substring(
					code.indexOf("{") + 1,
					code.lastIndexOf("}")
				);
				const findLargestNumber = new Function("numbers", functionBody);

				// Get the expected result
				const expectedResult = Math.max(...testArray);

				// Test the function
				const result = findLargestNumber(testArray);

				if (result === expectedResult) {
					resultDiv.className = "alert alert-success";
					resultDiv.innerHTML = `<strong>Correct!</strong> The largest number is ${result}.`;
				} else {
					resultDiv.className = "alert alert-warning";
					resultDiv.innerHTML = `<strong>Try again!</strong> Your function returned ${result}, but the largest number is ${expectedResult}.`;
				}

				resultDiv.style.display = "block";
			} catch (error) {
				resultDiv.className = "alert alert-danger";
				resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
				resultDiv.style.display = "block";
			}
		});

	// Practice Exercise 3: DOM Manipulation
	// Exercise 3 functionality
	document
		.getElementById("exercise3-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise3-input").value;
			const colorList = document.getElementById("color-list");

			// Clear the list first
			colorList.innerHTML = "";

			try {
				// Execute the code
				eval(code);

				// Check if the list has been populated
				if (colorList.children.length > 0) {
					// Success, no need for explicit message
				} else {
					// Add a message if the list is empty
					const errorMsg = document.createElement("li");
					errorMsg.className = "list-group-item text-danger";
					errorMsg.textContent =
						"No colors were added to the list. Check your code.";
					colorList.appendChild(errorMsg);
				}
			} catch (error) {
				const errorMsg = document.createElement("li");
				errorMsg.className = "list-group-item text-danger";
				errorMsg.textContent = "Error: " + error.message;
				colorList.appendChild(errorMsg);
			}
		});

	document
		.getElementById("exercise3-reset")
		.addEventListener("click", function () {
			document.getElementById("color-list").innerHTML = "";
		});

	// Format code blocks to prevent line wrapping
	document.querySelectorAll(".code-block").forEach((block) => {
		block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
	});
});
