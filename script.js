let currentOperator = '';
let firstNumber = '';
let secondNumber = '';
let resetCalc=false;
let resetScreen=false;
let chainingOperators=false;

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equal')
const clearButton = document.getElementById('clear')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)

function clear(){
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    resetCalc=false;
}

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)


function appendNumber(number){
    if (resetCalc == true){
        clear()
    }
    if (resetScreen) { 
        currentOperationScreen.textContent = ''
        resetScreen=false
    }
    if (currentOperationScreen.textContent === '0'){
        currentOperationScreen.textContent = ''
        chainingOperators=false;
    }
    currentOperationScreen.textContent += number;
    chainingOperators=false;
}


function setOperation(operator){
    if (resetCalc == true){
        currentOperationScreen.textContent = '0';
    }else if (lastOperationScreen.textContent !== '' && chainingOperators==false) evaluate()
    resetCalc=false;
    currentOperator=operator;
    firstNumber=currentOperationScreen.textContent;
    lastOperationScreen.textContent = currentOperationScreen.textContent + operator
    resetScreen = true;
    chainingOperators=true;
}

function evaluate(){
   if (lastOperationScreen.textContent == '' || currentOperationScreen.textContent == '') return
   secondNumber=currentOperationScreen.textContent;
   currentOperationScreen.textContent = operate(currentOperator,parseInt(firstNumber),parseInt(secondNumber))
   lastOperationScreen.textContent = ''
}

function operate (operator, a, b){
    switch (operator){
        case '+':
            return a+b;
        case '-':
            return a-b;
        case '*':
            return a*b;
        case '/':
            if ( b === 0) {
                return ('Kaboom');
            }
            return Math.round(a/b*100)/100   
    }
}