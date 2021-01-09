const buttonContainer = document.querySelector('.button-container');
const backspace = document.querySelector('.backspace');
const operatorList = document.querySelectorAll('.operator');
let input = '';
let formula = '';

buttonContainer.addEventListener('click', e => {
    const text = e.target.textContent;
    if(text.length > 3){
        return;
    }else if(text === 'AC'){
        input = '';
        formula = '';
        updateScreen();
        return;
    }else if(input.length >= 1 && text === '%'){
        input = input / 100;
        updateScreen();
        return;
    }else if(text == '.'){
        if(input.indexOf('.') > 0) return;
    }else if(e.target.classList.contains('operator') && text != '='){
        formula += input + e.target.textContent;
        input = '';
        updateScreen();
        return;
    }else if(text == '='){
        formula += input;
        input = String(new Function('return ' + formula)());
        formula = '';
        updateScreen();
        return;
    }

    input += text;
    updateScreen();
})


backspace.addEventListener('click', e => {
    input = input.substr(0, input.length - 1);
    updateScreen();
})

const updateScreen = () => {
    document.querySelector('.input').textContent = input || 0;
}

const calculate = () => {
    input = new Function('return formula');
}