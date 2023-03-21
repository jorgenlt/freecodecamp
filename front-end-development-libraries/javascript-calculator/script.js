// variables
let input;

let expression = '';
let setExpression;
let answer;
let setAnswer;

let expressionSplitByOperator;
let lastItemInExpression;
let splitExpression = '';
let splitExpressionLast;

//regex
const regexDecimal = /[.]/g;
const regexOperators = /[-+/*]/g;
const regexOperatorsNoMinus = /[+/*]/g;
const regexOperatorsNoMinusNoPlus = /[/*]/g;

//elements
const display = document.querySelector('#display');
const allClearButton = document.querySelector('#clear');
const clearButton = document.querySelector('#all-clear');

const divideButton = document.querySelector('#divide');
const multiplyButton = document.querySelector('#multiply');
const subtractButton = document.querySelector('#subtract');
const addButton = document.querySelector('#add');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');

const oneButton = document.querySelector('#one');
const twoButton = document.querySelector('#two');
const threeButton = document.querySelector('#three');
const fourButton = document.querySelector('#four');
const fiveButton = document.querySelector('#five');
const sixButton = document.querySelector('#six');
const sevenButton = document.querySelector('#seven');
const eightButton = document.querySelector('#eight');
const nineButton = document.querySelector('#nine');
const zeroButton = document.querySelector('#zero');

// functions
const allClear = (element) => {
    element.innerHTML = '0';
};

const clear = (element) => {
    element.innerHTML = removeLastInString(element);
};

const removeLastInString = (element) => {
    return element.innerHTML.substring(0, element.innerHTML.length - 1);
};

const updateDisplay = (symbol) => {
    expression = display.innerHTML;

    expressionSplitByOperator = expression.split(regexOperators);
    lastItemInExpression = expressionSplitByOperator[expressionSplitByOperator.length - 1];
    splitExpression = expression.split('');
    splitExpressionLast = splitExpression[splitExpression.length - 1];

    console.log(`symbol is: ${symbol}`);
    console.log(`lastItemInExpression is: ${lastItemInExpression}`);
    console.log(`regexDecimal.test(lastItemInExpression) is: ${regexDecimal.test(lastItemInExpression)}`);
    console.log(`splitExpressionLast is: ${splitExpressionLast}`);
    console.log(`expression is: ${expression}`);
    console.log(`expressionSplitByOperator is ${expressionSplitByOperator}`);
    console.log(`splitExpression is: ${splitExpression}`);
    console.log(`splitExpression[splitExpression.length - 1] is: ${splitExpression[splitExpression.length - 1]}`);
    console.log(`splitExpression[splitExpression.length] is: ${splitExpression[splitExpression.length - 2]}`);
    console.log(`typeof splitExpression is ${typeof splitExpression}`);
    console.log(`typeof splitExpression[splitExpression.length - 1] is ${typeof splitExpression[splitExpression.length - 1]}`);
    console.log('---------------------------------');

    if(display.innerHTML == '0') {
        display.innerHTML = '';
    };

    if(symbol == '.' && lastItemInExpression.includes('.')) {
        display.innerHTML = display.innerHTML;
    } else if(splitExpressionLast == '-' && symbol.search(regexOperatorsNoMinusNoPlus) != -1) {
        display.innerHTML = removeLastInString(display) + symbol;
    } else if(symbol == '+' && splitExpressionLast == '-') {
        display.innerHTML = removeLastInString(display) + symbol;
    } else if(symbol == '-' && splitExpressionLast != '-') {
        display.innerHTML = display.innerHTML + symbol;
    } else if(splitExpressionLast == '-' && symbol != '-') {
        display.innerHTML = display.innerHTML + symbol;
    } else if(symbol.search(regexOperators) != -1 && splitExpressionLast.search(regexOperators) != -1) {
        display.innerHTML = removeLastInString(display) + symbol;
    } else {
        display.innerHTML = display.innerHTML + symbol;
    };

    if (typeof splitExpression[splitExpression.length -2] == 'string') {
        if(
        splitExpression[splitExpression.length - 2].search(regexOperators) != -1 && 
        splitExpression[splitExpression.length - 1].search(regexOperators) != -1 && 
        symbol.search(regexOperators) != -1) {
            display.innerHTML = expression.slice(0, -2) + symbol;
        };
    };
};

const calculate = () => {
    display.innerHTML = math.evaluate(display.innerHTML);
};

//actions
allClearButton.addEventListener('click', (event) => {
    allClear(display);
});

clearButton.addEventListener('click', (event) => {
    clear(display);
});

divideButton.addEventListener('click', (event) => {
    updateDisplay('/');
});

multiplyButton.addEventListener('click', (event) => {
    updateDisplay('*');
});

subtractButton.addEventListener('click', (event) => {
    updateDisplay('-');
});

addButton.addEventListener('click', (event) => {
    updateDisplay('+');
});

equalsButton.addEventListener('click', (event) => {
    calculate();
});

decimalButton.addEventListener('click', (event) => {
    updateDisplay('.');
});


// event listeners
oneButton.addEventListener('click', event => updateDisplay('1'));
twoButton.addEventListener('click', event => updateDisplay('2'));
threeButton.addEventListener('click', event => updateDisplay('3'));
fourButton.addEventListener('click', event => updateDisplay('4'));
fiveButton.addEventListener('click', event => updateDisplay('5'));
sixButton.addEventListener('click', event => updateDisplay('6'));
sevenButton.addEventListener('click', event => updateDisplay('7'));
eightButton.addEventListener('click', event => updateDisplay('8'));
nineButton.addEventListener('click', event => updateDisplay('9'));
zeroButton.addEventListener('click', event => updateDisplay('0'));

document.addEventListener("keypress", (event) => {
    // console.log("Key pressed: " + event.key);
    const key = event.key; 

    if(key == '/') {updateDisplay('/')};
    if(key == '*') {updateDisplay('*')};
    if(key == '-') {updateDisplay('-')};
    if(key == '+') {updateDisplay('+')};
    if(key == 'Enter') {calculate()};
    if(key == '.') {updateDisplay('.')};
    if(key == 1) {updateDisplay('1')};
    if(key == 2) {updateDisplay('2')};
    if(key == 3) {updateDisplay('3')};
    if(key == 4) {updateDisplay('4')};
    if(key == 5) {updateDisplay('5')};
    if(key == 6) {updateDisplay('6')};
    if(key == 7) {updateDisplay('7')};
    if(key == 8) {updateDisplay('8')};
    if(key == 9) {updateDisplay('9')};
    if(key == 0) {updateDisplay('0')};
});
