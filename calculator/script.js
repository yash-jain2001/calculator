// Calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// DOM elements
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Update display
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${getDisplayOperator(operation)}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

// Get display operator symbol
function getDisplayOperator(operator) {
    switch (operator) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return operator;
    }
}

// Append number to current operand
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number;
    }
    updateDisplay();
}

// Append operator
function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Calculate result
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = (prev * current) / 100;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Delete last character (backspace)
function deleteLastChar() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and decimal
    if (/[0-9.]/.test(key)) {
        event.preventDefault();
        appendNumber(key);
    }
    
    // Operators
    if (['+', '-', '*', '/', '%'].includes(key)) {
        event.preventDefault();
        appendOperator(key);
    }
    
    // Enter or equals
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    }
    
    // Escape or C for clear
    if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay(); 