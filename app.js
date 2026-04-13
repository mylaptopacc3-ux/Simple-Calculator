const display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    const expression = display.value;
    const result = simpleCalc(expression);
    display.value = result;
}

/*function simpleCalc(expression) {
    if (expression.includes('+')) {
        const [a, b] = expression.split('+').map(Number);
        return a + b;
    }
    if (expression.includes('-')) {
        const [a, b] = expression.split('-').map(Number);
        return a - b;
    }
    if (expression.includes('*')) {
        const [a, b] = expression.split('*').map(Number);
        return a * b;
    }
    if (expression.includes('/')) {
        const [a, b] = expression.split('/').map(Number);
        return a / b;
    }
}*/  //This was the original simpleCalc function, which only handled one operator at a time. The new version can handle multiple operators and respects operator precedence.

function simpleCalc(expression) {
    let list = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

    for (let i = 0; i < list.length; i++) {
        if (list[i] === '*' || list[i] === '/') {
            const operator = list[i];
            const a = parseFloat(list[i - 1]);
            const b = parseFloat(list[i + 1]);
            const result = operator === '*' ? a * b : a / b;
            list.splice(i - 1, 3, result);
            i - 1;
        }
    }
    
    let result = Number(list[0]);
    for (let i = 1; i < list.length; i += 2) {
        const operator = list[i];
        const b = parseFloat(list[i + 1]);
        result = operator === '+' ? result + b : result - b;
    }
    
    return result;
}
