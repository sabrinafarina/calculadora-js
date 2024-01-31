// conectando o html com o js

// selecionando os elementos através do DOM

// operação enterior
const previousOperationText = document.querySelector("#previous-operation");

// operação atual
const currentOperationText = document.querySelector("#current-operation");

// botões
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // mostrar digitos no vizor
    addDigit(digit) {

    // checar se a operação atual ja tem um ponto
    if(digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;  
    }

        this.currentOperation = digit
        this.updateScreen()
    }

    // processar tds as operações da calculadora
    processOperation(operation) {
       
        // pegar valor atual e anterior
        let operationValue;
        const previus = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previus + current
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "-":
                operationValue = previus - current
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "/":
                operationValue = previus / current
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "*":
                operationValue = previus * current
                this.updateScreen(operationValue, operation, current, previus);
                break;

            default:
                return;
        }
    }

    // muda os valores do vizor
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previus = null
    ) {
       
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se o valor é zero, se for, apenas adiciona o valor
            if(previus === 0) {
                operationValue = current
            }

            // adiciona o valor de current para previus
           
            // this.previousOperationText.innerText = (operationValue) + (operation);
            this.previousOperationText.innerText = '${operationValue} ${operation}';
            this.currentOperationText.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})