# JavaScript Fundamentals Course

## Course Overview

This interactive JavaScript course is designed to teach the fundamentals of JavaScript programming through practical, hands-on exercises. Throughout the course, you'll build a functional grocery list application while learning core JavaScript concepts.

## Course Structure

The course is divided into 5 sessions, each building upon the previous one:

1. **Session 1: JavaScript Fundamentals**
   - Introduction to JavaScript and how it works in the browser
   - Understanding the Document Object Model (DOM)
   - Working with variables and different data types
   - Using the browser console for debugging
   - Selecting and manipulating DOM elements

2. **Session 2: Functions & DOM Interaction**
   - Creating and using functions effectively
   - Working with parameters and return values
   - Understanding function scope
   - Using arrow functions for cleaner code
   - Selecting and manipulating DOM elements
   - Handling user events like clicks and input

3. **Session 3: Control Flow & More DOM Manipulation**
   - Using conditional statements to control program flow
   - Working with logical operators to create complex conditions
   - Creating and manipulating arrays to store collections of data
   - Using array methods to transform and filter data
   - Dynamically creating HTML elements with JavaScript
   - Adding, modifying, and removing elements from the DOM

4. **Session 4: Loops & Advanced DOM Interaction**
   - Using forEach to iterate through arrays
   - Using for...of loops to iterate over iterable objects
   - Creating and working with JavaScript objects
   - Using Object.keys() and Object.values() to access object data
   - Dynamically modifying element classes with classList
   - Implementing event delegation for dynamic elements
   - Working with form data effectively

5. **Session 5: APIs, JSON & Data-Driven Styling**
   - Understanding web APIs
   - Working with JSON data format
   - Using the Fetch API for HTTP requests
   - Using async/await for asynchronous operations
   - Processing and displaying API data
   - Implementing data-driven styling techniques
   - Working with advanced object techniques

## Grocery List Application Assignment

This assignment focuses on creating a grocery list organizer tool that allows users to track items they need to buy at the grocery store.

### Requirements

1. **Create Input and Button for Adding Food**
   - Create an input box that takes in a string from the user representing the food item
   - Add a button that will add the food to the list when clicked

2. **Display Food Items in a List**
   - Implement functionality to add food items to the list when the button is clicked
   - Each new food item should be displayed in the list
   - Allow for multiple items to be added one by one

3. **Add Additional Input Fields**
   - Create three more input fields:
     - A number input for quantity
     - A text input for price
     - A dropdown menu for category (e.g. "produce", "dairy", "meat")
   - Modify the "Add Item" button to include all this information in the list
   - Display all information separated by commas in the list item

4. **Add Checkboxes for Items**
   - Add a checkbox at the beginning of each item in the list
   - Allow users to check items to indicate they've been purchased

5. **Track Items Left to Buy**
   - Display a count of the total number of items still left to buy
   - Update this count when items are added or checked/unchecked
   - Initially, this count should be zero when no items are in the list
   - Increase by one for each item added
   - Decrease by one for each item checked as bought

6. **Add "Check All" Button**
   - Create a button to check/uncheck all items in the list
   - The button should toggle between "Check All" and "Uncheck All" text based on the current state
   - Update the total count of items left to buy accordingly

7. **Add "Clear Bought Items" Button**
   - Create a button to remove all checked items from the list
   - Update the total count of items left to buy accordingly

8. **Calculate Total Price per Item**
   - For each item in the list, display the total price (price × quantity)

9. **Style Items Based on Price**
   - Apply different text colors to items based on their total price:
     - Total price > $15: red text
     - Total price > $10: orange text
     - Total price > $5: yellow text
   - Consider using CSS classes for styling

10. **Budget Warning Message**
    - If the total price of all items exceeds $100, display a warning message
    - The message should state "You're spending too much money!" in red text
    - Display this message underneath the buttons

### Submission

submission details and requirements coming soon!

### Grading

Your grade will be based on the completion of the requirements listed above. Make sure to test your application thoroughly to ensure all features work as expected.

## Getting Started

Navigate to each session's page to learn the concepts and follow along with the exercises. The final grocery list application will incorporate many of the concepts learned throughout session 1-4.
