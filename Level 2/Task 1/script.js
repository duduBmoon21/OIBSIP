
let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function appendNumber(number) {
    currentExpression += number;
    expressionDisplay.value = currentExpression;
}

function appendOperator(operator) {
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
        let result = eval(currentExpression);
        resultDisplay.value = result;
        ans = result;
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
