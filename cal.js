document.addEventListener('DOMContentLoaded', function () {
    const resultPrimary = document.getElementById('resultPrimary');
    const resultSecondary = document.getElementById('resultSecondary');
    let currentInput = '0';
    let operator = null;
    let previousInput = '0';

    function updateDisplay() {
        resultPrimary.value = currentInput;
        resultSecondary.value = previousInput + (operator ? ` ${operator} ` : '');
    }

    function clearAll() {
        currentInput = '0';
        operator = null;
        previousInput = '0';
        updateDisplay();
    }

    function clearEntry() {
        currentInput = '0';
        updateDisplay();
    }

    function handleNumberClick(number) {
        if (currentInput === '0' || currentInput === 'Error') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperatorClick(newOperator) {
        if (operator !== null) {
            calculate();
        }
        operator = newOperator;
        previousInput = currentInput;
        currentInput = '0';
        updateDisplay();
    }

    function calculate() {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) {
            clearAll();
            return;
        }

        switch (operator) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '*':
                currentInput = (num1 * num2).toString();
                break;
            case '/':
                if (num2 !== 0) {
                    currentInput = (num1 / num2).toString();
                } else {
                    currentInput = 'Error';
                }
                break;
            default:
                break;
        }

        operator = null;
        previousInput = currentInput; // Move this line after the switch block
        updateDisplay();
    }

    // Event Listeners for Number Buttons
    document.querySelectorAll('.calculator__btn--number').forEach(button => {
        button.addEventListener('click', () => {
            handleNumberClick(button.innerText);
        });
    });

    // Event Listeners for Operator Buttons
    document.querySelectorAll('.calculator__btn[data-operator]').forEach(button => {
        button.addEventListener('click', () => {
            handleOperatorClick(button.getAttribute('data-operator'));
        });
    });

    // Event Listener for Equals Button
    document.querySelector('.calculator__btn--equals').addEventListener('click', () => {
        calculate();
    });

    // Event Listener for Clear Entry Button
    document.querySelector('.calculator__btn[data-option="clearEntry"]').addEventListener('click', () => {
        clearEntry();
    });

    // Event Listener for Clear All Button
    document.querySelector('.calculator__btn[data-option="clear"]').addEventListener('click', () => {
        clearAll();
    });

    // Event Listener for Backspace Button
    document.querySelector('.geri_tusu').addEventListener('click', () => {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay();
    });
});
