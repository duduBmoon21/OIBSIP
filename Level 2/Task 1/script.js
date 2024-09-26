let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function btnInput(number) {
    currentExpression += number;
    expressionDisplay.value = currentExpression;
}

function btnInput(operator) {
    currentExpression += operator;
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
