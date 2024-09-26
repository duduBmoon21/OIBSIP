// Global variables for the expression and last answer
let expression = "";
let lastAnswer = "";

// Function to handle button input
function btnInput(value) {
    const currentField = document.getElementById("current_calculation");
    const resultField = document.getElementById("result");

    // If the equal button is pressed, evaluate the expression
    if (value === '=') {
        try {
            // Evaluate the expression using eval()
            lastAnswer = eval(expression);
            resultField.value = lastAnswer; // Show the result
            expression = ''; // Clear the expression for new input
            currentField.value = ''; // Clear current calculation display
        } catch (e) {
            // Handle errors during evaluation
            resultField.value = "Error";
            expression = ''; // Clear the expression after error
            currentField.value = ''; // Clear current calculation display
        }
    } else if (value === 'clear') {
        // Clear the expression and result when clear is pressed
        expression = '';
        lastAnswer = '';
        currentField.value = '';
        resultField.value = '';
    } else if (value === 'del') {
        // Remove the last character from the expression
        expression = expression.slice(0, -1);
        currentField.value = expression; // Update the displayed expression
    } else {
        // Append the value to the expression
        expression += value;
        currentField.value = expression; // Update the displayed expression
    }
}

// Function to clear the input
function button_clear() {
    expression = '';
    lastAnswer = '';
    document.getElementById("current_calculation").value = '';
    document.getElementById("result").value = '';
}

// Function to handle backspace removal
function backspace_remove() {
    // Remove the last character from the expression
    expression = expression.slice(0, -1);
    document.getElementById("current_calculation").value = expression; // Update the displayed expression
}

// Function to handle sign change for numbers
function plus_minus() {
    const resultField = document.getElementById("result");

    // Check if there is a last answer to change its sign
    if (lastAnswer) {
        lastAnswer = -lastAnswer; // Change sign
        resultField.value = lastAnswer; // Show the updated result
    }
}

// Function to handle square root operation
function square_root() {
    const resultField = document.getElementById("result");

    if (lastAnswer) {
        lastAnswer = Math.sqrt(lastAnswer); // Calculate square root
        resultField.value = lastAnswer; // Show the updated result
    }
}

// Event listener to handle keyboard input
document.addEventListener('keydown', function (e) {
    e.preventDefault(); // Prevent default behavior for keys

    const key = e.key;

    // Check if the pressed key is a number or operator
    if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '%', '.', 'Enter'].includes(key)) {
        btnInput(key === 'Enter' ? '=' : key); // Use equal for Enter key
    } else if (key === 'Backspace') {
        backspace_remove(); // Handle backspace
    } else if (key === 'Escape') {
        button_clear(); // Handle escape for clearing
    }
});
