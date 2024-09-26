let expressionDisplay = document.getElementById('current_calculation'); 
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function btnInput(value) {
    // Check if the value is a number or operator
    if (!isNaN(value) || ['+', '-', '*', '/', '.', '(', ')'].includes(value)) {
        currentExpression += value;
    } else if (value === 'ans') {
        // Insert last answer if 'ans' button is clicked
        currentExpression += ans;
    }
    expressionDisplay.value = currentExpression;
}

function clearScreen() {
    currentExpression = '';
    expressionDisplay.value = '';
    resultDisplay.value = '';
}

function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    expressionDisplay.value = currentExpression;
}

function calculateResult() {
    try {
        // Replace 'sqrt(' with 'Math.sqrt(' for proper evaluation
        let expression = currentExpression.replace(/sqrt\(/g, 'Math.sqrt(');

        // Safely evaluate the expression
        let result = eval(expression);
        resultDisplay.value = result;
        ans = result;  // Save the result as 'ans'
    } catch (e) {
        resultDisplay.value = 'Error';
    }
}

function insertAns() {
    currentExpression += ans;
    expressionDisplay.value = currentExpression;
}

function toggleSign() {
    if (currentExpression.charAt(0) === '-') {
        currentExpression = currentExpression.slice(1); 
    } else {
        currentExpression = '-' + currentExpression;  
    }
    expressionDisplay.value = currentExpression;
}

// Event listener for keyboard input
document.addEventListener('keydown', function(e) {
    e.preventDefault(); // Prevent default behavior for keys
    const key = e.key;

    // Loop through possible keys and trigger appropriate functions
    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'];
    let isKeyHandled = false;

    for (let i = 0; i < keys.length; i++) {
        if (key === keys[i]) {
            if (key === 'Enter') {
                calculateResult(); // Calculate result on Enter
            } else if (key === 'Backspace') {
                deleteLast(); // Handle backspace
            } else if (key === 'Escape') {
                clearScreen(); // Clear screen on Escape
            } else {
                btnInput(key); // Call btnInput for numbers and operators
            }
            isKeyHandled = true;
            break; // Exit loop after handling the key
        }
    }

    // If the key pressed is not recognized, you could log an error or do nothing
    if (!isKeyHandled) {
        console.error('Unrecognized key pressed:', key);
    }
});

