const buttonContainer = document.querySelector('.button-container');
const backspace = document.querySelector('.backspace');
const operatorList = document.querySelectorAll('.operator');
let input = '';
let formula = '';

buttonContainer.addEventListener('click', e => {
    const el = e.target;
    const operator = ['%', '/', '*', '-', '+'];
    if(el.textContent.length > 3) return;
    if(el.classList.contains('operator') && input.length < 1) return;

    switch(el.textContent){
        case 'AC':
            input = '';
            formula = '';
            updateScreen();
            return;
        case '%':
            input = input / 100;
            updateScreen();
            return;
        case '=':
            formula += input;
            input = String(new Function('return ' + formula)());
            formula = '';
            updateScreen();
            return;
        case '+/-':
            if(input.indexOf('-') < 0){
                input = '-'.concat(input);
            }else{
                input = input.substr(1, input.length);
            }
            updateScreen();
            return;
        case '.':
            if(input.indexOf('.') < 0) input += el.textContent;
            updateScreen();
            return;
    }

    if(el.classList.contains('operator')) {
        for(let item of operator){
            if(formula.indexOf(item) > 0){
                formula += input;
                input = '';
                formula = String(new Function('return ' + formula)());
                formula += el.textContent;
                updateScreen();
                return;
            }
        }
        formula += input + el.textContent;
        input = '';
        updateScreen();
        return;
    }

    input += el.textContent;
    updateScreen();
})


backspace.addEventListener('click', e => {
    input = input.substr(0, input.length - 1);
    updateScreen();
})

const updateScreen = () => {
    document.querySelector('.input').textContent = input || 0;
}