var operators = ["+", "-", "÷", "*"];
var result = null;
var operator_value = null;
var equal = null;
var dot = null;
var firstNum = true;
var numbers = [];
var calc_operator = null;
var total = null;

function btnInput(button) {
    result = document.getElementById("result");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    // If button is not an operator or = sign
    if (!operators.includes(button) && button != equal) {
        if (firstNum) {
            result.innerText = (button === dot) ? "0" + dot : button;
            firstNum = false;
        } else {
            if (result.innerText.length < 20) { // Limit to 20 characters
                if (button === dot && !result.innerText.includes(dot)) {
                    result.innerText += button;
                } else if (result.innerText !== "0" || button !== "0") {
                    result.innerText += button;
                }
            }
        }
    } else {
        // If it's an operator or = sign
        if (operator_value !== null && button === operator_value) {
            return; // Ignore if the same operator is clicked
        }

        if (button === "-" && result.innerText === "0") {
            result.innerText = button; // Allow negative sign on zero
            firstNum = false;
            operator_value = button;
            return;
        }

        if (operators.includes(button)) {
            if (typeof calc_operator !== "undefined" && calc_operator !== null) {
                // If the current operator is the same as the last one, do nothing
                if (button === calc_operator) return;
            }
            calc_operator = button;
            operator_value = button;
            firstNum = true; // Reset for next number

            if (numbers.length === 0) {
                numbers.push(result.innerText);
            } else if (numbers.length === 1) {
                numbers.push(result.innerText);
            } else {
                numbers[0] = calculate(numbers[0], result.innerText, calc_operator);
                result.innerText = numbers[0]; // Update result with the total
                numbers[1] = ""; // Clear second number for next input
            }
        }

        if (button === equal) {
            if (numbers.length === 2 && calc_operator) {
                total = calculate(numbers[0], result.innerText, calc_operator);
                result.innerText = total;
                numbers[0] = total; // Update numbers array
                numbers.pop(); // Clear the second number
                operator_value = null; // Reset operator
                calc_operator = null; // Reset calc_operator
            }
        }
    }
}

// Function to calculate the result using two numbers and an operator
function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            total = parseFloat(num1) + parseFloat(num2);
            break;
        case "-":
            total = parseFloat(num1) - parseFloat(num2);
            break;
        case "*":
            total = parseFloat(num1) * parseFloat(num2);
            break;
        case "÷":
            total = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            total = 0;
    }

    return Number.isInteger(total) ? total : total.toPrecision(12); // Return total
}

function clearScreen() {
    result.innerText = "0";
    operator_value = null;
    numbers = [];
    firstNum = true;
    calc_operator = null; // Reset the operator for new calculations
}

function deleteLast() {
    let currentExpression = result.innerText;
    if (currentExpression.length > 1) {
        result.innerText = currentExpression.slice(0, -1); // Remove last digit
    } else {
        result.innerText = "0"; // Reset to 0 if it's the last digit
    }
}

function insertAns(ans) {
    let currentExpression = result.innerText;
    result.innerText += ans; // Append answer to the current expression
}

function square_root() {
    result.innerText = Math.sqrt(parseFloat(result.innerText));
   
    operator_value = null;
}

function plus_minus() {
    if (result.innerText.length > 0) {
        if (result.innerText.includes("-")) {
            result.innerText = result.innerText.substring(1); // Remove negative sign
        } else {
            result.innerText = "-" + result.innerText; // Add negative sign
        }
    }
}
