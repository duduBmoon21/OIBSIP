let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function btnInput(number) {
    currentExpression += number;
    expressionDisplay.value = currentExpression;
}

function btnInput(operator) {
    // Only allow operators if the last character is not already an operator
    if (currentExpression.length === 0 || operators.includes(currentExpression.charAt(currentExpression.length - 1))) {
        return; // Do nothing if currentExpression is empty or ends with an operator
    }
    currentExpression += operator;
    expressionDisplay.value = currentExpression;
}

// function to clear box and reset everything
function button_clear() {
    window.location.reload();
}

function backspace_remove() {
    result = document.getElementById("result");
    var elements = document.getElementsByClassName("operator");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    var last_num = result.innerText;
    last_num = last_num.slice(0, -1);
    
    result.innerText = last_num;

    // show 0 zero if all characters on screen are removed
    if (result.innerText.length == 0) {
        result.innerText = 0;
        firstNum = true;
    }
}


function square_root() {
    result = document.getElementById("result");
    var square_num = Math.sqrt(result.innerText);
    result.innerText = square_num;
    numbers.push(square_num);
}


function insertAns() {
    if (ans !== 0) {
        currentExpression += ans;
        expressionDisplay.value = currentExpression;
    }
}

function toggleSign() {
    if (currentExpression.length === 0) {
        return; // Do nothing if currentExpression is empty
    }

    // Toggle the sign of the expression
    if (currentExpression.charAt(0) === '-') {
        currentExpression = currentExpression.slice(1); 
    } else {
        currentExpression = '-' + currentExpression;  
    }
    expressionDisplay.value = currentExpression;
}

// Define operators for validation
const operators = ["+", "-", "÷", "*"];
