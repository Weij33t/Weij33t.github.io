

// Переменные для слайдера
let slider = document.querySelector(".slider"),
    sliderTrack = slider.querySelector(".slider-track"),
    nextButtons = slider.querySelectorAll(".next"),
    prevButtons = slider.querySelectorAll(".prev"),
    nextInputs = slider.querySelectorAll(".next-input"),
    inputs = slider.querySelectorAll("input"),
    slides = document.querySelectorAll(".slide"),
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    flag = 1,
    slide = function () {
        sliderTrack.style.transition = "transform .5s",
        sliderTrack.style.transform = `translate3d(-${slideIndex * (slideWidth) }px, 0px, 0px)`;
        if (slideIndex == 4 && flag){
            flag = 0
            generateTask(info.quantity);
        } else if(slideIndex == 5){
            checkAnswers(answers, userAnswers);
            showState(); 
            for (let i = 0; i < info.quantity; i++) {
                popupTaskContainer.insertAdjacentHTML('beforeend', generateResultsTemplate(i));
            }
        }
    };


// Переменные для обработки вводимых данны
let operationBtns = document.querySelectorAll('.operationBtn'),
    numbers = document.querySelectorAll(".slider-item-numbers__number"), // Числа для тренировки
    numberInput = document.querySelector(".slider-item-numbers input"),
    quantityInput = document.querySelector(".quantityInput"),
    lengthInput = document.querySelector(".inputLength"),
    taskContainer = document.querySelector(".slider-item-tasks");

// Переменные для записи вводимых данных

let operationFlag,  // Тип операции. Умножение - 0, деление - 1 
    chosenNumber,  // Выбранное для тренировки число
    quantity, // Количество чисел
    numberLength, // Длина числа
    tasks = [], // Массив с примерами
    answers = [], // Массив с ответами
    answerInputs = [], // Массив с полями для ввода
    userAnswers = [], // Массив с ответами пользователя
    wrongUserAnswers = [], // Массив с неправильными ответами
    rightUserAnswers = [], // Массив с правильными ответами
    withoutEnteredAnswer = []; // Массив с неведёнными ответами

let wrongColor = '#e62548',
    rightColor = '#13a080';

let info = {
    operationFlag,
    chosenNumber,
    quantity,
    numberLength,
    answers,
    userAnswers,
    rightUserAnswers,
    wrongUserAnswers,
    log() {
        console.log(this.operationFlag);
        console.log(this.chosenNumber);
        console.log(this.quantity);
        console.log(this.numberLength);
        console.log(this.answers);
        console.log(this.userAnswers);
        console.log(this.rightAnswers);
        console.log(this.wrongAnswers);
    }
}

// Запрет ввода букв в поля
inputs.forEach(input => {
    input.onkeypress = function(e) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue= false;
        }
    }
});

nextButtons.forEach(next => {
    next.addEventListener("click", function(){
        slideIndex++;
        slide()
    });
})

prevButtons.forEach(prev => {
    prev.addEventListener("click", function(){
        slideIndex--;
        slide()
    });
})

nextInputs.forEach(next => {
    next.addEventListener("keyup", inputEntered)
})

function inputEntered(e) {
    if (e.key === 'Enter'){
        slideIndex++;
        slide();
    }
}

// Логика калькулятора
// operationFlag = 0 => умножение. Иначе деление
operationBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        if (this.classList.contains('btn-divide')){
            info.operationFlag = 1;
        } else{
            info.operationFlag = 0;
        }
        console.log(operationFlag)
    })
});


// Число для тренировки
numbers.forEach(number => {
    number.addEventListener('click', function() {
        info.chosenNumber = this.textContent;
        console.log(this.textContent);
    });
});

numberInput.oninput = () => {
    info.chosenNumber = numberInput.value;
}

quantityInput.oninput = () => {
    info.quantity = quantityInput.value;
}

