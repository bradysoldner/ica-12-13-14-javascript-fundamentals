/**
 * JavaScript for Session 5: APIs, JSON & Data-Driven Styling
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

	// Format code blocks to prevent line wrapping
	document.querySelectorAll(".code-block").forEach((block) => {
		block.innerHTML = block.innerHTML.replace(/^\s+/gm, "");
	});

	// --- JSON Demo ---
	const parseJsonBtn = document.getElementById("parse-json-btn");
	const stringifyJsonBtn = document.getElementById("stringify-json-btn");
	const jsonInput = document.getElementById("json-input");
	const jsonResult = document.getElementById("json-result");

	if (parseJsonBtn && stringifyJsonBtn && jsonInput && jsonResult) {
		parseJsonBtn.addEventListener("click", function () {
			try {
				const input = jsonInput.value.trim();
				const parsed = JSON.parse(input);

				jsonResult.innerHTML = `
          <div class="alert alert-success">
            <strong>Successfully parsed JSON!</strong>
          </div>
          <pre class="bg-light p-3 rounded">${syntaxHighlight(parsed)}</pre>
        `;
			} catch (error) {
				jsonResult.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error parsing JSON:</strong> ${error.message}
          </div>
        `;
			}
		});

		stringifyJsonBtn.addEventListener("click", function () {
			try {
				const input = jsonInput.value.trim();

				// Try to evaluate as a JavaScript object if it's not valid JSON
				let data;
				try {
					data = JSON.parse(input);
				} catch (e) {
					// If it's not valid JSON, try to evaluate it as a JavaScript object
					try {
						data = eval(`(${input})`);
					} catch (evalError) {
						throw new Error(
							"Invalid input: Not a valid JSON or JavaScript object"
						);
					}
				}

				const stringified = JSON.stringify(data, null, 2);

				jsonResult.innerHTML = `
          <div class="alert alert-success">
            <strong>Successfully stringified to JSON!</strong>
          </div>
          <pre class="bg-light p-3 rounded">${stringified}</pre>
        `;
			} catch (error) {
				jsonResult.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error stringifying to JSON:</strong> ${error.message}
          </div>
        `;
			}
		});
	}

	// --- Fetch API Demo ---
	const fetchDemoButton = document.getElementById("fetch-demo-button");
	const fetchResult = document.getElementById("fetch-result");

	if (fetchDemoButton && fetchResult) {
		fetchDemoButton.addEventListener("click", async function () {
			fetchResult.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="spinner-border text-primary me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span>Fetching data...</span>
        </div>
      `;

			try {
				// Use JSONPlaceholder for the demo
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts/1"
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();

				fetchResult.innerHTML = `
          <div class="alert alert-success mb-3">
            <strong>Successfully fetched data!</strong>
          </div>
          <h6>Response:</h6>
          <pre class="bg-light p-3 rounded">${syntaxHighlight(data)}</pre>
          <div class="mt-3">
            <strong>HTTP Status:</strong> ${response.status} ${
					response.statusText
				}<br>
            <strong>Content-Type:</strong> ${response.headers.get(
							"content-type"
						)}
          </div>
        `;
			} catch (error) {
				fetchResult.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error fetching data:</strong> ${error.message}
          </div>
        `;
			}
		});
	}

	// --- Async/Await Demo ---
	const asyncDemoButton = document.getElementById("async-demo-button");
	const asyncResult = document.getElementById("async-result");

	if (asyncDemoButton && asyncResult) {
		asyncDemoButton.addEventListener("click", async function () {
			asyncResult.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="spinner-border text-primary me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span>Fetching data...</span>
        </div>
      `;

			try {
				// Fetch multiple resources in sequence to demonstrate async/await
				// Step 1: Fetch user data
				const userResponse = await fetch(
					"https://jsonplaceholder.typicode.com/users/1"
				);
				if (!userResponse.ok)
					throw new Error(`HTTP error! Status: ${userResponse.status}`);
				const userData = await userResponse.json();

				// Step 2: Fetch posts by that user
				const postsResponse = await fetch(
					`https://jsonplaceholder.typicode.com/posts?userId=${userData.id}`
				);
				if (!postsResponse.ok)
					throw new Error(`HTTP error! Status: ${postsResponse.status}`);
				const postsData = await postsResponse.json();

				// Display the combined results
				asyncResult.innerHTML = `
          <div class="alert alert-success mb-3">
            <strong>Successfully fetched user and their posts!</strong>
          </div>
          <div class="row">
            <div class="col-md-5">
              <h6>User:</h6>
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${userData.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${
										userData.email
									}</h6>
                  <p class="card-text">
                    <strong>Username:</strong> ${userData.username}<br>
                    <strong>Company:</strong> ${userData.company.name}<br>
                    <strong>Website:</strong> ${userData.website}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <h6>User's Posts (${postsData.length}):</h6>
              <div class="list-group">
                ${postsData
									.slice(0, 3)
									.map(
										(post) => `
                  <div class="list-group-item">
                    <h6>${post.title}</h6>
                    <p class="mb-1">${post.body.substring(0, 80)}...</p>
                  </div>
                `
									)
									.join("")}
                ${
									postsData.length > 3
										? `<div class="list-group-item text-center text-muted">+ ${
												postsData.length - 3
										  } more posts</div>`
										: ""
								}
              </div>
            </div>
          </div>
        `;
			} catch (error) {
				asyncResult.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error fetching data:</strong> ${error.message}
          </div>
        `;
			}
		});
	}

	// --- Working with Data Demo ---
	const fetchDataButton = document.getElementById("fetch-data-button");
	const loadingIndicator = document.getElementById("loading-indicator");
	const errorMessage = document.getElementById("error-message");
	const userTableBody = document.getElementById("user-table-body");
	const dataSummary = document.getElementById("data-summary");
	const userCount = document.getElementById("user-count");

	if (fetchDataButton && loadingIndicator && userTableBody) {
		fetchDataButton.addEventListener("click", async function () {
			// Reset previous state
			userTableBody.innerHTML = "";
			if (errorMessage) errorMessage.classList.add("d-none");
			if (dataSummary) dataSummary.classList.add("d-none");
			loadingIndicator.classList.remove("d-none");

			try {
				// Fetch users data
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users"
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const users = await response.json();

				// Process user data - add a random active status for demo purposes
				const processedUsers = users.map((user) => ({
					...user,
					isActive: Math.random() > 0.3, // 70% chance of being active
				}));

				// Filter for active users only
				const activeUsers = processedUsers.filter((user) => user.isActive);

				// Sort by name
				activeUsers.sort((a, b) => a.name.localeCompare(b.name));

				// Display data in table
				activeUsers.forEach((user) => {
					const row = document.createElement("tr");
					row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>${user.address.city}</td>
          `;
					userTableBody.appendChild(row);
				});

				// Update summary
				if (userCount) userCount.textContent = activeUsers.length;
				if (dataSummary) dataSummary.classList.remove("d-none");
			} catch (error) {
				console.error("Error fetching users:", error);
				if (errorMessage) {
					errorMessage.textContent = `Failed to load user data: ${error.message}`;
					errorMessage.classList.remove("d-none");
				}
			} finally {
				loadingIndicator.classList.add("d-none");
			}
		});
	}

	// --- Data-Driven Styling Demo ---
	const styleDemoButton = document.getElementById("style-demo-button");
	const stockLevels = document.querySelectorAll(".stock-level");

	if (styleDemoButton && stockLevels.length > 0) {
		styleDemoButton.addEventListener("click", function () {
			// Apply styling to stock level bars
			stockLevels.forEach((element) => {
				const stockValue = parseInt(element.getAttribute("data-stock"), 10);

				// Create a bar with width based on stock
				const maxWidth = 100;
				const width = Math.min((stockValue / 100) * maxWidth, maxWidth);

				// Set the bar's color based on stock level
				let color;
				let textLabel;

				if (stockValue === 0) {
					color = "#dc3545"; // red
					textLabel = "Out of Stock";
				} else if (stockValue <= 5) {
					color = "#fd7e14"; // orange
					textLabel = "Low Stock";
				} else if (stockValue <= 25) {
					color = "#ffc107"; // yellow
					textLabel = "Medium Stock";
				} else {
					color = "#198754"; // green
					textLabel = "Well Stocked";
				}

				element.innerHTML = `
          <div style="display: flex; align-items: center;">
            <div style="width: ${width}%; height: 20px; background-color: ${color}; border-radius: 4px;"></div>
            <span style="margin-left: 8px;">${stockValue} (${textLabel})</span>
          </div>
        `;
			});

			// Apply styling to price cells
			const priceCells = document.querySelectorAll(".price");
			priceCells.forEach((cell) => {
				const price = parseFloat(cell.textContent.replace("$", ""));

				if (price >= 500) {
					cell.style.color = "#dc3545"; // red
					cell.style.fontWeight = "bold";
				} else if (price >= 100) {
					cell.style.color = "#fd7e14"; // orange
				} else if (price >= 50) {
					cell.style.color = "#0d6efd"; // blue
				} else {
					cell.style.color = "#198754"; // green
				}
			});

			// Update the button text and disable it
			styleDemoButton.textContent = "Styling Applied!";
			styleDemoButton.disabled = true;

			// Enable the button again after 2 seconds
			setTimeout(() => {
				styleDemoButton.textContent = "Apply Data-Driven Styling";
				styleDemoButton.disabled = false;
			}, 2000);
		});
	}

	// Generate chart for data-driven styling demo
	const generateChartButton = document.getElementById("generate-chart-button");
	const chartContainer = document.getElementById("chart-container");

	if (generateChartButton && chartContainer) {
		generateChartButton.addEventListener("click", function () {
			// Generate random sales data for a demo
			const salesData = [
				{ month: "Jan", sales: Math.floor(Math.random() * 100) + 50 },
				{ month: "Feb", sales: Math.floor(Math.random() * 100) + 50 },
				{ month: "Mar", sales: Math.floor(Math.random() * 100) + 50 },
				{ month: "Apr", sales: Math.floor(Math.random() * 100) + 50 },
				{ month: "May", sales: Math.floor(Math.random() * 100) + 50 },
				{ month: "Jun", sales: Math.floor(Math.random() * 100) + 50 },
			];

			// Function to generate a color based on value (green for high, red for low)
			function getColorForValue(value, min, max) {
				// Normalize value between 0 and 1
				const normalized = (value - min) / (max - min);

				// Calculate RGB components
				const red = Math.round(255 * (1 - normalized));
				const green = Math.round(255 * normalized);
				const blue = 0;

				return `rgb(${red}, ${green}, ${blue})`;
			}

			// Find min and max for scaling
			const salesValues = salesData.map((d) => d.sales);
			const minSales = Math.min(...salesValues);
			const maxSales = Math.max(...salesValues);

			// Create SVG for the chart
			const svgWidth = 400;
			const svgHeight = 300;
			const barPadding = 10;
			const barWidth = (svgWidth - 40) / salesData.length - barPadding;

			// Create SVG element
			chartContainer.innerHTML = "";
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("width", svgWidth);
			svg.setAttribute("height", svgHeight);

			// Create bars and labels
			salesData.forEach((data, index) => {
				const barHeight = (data.sales / maxSales) * (svgHeight - 100);
				const x = 20 + index * (barWidth + barPadding);
				const y = svgHeight - barHeight - 40;

				// Create bar
				const bar = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"rect"
				);
				bar.setAttribute("x", x);
				bar.setAttribute("y", y);
				bar.setAttribute("width", barWidth);
				bar.setAttribute("height", barHeight);
				bar.setAttribute(
					"fill",
					getColorForValue(data.sales, minSales, maxSales)
				);

				// Create value label
				const valueLabel = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"text"
				);
				valueLabel.setAttribute("x", x + barWidth / 2);
				valueLabel.setAttribute("y", y - 5);
				valueLabel.setAttribute("text-anchor", "middle");
				valueLabel.setAttribute("font-size", "12px");
				valueLabel.textContent = data.sales;

				// Create month label
				const monthLabel = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"text"
				);
				monthLabel.setAttribute("x", x + barWidth / 2);
				monthLabel.setAttribute("y", svgHeight - 20);
				monthLabel.setAttribute("text-anchor", "middle");
				monthLabel.setAttribute("font-size", "12px");
				monthLabel.textContent = data.month;

				// Add elements to SVG
				svg.appendChild(bar);
				svg.appendChild(valueLabel);
				svg.appendChild(monthLabel);
			});

			// Create chart title
			const title = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"text"
			);
			title.setAttribute("x", svgWidth / 2);
			title.setAttribute("y", 30);
			title.setAttribute("text-anchor", "middle");
			title.setAttribute("font-size", "16px");
			title.setAttribute("font-weight", "bold");
			title.textContent = "Monthly Sales Data";
			svg.appendChild(title);

			// Add SVG to container
			chartContainer.appendChild(svg);
		});
	}

	// --- Advanced Objects Demo ---
	const objectsDemoButton = document.getElementById("objects-demo-button");
	const objectInput = document.getElementById("object-input");
	const objectResult = document.getElementById("object-result");

	if (objectsDemoButton && objectInput && objectResult) {
		objectsDemoButton.addEventListener("click", function () {
			try {
				// Parse the input JSON
				const userObject = JSON.parse(objectInput.value);

				// Transform the object using advanced techniques
				// 1. Use destructuring to extract properties
				const {
					name,
					email,
					age,
					address,
					password,
					creditCard,
					...otherInfo
				} = userObject;

				// 2. Use nested destructuring for address
				const { city, zipCode } = address || {};

				// 3. Create a sanitized version without sensitive info
				const sanitizedUser = {
					// Use property shorthand
					name,
					email,
					age,
					// Use computed property
					[`location_${city ? city.toLowerCase() : "unknown"}`]: city,
					// Use spread to include other safe info
					...otherInfo,
					// Add some derived properties
					isAdult: age >= 18,
					// Use optional chaining and nullish coalescing
					formattedAddress: address?.street
						? `${address?.street}, ${city ?? "Unknown City"}, ${
								zipCode ?? "Unknown Zip"
						  }`
						: "Address not provided",
					// Add methods using shorthand
					greet() {
						return `Hello, my name is ${this.name}!`;
					},
				};

				// Display the transformed object
				objectResult.innerHTML = `
          <div class="alert alert-success mb-3">
            <strong>Original Object Transformed!</strong>
          </div>
          <h6>Original Object:</h6>
          <pre class="bg-light p-3 rounded mb-3">${syntaxHighlight(
						userObject
					)}</pre>
          <h6>Transformed Object (sensitive data removed):</h6>
          <pre class="bg-light p-3 rounded">${syntaxHighlight(
						sanitizedUser
					)}</pre>
          <p class="mt-3">
            <strong>Techniques used:</strong> Destructuring, Spread operator, Property shorthand, 
            Computed properties, Optional chaining, Nullish coalescing, Method shorthand
          </p>
        `;
			} catch (error) {
				objectResult.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error transforming object:</strong> ${error.message}
          </div>
        `;
			}
		});
	}

	// --- Practice Exercise 1: JSON & Objects ---
	const exercise1RunButton = document.getElementById("exercise1-run");
	const exercise1Input = document.getElementById("exercise1-input");
	const exercise1Output = document.getElementById("exercise1-output");
	const exercise1Result = document.getElementById("exercise1-result");

	if (
		exercise1RunButton &&
		exercise1Input &&
		exercise1Output &&
		exercise1Result
	) {
		exercise1RunButton.addEventListener("click", function () {
			try {
				// Get and execute the user's code
				const code = exercise1Input.value;
				eval(code);

				// Test if the transformProductData function exists
				if (typeof transformProductData !== "function") {
					throw new Error("The transformProductData function was not defined.");
				}

				// Call the function with the test data
				const transformedProducts = transformProductData(rawProducts);

				// Basic validation of the transformed data
				const isValid =
					Array.isArray(transformedProducts) &&
					transformedProducts.length === rawProducts.length &&
					transformedProducts.every(
						(product) =>
							typeof product.formattedPrice === "string" &&
							product.formattedPrice.includes("$") &&
							typeof product.stockStatus === "string"
					);

				if (!isValid) {
					throw new Error(
						"The transformed products are missing required properties."
					);
				}

				// Display the results
				exercise1Output.className = "alert alert-success";
				exercise1Output.innerHTML =
					"<strong>Great job!</strong> Your transformation function is working correctly.";
				exercise1Output.style.display = "block";

				exercise1Result.innerHTML = `
          <h6>Original Products:</h6>
          <pre class="bg-light p-3 rounded mb-3">${syntaxHighlight(
						rawProducts
					)}</pre>
          <h6>Transformed Products:</h6>
          <pre class="bg-light p-3 rounded">${syntaxHighlight(
						transformedProducts
					)}</pre>
        `;
			} catch (error) {
				exercise1Output.className = "alert alert-danger";
				exercise1Output.innerHTML = `<strong>Error:</strong> ${error.message}`;
				exercise1Output.style.display = "block";
				exercise1Result.innerHTML = "";
			}
		});
	}

	// --- Practice Exercise 2: Fetch & Async/Await ---
	const exercise2RunButton = document.getElementById("exercise2-run");
	const exercise2Input = document.getElementById("exercise2-input");
	const exercise2Output = document.getElementById("exercise2-output");

	if (exercise2RunButton && exercise2Input && exercise2Output) {
		exercise2RunButton.addEventListener("click", function () {
			try {
				// Get and execute the user's code
				const code = exercise2Input.value;
				eval(code);

				// Test if the fetchUserData function exists
				if (typeof fetchUserData !== "function") {
					throw new Error("The fetchUserData function was not defined.");
				}

				exercise2Output.className = "alert alert-success";
				exercise2Output.innerHTML =
					"<strong>Great job!</strong> Your code looks correct. Click the 'Fetch Data' button to test it.";
				exercise2Output.style.display = "block";
			} catch (error) {
				exercise2Output.className = "alert alert-danger";
				exercise2Output.innerHTML = `<strong>Error:</strong> ${error.message}`;
				exercise2Output.style.display = "block";
			}
		});
	}

	// --- Practice Exercise 3: Data-Driven Styling ---
	const exercise3RunButton = document.getElementById("exercise3-run");
	const exercise3ResetButton = document.getElementById("exercise3-reset");
	const exercise3Input = document.getElementById("exercise3-input");
	const exercise3Output = document.getElementById("exercise3-output");
	const gradesTable = document.getElementById("grades-table");

	if (
		exercise3RunButton &&
		exercise3ResetButton &&
		exercise3Input &&
		exercise3Output &&
		gradesTable
	) {
		// Save original table state for reset
		const originalTableHTML = gradesTable.innerHTML;

		exercise3RunButton.addEventListener("click", function () {
			try {
				// Get and execute the user's code
				const code = exercise3Input.value;
				eval(code);

				// Test if the styleGradeTable function exists and call it
				if (typeof styleGradeTable !== "function") {
					throw new Error("The styleGradeTable function was not defined.");
				}

				styleGradeTable();

				// Check if styling was applied
				const gradeCells = document.querySelectorAll(".grade-cell");
				const statusCells = document.querySelectorAll(".status-cell");
				const averageCell = document.getElementById("average-grade");

				let stylingApplied = false;

				// Check if any style changes were made
				gradeCells.forEach((cell) => {
					if (cell.style.backgroundColor || cell.style.color) {
						stylingApplied = true;
					}
				});

				statusCells.forEach((cell) => {
					if (cell.textContent !== "-") {
						stylingApplied = true;
					}
				});

				if (averageCell && averageCell.textContent !== "-") {
					stylingApplied = true;
				}

				if (!stylingApplied) {
					throw new Error(
						"Your function didn't apply any styling to the table."
					);
				}

				exercise3Output.className = "alert alert-success";
				exercise3Output.innerHTML =
					"<strong>Great job!</strong> Your data-driven styling has been applied to the table.";
				exercise3Output.style.display = "block";
			} catch (error) {
				exercise3Output.className = "alert alert-danger";
				exercise3Output.innerHTML = `<strong>Error:</strong> ${error.message}`;
				exercise3Output.style.display = "block";
			}
		});

		exercise3ResetButton.addEventListener("click", function () {
			gradesTable.innerHTML = originalTableHTML;
			exercise3Output.style.display = "none";
		});
	}

	// Helper function for syntax highlighting JSON
	function syntaxHighlight(json) {
		if (typeof json !== "string") {
			json = JSON.stringify(json, undefined, 2);
		}
		json = json
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match) {
				let cls = "number";
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = "key";
					} else {
						cls = "string";
					}
				} else if (/true|false/.test(match)) {
					cls = "boolean";
				} else if (/null/.test(match)) {
					cls = "null";
				}
				return '<span class="' + cls + '">' + match + "</span>";
			}
		);
	}
});
