const quizData  = [
    {
        question: ""
        options: ["", "", "", ""]
        answer: ""
    },
    {
        question: ""
        options: ["", ""]
        answer: ""
    }
    {
        question: ""
        options: ["", ""]
        answer: ""

    }
    {
        question: ""
        options: ["", ""]
        answer: ""


    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerTest = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);


    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length){
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizData.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${quizData.length}</p>
    `;
}

showQuestion();