lengthInput.oninput = () => {
    info.numberLength = lengthInput.value;
    if (lengthInput.value > 8){
        console.log("Количество знаков не может превышать 8");
        lengthInput.value = '';
    } 
}

// <div class="slider-item-task">
//     <span class="slider-item-task__problem"></span>
//     <input type="text" class="slider-item-task__answer input">
// </div>

// создание контейнера с примером

let taskTemplate = (operation, index) => {

    let operationSymbol = operation ? "/" : "*";
    let length = parseInt(info.numberLength, 10);
    tasks.push(Math.floor((Math.random())*(10**length)));

    return `
        <div class="slider-item-task">
            <span class="slider-item-task__problem">${tasks[index]} ${operationSymbol} ${info.chosenNumber}  </span>
            <input type="text" data-id=${index} class="slider-item-task__answer input userAnswerInput">
        </div>
    `
}

//Создание контейнера с выводом результата

function generateResultsTemplate (index) {
    let operationSymbol = info.operationFlag ? "/" : "*";
    let userAnswer = userAnswers[index];
    let color = rightColor;
    let icon = '&#10003;';
    if (userAnswer == undefined){
        userAnswer = "Нет ответа";
    } 
    
    if(userAnswer != answers[index]){
        color = wrongColor;
        icon = '&#10060;';
    }

    return `
        <div class="more-results-task">
            <div class="more-results-task__example">
                Пример: ${tasks[index]} ${operationSymbol} ${info.chosenNumber}
            </div>
            <div class="more-results-task__user">
                Ваш ответ: <span class="more-results-task__user-answer "style="color: ${color}">${userAnswer} ${icon}</span>
            </div>
            <div class="more-results-task__answer">
                Верный ответ: <span class="more-results-task__answer-text">${answers[index]}</span>
            </div>
        </div>
    `
}

function getUserAnswers() {
    answerInputs = document.querySelectorAll(".userAnswerInput");

    for (let i = 0; i < answerInputs.length; i++) {
        answerInputs[i].addEventListener("input",() => {
            userAnswers[i] = answerInputs[i].value;
        })
    }
    
}

let popupTaskContainer = document.querySelector(".more-results-container");

function generateTask() {
    for (let i = 0; i < info.quantity; i++){
        taskContainer.insertAdjacentHTML('beforeend', taskTemplate(info.operationFlag, i));
    }
    generateAnswersArray();
    getUserAnswers();
    
}


function addAsk() {

    console.log("Added");
}

function generateAnswersArray() {
    for (let i = 0; i < tasks.length; i++){
        if (info.operationFlag == 0){
            answers.push(tasks[i]*info.chosenNumber);
        } else{
            answers.push(tasks[i]/info.chosenNumber)
        }
    }
}

function checkAnswers(answers, userAnswers) {
    for (let i = 0; i < answers.length; i++) {
        if (userAnswers[i] == undefined){
            withoutEnteredAnswer.push(userAnswers[i]);
        }
        else if (answers[i] == userAnswers[i]){
            rightUserAnswers.push(userAnswers[i]);
        } else{
            wrongUserAnswers.push(userAnswers[i]);
            
        }
    }
}

// Подсчет количества верных, неверных и неведеннёх ответов
let rightAnswersQuantity = document.querySelector(".rightAnswersQuantity"),
    wrongAnswersQuantity = document.querySelector(".wrongAnswersQuantity"),
    withoutAnswerQuantity = document.querySelector(".withoutAnswerQuantity");

function showState() {
    rightAnswersQuantity.textContent = rightUserAnswers.length;
    wrongAnswersQuantity.textContent = wrongUserAnswers.length;
    withoutAnswerQuantity.textContent = withoutEnteredAnswer.length;
}


let popupWindow = document.querySelector(".popup"),
    moreInfo = document.querySelector(".slider-item-results__more");

moreInfo.onclick = function () {
    popupWindow.classList.toggle('show');
}

popupWindow.onclick = function () {
    this.classList.toggle('show');
}
