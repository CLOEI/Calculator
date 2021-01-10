const number = document.querySelectorAll('[data-number]');
const operator = document.querySelectorAll('[data-operator]');
const clearall = document.querySelector('[data-clearall]');
const plusmin = document.querySelector('[data-plusmin]');
const percentage = document.querySelector('[data-percentage]');
const equal = document.querySelector('[data-equal]');
const backspace = document.querySelector('[data-delete]');

let input = '';
let formula = '';
const operatorList = ['/', '*', '-', '+'];

number.forEach(element => {
    element.addEventListener('click', e => { 
        if(e.target.textContent == '.'){
            if(input.includes('.')) return;
        }      
        input += e.target.textContent;
        updateScreen();
    })
})

operator.forEach(element => {
    element.addEventListener('click', e => {
        if(input.length < 1) return;
        for(let operator of operatorList){
            if(formula.includes(operator)){
                formula += input;
                formula = String(new Function('return ' + formula)());
                formula += e.target.textContent;
                input = '';
                updateScreen();
                return;
            }
        }
        formula += input + e.target.textContent;
        input = '';
        updateScreen();
    })
})

equal.addEventListener('click', e => {
    formula += input;
    input = String(new Function('return ' + formula)());
    formula = '';
    updateScreen();
})

percentage.addEventListener('click', e => {
    input = String(input/100);
    updateScreen();
})

plusmin.addEventListener('click', e => {
    if(input.length < 1) return;
    if(input.includes('-')){
        input = input.substr(1, input.length);
    }else{
        input = '-'.concat(input);
    }
    updateScreen();
})

clearall.addEventListener('click', e => {
    input = '';
    formula = '';
    updateScreen();
})

backspace.addEventListener('click', e => {
    input = input.substr(0, input.length -1);
    updateScreen();
})

const updateScreen = () => {
    document.querySelector('.now-input').textContent = input || 0;
    document.querySelector('.previous-input').textContent = formula;
}