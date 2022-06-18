var currentNumberWrapper = document.getElementById('currentNumber');
var currentNumber = 0;

document.getElementsByName('adicionar')[0]
    .addEventListener('click', increment)

document.getElementsByName('subtrair')[0]
    .addEventListener('click', decrement)


function increment(){
    if (currentNumber <= 9){
        currentNumber = currentNumber + 1;
        currentNumberWrapper.innerHTML = currentNumber;
        changeColor()
    }
}

function decrement(){
    if (currentNumber >= -9){
        currentNumber = currentNumber - 1;
        currentNumberWrapper.innerHTML = currentNumber;
        changeColor()
    }
}

function changeColor(){
    if (currentNumber < 0){
        currentNumberWrapper.style.color = 'red';
    } else{
        currentNumberWrapper.style.color = 'black';
    }
}