const quizData = [
    {
        question: "What is your hair texture?",
        options: ["Straight", "Coily", "Wavy", "Curly"]
    },
    {
        question: "What is your hair condition?",
        options: ["Healthy", "Transitioning", "Mildly Damaged", "Damaged (Completely Ruined)"]
    },
    {
        question: "What is your preferred hairstyle?",
        options: ["Natural", "Weave/Wigs/Extensions", "Protective", "Heat-Styled"]
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");

let currentQuestion = 0;
let answers = [];

function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        optionsElement.appendChild(button);

        button.addEventListener("click", () => selectAnswer(option));
    });
}

function selectAnswer(selectedOption) {
    answers.push(selectedOption);
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerText = "Your Quiz Results!";
    optionsElement.innerHTML = "";

   
   
    resultElement.innerHTML = `
        <h2>Answers You Selected:</h2>
        <ul>
            ${answers.map(a => `<li>${a}</li>`).join("")}
        </ul>
       `;
}

showQuestion();
