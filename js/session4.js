/**
 * JavaScript for Session 4: Loops & Advanced DOM Interaction
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

	// forEach Demo
	const forEachDemoButton = document.getElementById("forEach-demo-button");
	if (forEachDemoButton) {
		forEachDemoButton.addEventListener("click", function () {
			const fruits = ["Apple", "Banana", "Orange", "Strawberry", "Mango"];

			const fruitList = document.getElementById("fruit-list");
			fruitList.innerHTML = "";

			fruits.forEach((fruit) => {
				const item = document.createElement("div");
				item.className = "list-group-item";
				item.textContent = fruit;
				fruitList.appendChild(item);
			});
		});
	}

	// For...of Demo
	const forOfDemoButton = document.getElementById("for-of-demo-button");
	if (forOfDemoButton) {
		forOfDemoButton.addEventListener("click", function () {
			const colors = [
				"#3498db",
				"#e74c3c",
				"#2ecc71",
				"#f39c12",
				"#9b59b6",
				"#1abc9c",
			];

			const container = document.getElementById("color-boxes");
			container.innerHTML = "";

			for (let color of colors) {
				const box = document.createElement("div");
				box.className =
					"p-3 rounded text-white d-flex align-items-center justify-content-center";
				box.style.backgroundColor = color;
				box.style.width = "100px";
				box.style.height = "100px";
				box.textContent = color;
				container.appendChild(box);
			}
		});
	}

	// Objects Demo
	const objectsDemoButton = document.getElementById("objects-demo-button");
	if (objectsDemoButton) {
		objectsDemoButton.addEventListener("click", function () {
			const user = {
				name: "Alex Johnson",
				email: "alex@example.com",
				age: 28,
				location: "New York",
				skills: ["HTML", "CSS", "JavaScript"],
				isEmployed: true,
			};

			const profileDiv = document.getElementById("user-profile");

			profileDiv.innerHTML = `
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Location:</strong> ${user.location}</p>
                <p><strong>Skills:</strong> ${user.skills.join(", ")}</p>
                <p><strong>Employment Status:</strong> ${
									user.isEmployed ? "Employed" : "Unemployed"
								}</p>
            `;
		});
	}

	// Object Methods Demo (Shopping Cart)
	const addItemBtn = document.getElementById("add-item-btn");
	const clearCartBtn = document.getElementById("clear-cart-btn");

	if (addItemBtn && clearCartBtn) {
		const shoppingCart = {
			items: [],
			total: 0,

			addItem(name, price) {
				this.items.push({ name, price });
				this.calculateTotal();
				this.displayCart();
			},

			removeItem(index) {
				this.items.splice(index, 1);
				this.calculateTotal();
				this.displayCart();
			},

			calculateTotal() {
				this.total = this.items.reduce((sum, item) => sum + item.price, 0);
				return this.total.toFixed(2);
			},

			clearCart() {
				this.items = [];
				this.total = 0;
				this.displayCart();
			},

			displayCart() {
				const cartItemsElement = document.getElementById("cart-items");
				const cartTotalElement = document.getElementById("cart-total");

				cartItemsElement.innerHTML = "";

				if (this.items.length === 0) {
					cartItemsElement.innerHTML =
						'<li class="list-group-item text-muted">Cart is empty</li>';
				} else {
					this.items.forEach((item, index) => {
						const li = document.createElement("li");
						li.className =
							"list-group-item d-flex justify-content-between align-items-center";
						li.innerHTML = `
                            <span>${item.name} - $${item.price.toFixed(
							2
						)}</span>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                                &times;
                            </button>
                        `;
						cartItemsElement.appendChild(li);
					});
				}

				cartTotalElement.textContent = this.total.toFixed(2);

				// Add event listeners to remove buttons
				document.querySelectorAll(".remove-item").forEach((button) => {
					button.addEventListener("click", (e) => {
						const index = parseInt(e.target.dataset.index);
						this.removeItem(index);
					});
				});
			},
		};

		// Initialize cart display
		shoppingCart.displayCart();

		// Sample products
		const products = [
			{ name: "Laptop", price: 899.99 },
			{ name: "Headphones", price: 149.99 },
			{ name: "Keyboard", price: 59.99 },
			{ name: "Mouse", price: 29.99 },
			{ name: "Monitor", price: 249.99 },
			{ name: "Smartphone", price: 699.99 },
		];

		// Add random item button
		addItemBtn.addEventListener("click", function () {
			const randomProduct =
				products[Math.floor(Math.random() * products.length)];
			shoppingCart.addItem(randomProduct.name, randomProduct.price);
		});

		// Clear cart button
		clearCartBtn.addEventListener("click", function () {
			shoppingCart.clearCart();
		});
	}

	// Object.keys() and Object.values() Demo
	const objectKeyValuesDemoButton = document.getElementById(
		"object-keys-values-demo-button"
	);
	if (objectKeyValuesDemoButton) {
		objectKeyValuesDemoButton.addEventListener("click", function () {
			const movie = {
				title: "Inception",
				director: "Christopher Nolan",
				year: 2010,
				genre: "Sci-Fi",
				rating: 8.8,
				duration: "148 min",
				cast: ["Leonardo DiCaprio", "Ellen Page", "Tom Hardy"],
			};

			const display = document.getElementById("movie-display");
			display.innerHTML = "";

			// Create a table to display properties
			const table = document.createElement("table");
			table.className = "table table-striped";

			// Add table header
			const thead = document.createElement("thead");
			thead.innerHTML = "<tr><th>Property</th><th>Value</th></tr>";
			table.appendChild(thead);

			// Create table body
			const tbody = document.createElement("tbody");

			// Iterate through object properties
			for (const key of Object.keys(movie)) {
				const row = document.createElement("tr");
				let value = movie[key];

				// Format arrays nicely
				if (Array.isArray(value)) {
					value = value.join(", ");
				}

				row.innerHTML = `<td>${key}</td><td>${value}</td>`;
				tbody.appendChild(row);
			}

			table.appendChild(tbody);
			display.appendChild(table);

			// Display additional info using Object.values()
			const infoDiv = document.createElement("div");
			infoDiv.className = "mt-3 p-2 bg-light rounded";
			const values = Object.values(movie);

			infoDiv.innerHTML = `
                <p><strong>Quick Summary</strong></p>
                <p>"${values[0]}" (${values[2]}) is a ${values[3]} film directed by ${values[1]}. 
                It runs for ${values[5]} and has a rating of ${values[4]}/10.</p>
            `;

			display.appendChild(infoDiv);
		});
	}

	// classList Demo
	const classListDemoButtons = document.querySelectorAll(
		".classList-demo-button"
	);
	if (classListDemoButtons.length > 0) {
		const targetElement = document.getElementById("classList-demo-element");

		if (targetElement) {
			classListDemoButtons.forEach((button) => {
				button.addEventListener("click", function () {
					const action = this.dataset.action;
					const className = this.dataset.class;

					switch (action) {
						case "add":
							targetElement.classList.add(className);
							break;
						case "remove":
							targetElement.classList.remove(className);
							break;
						case "toggle":
							targetElement.classList.toggle(className);
							break;
						case "contains":
							alert(
								`Element ${
									targetElement.classList.contains(className)
										? "has"
										: "does not have"
								} class "${className}"`
							);
							break;
						case "reset":
							targetElement.className = "demo-element p-3 border rounded";
							break;
					}

					// Update class list display
					document.getElementById("current-classes").textContent =
						targetElement.className;
				});
			});
		}
	}

	// Event Delegation Demo
	const delegationContainer = document.getElementById("delegation-container");
	if (delegationContainer) {
		// Add initial items
		for (let i = 1; i <= 5; i++) {
			const item = document.createElement("div");
			item.className = "delegation-item p-2 border rounded mb-2";
			item.innerHTML = `Item ${i} <button class="btn btn-sm btn-danger float-end delete-btn">Delete</button>`;
			delegationContainer.appendChild(item);
		}

		// Add event listener to container (parent element)
		delegationContainer.addEventListener("click", function (event) {
			// Check if the clicked element is a delete button
			if (event.target.classList.contains("delete-btn")) {
				// Find the parent item and remove it
				const item = event.target.closest(".delegation-item");
				item.remove();
			}
		});

		// Add new item button
		const addItemButton = document.getElementById("add-delegation-item");
		if (addItemButton) {
			addItemButton.addEventListener("click", function () {
				const itemCount = delegationContainer.children.length + 1;
				const item = document.createElement("div");
				item.className = "delegation-item p-2 border rounded mb-2";
				item.innerHTML = `Item ${itemCount} <button class="btn btn-sm btn-danger float-end delete-btn">Delete</button>`;
				delegationContainer.appendChild(item);
			});
		}
	}

	// Form Handling Demo
	const formDemoForm = document.getElementById("form-demo");
	if (formDemoForm) {
		formDemoForm.addEventListener("submit", function (event) {
			event.preventDefault();

			// Get form data
			const formData = new FormData(this);
			const formValues = Object.fromEntries(formData.entries());

			// Display the submitted data
			const resultDiv = document.getElementById("form-result");

			resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <h5>Form Submitted!</h5>
                    <p><strong>Name:</strong> ${formValues.name}</p>
                    <p><strong>Email:</strong> ${formValues.email}</p>
                    <p><strong>Age:</strong> ${
											formValues.age || "Not provided"
										}</p>
                    <p><strong>Interests:</strong> ${
											formValues.interests || "None selected"
										}</p>
                    <p><strong>Newsletter:</strong> ${
											formValues.newsletter ? "Yes" : "No"
										}</p>
                    <p><strong>Comments:</strong> ${
											formValues.comments || "None"
										}</p>
                </div>
            `;

			// Clear form (optional)
			this.reset();
		});
	}

	// Practice Exercise 1: Loops
	const exercise1RunButton = document.getElementById("exercise1-run");
	if (exercise1RunButton) {
		exercise1RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise1-input").value;
			const outputDiv = document.getElementById("exercise1-output");

			try {
				// Evaluate the user's code
				eval(`
                    // Reset output
                    const resultDiv = document.getElementById("exercise1-result");
                    resultDiv.innerHTML = "";
                    
                    // Run the user's code
                    ${code}
                `);

				// Check if the output div contains results
				const resultDiv = document.getElementById("exercise1-result");
				if (resultDiv.querySelector("table")) {
					outputDiv.className = "alert alert-success";
					outputDiv.innerHTML =
						"<strong>Great job!</strong> Your multiplication table works correctly.";
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Almost there!</strong> Make sure your code generates a table and displays it in the result div.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});
	}

	// Practice Exercise 2: Objects
	const exercise2RunButton = document.getElementById("exercise2-run");
	const exercise2ResetButton = document.getElementById("exercise2-reset");
	if (exercise2RunButton && exercise2ResetButton) {
		exercise2RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise2-input").value;
			const outputDiv = document.getElementById("exercise2-output");

			try {
				// Evaluate the user's code
				eval(code);

				// Check if the required library object exists
				if (typeof Library === "object") {
					let success = true;
					let message = "";

					// Test required methods
					if (typeof Library.addBook !== "function") {
						success = false;
						message += "Missing addBook method.<br>";
					}

					if (typeof Library.findBooksByAuthor !== "function") {
						success = false;
						message += "Missing findBooksByAuthor method.<br>";
					}

					if (typeof Library.displayAllBooks !== "function") {
						success = false;
						message += "Missing displayAllBooks method.<br>";
					}

					if (!Array.isArray(Library.books)) {
						success = false;
						message += "Missing books array.<br>";
					}

					if (success) {
						// Display the user's library implementation
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML =
							"<strong>Great job!</strong> Your Library implementation works correctly. Test it with the buttons below.";

						// Show test UI
						document.getElementById("exercise2-test-ui").style.display =
							"block";

						// Set up test handlers
						document
							.getElementById("add-test-book")
							.addEventListener("click", function () {
								const title = document.getElementById("test-book-title").value;
								const author =
									document.getElementById("test-book-author").value;
								const year = parseInt(
									document.getElementById("test-book-year").value
								);

								if (title && author && year) {
									Library.addBook(title, author, year);
									document.getElementById("test-book-title").value = "";
									document.getElementById("test-book-author").value = "";
									document.getElementById("test-book-year").value = "";

									// Update display
									Library.displayAllBooks();
								}
							});

						document
							.getElementById("search-author")
							.addEventListener("click", function () {
								const author =
									document.getElementById("test-search-author").value;
								const books = Library.findBooksByAuthor(author);

								const resultsDiv = document.getElementById("search-results");
								if (books.length > 0) {
									let html = "<h6>Found Books:</h6><ul>";
									books.forEach((book) => {
										html += `<li>${book.title} (${book.year})</li>`;
									});
									html += "</ul>";
									resultsDiv.innerHTML = html;
								} else {
									resultsDiv.innerHTML = `<p class="text-muted">No books found by author: ${author}</p>`;
								}
							});
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML = `
                            <strong>Almost there!</strong> Your Library object needs some work:<br>
                            ${message}
                        `;
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a Library object.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});

		exercise2ResetButton.addEventListener("click", function () {
			document.getElementById("exercise2-output").style.display = "none";
			document.getElementById("exercise2-test-ui").style.display = "none";
			document.getElementById("library-display").innerHTML = "";
			document.getElementById("search-results").innerHTML = "";
		});
	}

	// Practice Exercise 3: DOM & Events
	const exercise3RunButton = document.getElementById("exercise3-run");
	const exercise3ResetButton = document.getElementById("exercise3-reset");
	if (exercise3RunButton && exercise3ResetButton) {
		exercise3RunButton.addEventListener("click", function () {
			const code = document.getElementById("exercise3-input").value;
			const outputDiv = document.getElementById("exercise3-output");

			try {
				// Reset the task manager container
				document.getElementById("task-manager-container").innerHTML = "";

				// Evaluate the user's code
				eval(code);

				// Check if the function exists
				if (typeof createTaskManager === "function") {
					// Call the function to initialize the task manager
					createTaskManager();

					// Check if the task manager UI has been created
					const taskInput = document.getElementById("task-input");
					const addTaskButton = document.getElementById("add-task-button");
					const taskList = document.getElementById("tasks-list");

					if (taskInput && addTaskButton && taskList) {
						outputDiv.className = "alert alert-success";
						outputDiv.innerHTML =
							"<strong>Great job!</strong> Your task manager is set up correctly. Try adding and removing tasks.";
					} else {
						outputDiv.className = "alert alert-warning";
						outputDiv.innerHTML =
							"<strong>Almost there!</strong> Make sure your task manager creates all the required elements.";
					}
				} else {
					outputDiv.className = "alert alert-warning";
					outputDiv.innerHTML =
						"<strong>Check your code!</strong> Make sure you've created a function named 'createTaskManager'.";
				}
			} catch (error) {
				outputDiv.className = "alert alert-danger";
				outputDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
			}

			outputDiv.style.display = "block";
		});

		exercise3ResetButton.addEventListener("click", function () {
			document.getElementById("exercise3-output").style.display = "none";
			document.getElementById("task-manager-container").innerHTML = "";
		});
	}

	// Format code blocks to prevent line wrapping
	document.querySelectorAll(".code-block").forEach((block) => {
		block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
	});
});
