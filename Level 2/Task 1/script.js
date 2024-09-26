let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function btnInput(value) {
    // Check if the value is a number or an operator
    if (!isNaN(value) || value === '.') {
        currentExpression += value;  // Append number or decimal point
    } else if (['+', '-', '*', '÷', 'sqrt('].includes(value)) {
        currentExpression += value;  // Append operator
    }
    expressionDisplay.value = currentExpression;  // Update display
}

function clearScreen() {
    currentExpression = '';
    expressionDisplay.value = '';
    resultDisplay.value = '';
}

function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);  // Remove last character
    expressionDisplay.value = currentExpression;  // Update display
}

function calculateResult() {
    try {
        // Replace 'sqrt(' with 'Math.sqrt(' for proper evaluation
        let expression = currentExpression.replace(/sqrt\(/g, 'Math.sqrt(');
        // Safely evaluate the expression
        let result = eval(expression);
        resultDisplay.value = result;  // Show result
        ans = result;  // Save the result as 'ans'
    } catch (e) {
        resultDisplay.value = 'Error';  // Show error on evaluation failure
    }
}

function insertAns() {
    currentExpression += ans;  // Append last result to expression
    expressionDisplay.value = currentExpression;  // Update display
}

function toggleSign() {
    if (currentExpression.charAt(0) === '-') {
        currentExpression = currentExpression.slice(1);  // Remove negative sign
    } else {
        currentExpression = '-' + currentExpression;  // Add negative sign
    }
    expressionDisplay.value = currentExpression;  // Update display
}
