var operators = ["+", "-", "/", "*"];

var result = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []

function btnInput(button) {
    operator = document.getElementsByClassName("operator");
    result = document.getElementById("result");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    last_button = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button != equal) {
        // if it is the first button clicked
        if (firstNum) {
            // and it's a dot, show 0.
            if (button == dot) {
                result.innerText = "0" + dot;
            }
            // else clear box and show the number
            else {
                result.innerText = button;
            }
            firstNum = false;
        }
        else {
            // return if the box value is 0
            if (result.innerText.length == 1 && result.innerText == 0) {
                if (button == dot) {
                    result.innerText += button;
                }
                return;
            }
            // return if the box already has a dot and clicked button is a dot
            if (result.innerText.includes(dot) && button == dot) {
                return;
            }
            // maximum allowed numbers inputted are 20
            if (result.innerText.length == 20) {
                return;
            }

            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && result.innerText == "-") {
                result.innerText = "-0" + dot;
            }
            // else append number
            else {
                result.innerText += button;
            }
        }
    }
    // if it's an operator or = sign
    else {
        // return if operator is already pressed
        if (operator_value != null && button == operator_value) {
            return;
        }

        // show minus sign if it's the first value selected and finally return
        if (button == "-" && result.innerText == 0) {
            result.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator();
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && result.innerText == "-") {
            return;
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")) {
            return;
        }

        // set value of operator if it's one
        if (operators.includes(button)) {
            if (typeof last_operator != "undefined" && last_operator != null) {
                calc_operator = last_operator;
            }
            else {
                calc_operator = button;
            }
            if (button == "*") {
                last_operator = "×";
            }
            else if (button == "/") {
                last_operator = "÷";
            }
            else {
                last_operator = button;
            }
            operator_value = button;
            firstNum = true;
            showSelectedOperator();
        }

        // add first number to numbers array and show it on history
        if (numbers.length == 0) {
            numbers.push(result.innerText);
            if (typeof last_operator != "undefined" && last_operator != null) {
                last_operation_history.innerText = result.innerText + " " + last_operator;
            }
        }
        // rest of calculations
        else {
            if (numbers.length == 1) {
                numbers[1] = result.innerText;
            }
            var temp_num = result.innerText;

            // calculate total
            if (button == equal && calc_operator != null) {
                var total = calculate(numbers[0], numbers[1], calc_operator);
                result.innerText = total;

                // append second number to history
                if (!last_operation_history.innerText.includes("=")) {
                    last_operation_history.innerText += " " + numbers[1] + " =";
                }

                temp_num = numbers[0];

                numbers[0] = total;
                operator_value = null;
                showSelectedOperator();

                // replace first number of history with the value of total
                var history_arr = last_operation_history.innerText.split(" ");
                history_arr[0] = temp_num;
                last_operation_history.innerText = history_arr.join(" ");
            }
            // update history with the value on screen and the pressed operator
            else if (calc_operator != null) {
                last_operation_history.innerText = temp_num + " " + last_operator;
                calc_operator = button;
                numbers = [];
                numbers.push(result.innerText);
            }
        }
    }
}

// highlight operator button when selected
function showSelectedOperator() {
    var elements = document.getElementsByClassName("operator");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    if (operator_value == "+") {
        document.getElementById("plusOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "-") {
        document.getElementById("subOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "*") {
        document.getElementById("multiOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "/") {
        document.getElementById("divOp").style.backgroundColor = "#ffd11a";
    }
}

// function to calculate the result using two numbers and an operator
function calculate(num1, num2, operator) {
    if (operator === "+") {
        total = (parseFloat)(num1) + (parseFloat)(num2);
    }
    else if (operator === "-") {
        total = (parseFloat)(num1) - (parseFloat)(num2);
    }
    else if (operator === "*") {
        total = (parseFloat)(num1) * (parseFloat)(num2);
    }
    else if (operator === "/") {
        total = (parseFloat)(num1) / (parseFloat)(num2);
    }
    else {
        if (total == result.innerText) {
            return total;
        }
        else {
            return result.innerText;
        }
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)) {
        total = total.toPrecision(12);
    }
    return parseFloat(total);
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

// function to change the sign of the number currently on screen
function plus_minus() {
    result = document.getElementById("result");

    // if any operator is already pressed
    if (typeof last_operator != "undefined") {
        if (numbers.length > 0) {
            // if last button pressed is an operator
            if (operators.includes(last_button)) {
                // if the displayed text is just a negative sign, replace it with a 0
                if (result.innerText == "-") {
                    result.innerText = 0;
                    firstNum = true;
                    return;
                }
                // if the displayed text is not just a negative sign, replace it with a negative sign
                else {
                    result.innerText = "-";
                    firstNum = false;
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                result.innerText = -result.innerText;

                if (numbers.length == 1) {
                    numbers[0] = result.innerText;
                }
                else {
                    numbers[1] = result.innerText;
                }
            }
        }
        return;
    }

    // if displayed text is 0, replace it with a negative sign
    if (result.innerText == 0) {
        result.innerText = "-";
        firstNum = false;
        return;
    }
    result.innerText = -result.innerText;
}

// function to calculate square root of the number currently on screen
function square_root() {
    result = document.getElementById("result");
    var square_num = Math.sqrt(result.innerText);
    result.innerText = square_num;
    numbers.push(square_num);
}




// function to calculate the percentage of a number
function calculate_percentage() {
    var elements = document.getElementsByClassName("operator");
    result = document.getElementById("result");

    if (numbers.length > 0 && typeof last_operator != "undefined") {
        var perc_value = (result.innerText / 100) * numbers[0];
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        result.innerText = perc_value;
        numbers.push(result.innerText);
    
        // append second number to history
        if (!last_operation_history.innerText.includes("=")) {
            last_operation_history.innerText += " " + numbers[1] + " =";
        }
    } else {
        result.innerText = result.innerText / 100;
    }

    numbers.push(result.innerText);
    var res = calculate(numbers[0], numbers[1], last_operator);
    result.innerText = res;
}
