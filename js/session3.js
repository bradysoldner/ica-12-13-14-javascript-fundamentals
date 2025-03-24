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
	const exercise1RunButton = document.getElementById("exercise1-run");
	if (exercise1RunButton) {
		exercise1RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise1-input").value;
			const outputDiv = document.getElementById("exercise1-output");

			try {
				// Evaluate the user's code
				const userFunction = new Function("return " + code)();

				// Check if the user code contains a function named calculateTicketPrice
				if (
					typeof userFunction === "function" &&
					userFunction.name === "calculateTicketPrice"
				) {
					// Test the function with various test cases
					const testCases = [
						{ age: 10, isMember: false, expected: 5.0 }, // Child, non-member
						{ age: 10, isMember: true, expected: 4.0 }, // Child, member
						{ age: 35, isMember: false, expected: 10.0 }, // Adult, non-member
						{ age: 35, isMember: true, expected: 8.0 }, // Adult, member
						{ age: 70, isMember: false, expected: 7.0 }, // Senior, non-member
						{ age: 70, isMember: true, expected: 5.6 }, // Senior, member
					];

					let allTestsPassed = true;
					let testResults = "<h5>Test Results:</h5><ul>";

					testCases.forEach((test, index) => {
						const result = userFunction(test.age, test.isMember);
						const roundedResult = parseFloat(result.toFixed(2));
						const passed = roundedResult === test.expected;

						if (!passed) allTestsPassed = false;

						testResults += `<li>Test ${index + 1}: Age ${test.age}, Member: ${
							test.isMember ? "Yes" : "No"
						} - Expected: $${test.expected.toFixed(
							2
						)}, Got: $${roundedResult.toFixed(2)} - ${
							passed
								? '<span class="text-success">PASS</span>'
								: '<span class="text-danger">FAIL</span>'
						}</li>`;
					});

					testResults += "</ul>";

					if (allTestsPassed) {
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML = `<strong>Great job!</strong> All tests passed. Your function works correctly.${testResults}`;
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML = `<strong>Almost there!</strong> Some tests failed. Check the implementation details.${testResults}`;
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a function named 'calculateTicketPrice' that takes 'age' and 'isMember' parameters.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});
	}

	// Practice Exercise 2: Arrays
	const exercise2RunButton = document.getElementById("exercise2-run");
	const exercise2ResetButton = document.getElementById("exercise2-reset");

	if (exercise2RunButton) {
		exercise2RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise2-input").value;
			const outputDiv = document.getElementById("exercise2-output");
			const cartDisplay = document.getElementById("cart-display");
			const cartItems = document.getElementById("cart-items");
			const cartTotal = document.getElementById("cart-total");

			try {
				// Execute the user's code
				eval(code);

				// Check if ShoppingCart object exists
				if (typeof ShoppingCart === "object") {
					let success = true;
					let message = "";

					// Test required methods
					if (typeof ShoppingCart.addItem !== "function") {
						success = false;
						message += "Missing addItem method.<br>";
					}

					if (typeof ShoppingCart.removeItem !== "function") {
						success = false;
						message += "Missing removeItem method.<br>";
					}

					if (typeof ShoppingCart.calculateTotal !== "function") {
						success = false;
						message += "Missing calculateTotal method.<br>";
					}

					if (typeof ShoppingCart.applyDiscount !== "function") {
						success = false;
						message += "Missing applyDiscount method.<br>";
					}

					if (!Array.isArray(ShoppingCart.items)) {
						success = false;
						message += "Missing items array.<br>";
					}

					if (success) {
						// Test the ShoppingCart functionality
						ShoppingCart.items = []; // Reset
						ShoppingCart.addItem("Laptop", 999.99, 1);
						ShoppingCart.addItem("Mouse", 24.99, 2);
						ShoppingCart.addItem("Keyboard", 49.99, 1);

						// Display the cart contents
						cartItems.innerHTML = "";
						ShoppingCart.items.forEach((item, index) => {
							const tr = document.createElement("tr");
							tr.innerHTML = `
								<td>${item.name}</td>
								<td>$${item.price.toFixed(2)}</td>
								<td>${item.quantity}</td>
								<td>$${(item.price * item.quantity).toFixed(2)}</td>
							`;
							cartItems.appendChild(tr);
						});

						// Display the total
						cartTotal.textContent = `$${ShoppingCart.calculateTotal().toFixed(
							2
						)}`;
						cartDisplay.style.display = "block";

						// Apply a 10% discount
						ShoppingCart.applyDiscount(10);

						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML = `
							<strong>Great job!</strong> Your shopping cart is working correctly.<br>
							Original total: $1099.97<br>
							After 10% discount: $${ShoppingCart.calculateTotal().toFixed(2)}
						`;
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML = `
							<strong>Almost there!</strong> Your ShoppingCart object needs some work:<br>
							${message}
						`;
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a ShoppingCart object.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});
	}

	if (exercise2ResetButton) {
		exercise2ResetButton.addEventListener("click", function () {
			document.getElementById("exercise2-output").style.display = "none";
			document.getElementById("cart-display").style.display = "none";
		});
	}

	// Practice Exercise 3: DOM Manipulation
	const exercise3RunButton = document.getElementById("exercise3-run");
	const exercise3ResetButton = document.getElementById("exercise3-reset");
	const colorPalette = document.getElementById("color-palette");
	const baseColor = document.getElementById("base-color");

	if (exercise3RunButton && colorPalette) {
		exercise3RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise3-input").value;
			const outputDiv = document.getElementById("exercise3-output");

			try {
				// Execute the user's code
				eval(code);

				// Check if the function exists
				if (typeof generateColorPalette === "function") {
					// Clear previous palette
					colorPalette.innerHTML = "";

					// Call the function with the current base color
					generateColorPalette(baseColor.value);

					// Check if swatches were created
					if (colorPalette.children.length > 0) {
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML =
							"<strong>Great job!</strong> Your color palette generator is working.";
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML =
							"<strong>Almost there!</strong> Your function ran but didn't create any color swatches.";
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a function named 'generateColorPalette'.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});
	}

	if (exercise3ResetButton && colorPalette) {
		exercise3ResetButton.addEventListener("click", function () {
			colorPalette.innerHTML = "";
			document.getElementById("exercise3-output").style.display = "none";
		});
	}

	if (baseColor && colorPalette && typeof generateColorPalette === "function") {
		baseColor.addEventListener("input", function () {
			colorPalette.innerHTML = "";
			generateColorPalette(baseColor.value);
		});
	}

	// Format code blocks to prevent line wrapping
	document.querySelectorAll(".code-block").forEach((block) => {
		block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
	});
});
