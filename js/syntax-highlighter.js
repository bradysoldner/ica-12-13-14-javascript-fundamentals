/**
 * A safer text-based approach to syntax highlighting
 */
document.addEventListener("DOMContentLoaded", function () {
	// Initial styling for all code blocks
	const codeBlocks = document.querySelectorAll(".code-block");

	codeBlocks.forEach(function (block) {
		// Apply base styling
		block.style.fontFamily = "monospace";
		block.style.whiteSpace = "pre";
		block.style.overflow = "auto";
		block.style.padding = "1rem";
		block.style.borderRadius = "4px";
		block.style.fontSize = "14px";

		// Get the language from class
		const classNames = Array.from(block.classList);
		const languageClass = classNames.find((cls) => cls.startsWith("language-"));
		const language = languageClass
			? languageClass.replace("language-", "")
			: null;

		// Different styling based on language
		if (language === "javascript") {
			block.style.backgroundColor = "#f8f8ff"; // Light blue background
			block.style.borderLeft = "4px solid #4b68d1";
		} else if (language === "css") {
			block.style.backgroundColor = "#f8fff8"; // Light green background
			block.style.borderLeft = "4px solid #50c878";
		} else if (language === "html") {
			block.style.backgroundColor = "#fff8f8"; // Light red background
			block.style.borderLeft = "4px solid #e34c26";
		} else {
			block.style.backgroundColor = "#f5f5f5";
		}
	});

	// Add text-based syntax highlighting using a different approach
	// For JavaScript blocks
	highlightLanguage("javascript", [
		{ pattern: "// ", style: "color: #888;" }, // Comments
		{ pattern: "const ", style: "color: #07a; font-weight: bold;" }, // Keywords
		{ pattern: "document", style: "color: #905;" }, // Objects
		{ pattern: "getElementById", style: "color: #961;" }, // Methods
		{ pattern: "getElementsByClassName", style: "color: #961;" },
		{ pattern: "getElementsByTagName", style: "color: #961;" },
		{ pattern: "querySelector", style: "color: #961;" },
		{ pattern: "querySelectorAll", style: "color: #961;" },
		{ pattern: '"main-header"', style: "color: #d32;" }, // Strings
		{ pattern: '"content-paragraph"', style: "color: #d32;" },
		{ pattern: '"button"', style: "color: #d32;" },
		{ pattern: '"a.nav-link"', style: "color: #d32;" },
		{ pattern: "#main-header", style: "color: #c80;" }, // Selectors
		{ pattern: ".nav-link", style: "color: #3c0;" },
		{ pattern: ".content-paragraph", style: "color: #3c0;" },
	]);

	// For CSS blocks
	highlightLanguage("css", [
		{ pattern: ".highlight-incorrect", style: "color: #07a;" }, // Selectors
		{ pattern: ".code-block", style: "color: #07a;" },
		{ pattern: "p", style: "color: #07a;" },
		{ pattern: "background-color:", style: "color: #905;" }, // Properties
		{ pattern: "border:", style: "color: #905;" },
		{ pattern: "line-height:", style: "color: #905;" },
		{ pattern: "margin-bottom:", style: "color: #905;" },
		{ pattern: "rgba(220, 53, 69, 0.2)", style: "color: #c80;" }, // Values
		{ pattern: "var(--danger)", style: "color: #c80;" },
		{ pattern: "0.3rem", style: "color: #d32;" },
		{ pattern: "0", style: "color: #d32;" },
	]);
});

/**
 * Applies text-based syntax highlighting for the specific language
 * @param {string} language - Language to highlight
 * @param {Array} highlights - Array of pattern-style pairs
 */
function highlightLanguage(language, highlights) {
	const blocks = document.querySelectorAll(`.code-block.language-${language}`);

	blocks.forEach((block) => {
		let html = block.innerHTML;

		// Create a temporary container for safe manipulation
		const tempContainer = document.createElement("div");
		tempContainer.innerHTML = html;
		const textContent = tempContainer.textContent;

		// Apply each highlight pattern to the raw text
		highlights.forEach((highlight) => {
			// Escape regex special characters
			const pattern = highlight.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

			// Replace with styled spans, but only if not already within a span
			html = html.replace(
				new RegExp(`(^|[^>])(${pattern})([^<]|$)`, "g"),
				`$1<span style="${highlight.style}">$2</span>$3`
			);
		});

		// Set the highlighted HTML
		block.innerHTML = html;
	});
}
