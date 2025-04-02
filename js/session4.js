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
	document
		.getElementById("exercise1-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise1-input").value;
			const numberList = document.getElementById("number-list");

			// Clear the list first
			numberList.innerHTML = "";

			try {
				// Execute the code
				eval(code);

				// Check if the list has been populated
				if (numberList.children.length > 0) {
					// Success, no need for explicit message
				} else {
					// Add a message if the list is empty
					const errorMsg = document.createElement("li");
					errorMsg.className = "list-group-item text-danger";
					errorMsg.textContent =
						"No items were added to the list. Check your code.";
					numberList.appendChild(errorMsg);
				}
			} catch (error) {
				const errorMsg = document.createElement("li");
				errorMsg.className = "list-group-item text-danger";
				errorMsg.textContent = "Error: " + error.message;
				numberList.appendChild(errorMsg);
			}
		});

	document
		.getElementById("exercise1-reset")
		.addEventListener("click", function () {
			document.getElementById("number-list").innerHTML = "";
		});

	// Practice Exercise 2: Objects
	document
		.getElementById("exercise2-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise2-input").value;
			const studentInfo = document.getElementById("student-info");

			// Clear the info div first
			studentInfo.innerHTML = "";

			try {
				// Execute the code
				eval(code);

				// Check if the student object has all required properties
				if (typeof student !== "object") {
					throw new Error("Student object not found or not defined correctly");
				}

				if (
					!student.name ||
					!student.age ||
					!Array.isArray(student.grades) ||
					typeof student.isActive !== "boolean"
				) {
					studentInfo.innerHTML = `
        <div class="alert alert-warning">
          <strong>Almost there!</strong> Make sure your student object has all required properties.
        </div>
      `;
				} else if (typeof student.getAverage !== "function") {
					studentInfo.innerHTML = `
        <div class="alert alert-warning">
          <strong>Don't forget!</strong> Add the getAverage method to your student object.
        </div>
      `;
				} else if (studentInfo.children.length === 0) {
					studentInfo.innerHTML = `
        <div class="alert alert-warning">
          <strong>One more step!</strong> Make sure to call displayStudentInfo() to show the student information.
        </div>
      `;
				}
			} catch (error) {
				studentInfo.innerHTML = `
      <div class="alert alert-danger">
        <strong>Error:</strong> ${error.message}
      </div>
    `;
			}
		});

	document
		.getElementById("exercise2-reset")
		.addEventListener("click", function () {
			document.getElementById("student-info").innerHTML = "";
		});

	// Practice Exercise 3: DOM & Events
	document
		.getElementById("exercise3-run")
		.addEventListener("click", function () {
			const code = document.getElementById("exercise3-input").value;

			// Reset box first
			const styleBox = document.getElementById("style-box");
			styleBox.className = "mb-3 p-3 d-inline-block";

			// Remove any previously added event listeners by cloning and replacing
			const buttons = ["add-color", "add-border", "make-large", "reset-box"];
			buttons.forEach((id) => {
				const oldButton = document.getElementById(id);
				const newButton = oldButton.cloneNode(true);
				oldButton.parentNode.replaceChild(newButton, oldButton);
			});

			try {
				// Execute the code
				eval(code);

				// No automatic validation - users will see if their code works
				// when they click the buttons
			} catch (error) {
				alert("Error: " + error.message);
			}
		});

	// Format code blocks to prevent line wrapping
	document.querySelectorAll(".code-block").forEach((block) => {
		block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
	});
});
