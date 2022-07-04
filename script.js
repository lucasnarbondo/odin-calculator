let currentOperator = '';
let resetCalc=false;

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
    if (currentOperationScreen.textContent === '0'){
        currentOperationScreen.textContent = ''
    }
    currentOperationScreen.textContent += number;
}


function setOperation(operator){
    if (resetCalc == true){
        clear()
    }
    if (lastOperationScreen.textContent !== '') evaluate()
    resetCalc=false;
    currentOperator=operator;
    lastOperationScreen.textContent = currentOperationScreen.textContent + operator
    currentOperationScreen.textContent = '0'
}

function evaluate(){
    if (lastOperationScreen.textContent == '' || currentOperationScreen.textContent == '') return
   let result = operate(currentOperator,parseInt(lastOperationScreen.textContent),parseInt(currentOperationScreen.textContent))
   currentOperationScreen.textContent = result;
   resetCalc=true;
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