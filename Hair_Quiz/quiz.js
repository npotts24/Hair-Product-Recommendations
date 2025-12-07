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

const resultElement = document.getElementById("result");
const submitButton = document.getElementById("submit");

let answers = Array(quizData.length).fill(null);

function renderAllQuestions() {
    const container = document.getElementById('options') || document.createElement('div');
    // If #options is a single div in the original markup, we'll populate it with all question blocks
    container.innerHTML = '';

    quizData.forEach((q, qi) => {
        const block = document.createElement('div');
        block.classList.add('quiz-block');

        const qEl = document.createElement('h3');
        qEl.classList.add('quiz-question');
        qEl.innerText = `${qi + 1}. ${q.question}`;
        block.appendChild(qEl);

        const opts = document.createElement('div');
        opts.classList.add('quiz-options');

        q.options.forEach(opt => {
            const button = document.createElement('button');
            button.type = 'button';
            button.innerText = opt;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(qi, opt, button, opts));
            opts.appendChild(button);
        });

        block.appendChild(opts);
        container.appendChild(block);
    });

    // If there is no submit button in DOM, create one and append after container
    if (!submitButton) {
        const btn = document.createElement('button');
        btn.id = 'submit';
        btn.type = 'button';
        btn.innerText = 'Submit';
        btn.addEventListener('click', showResult);
        container.appendChild(btn);
    } else {
        submitButton.style.display = 'block';
        submitButton.addEventListener('click', showResult);
    }

    // Attach container back if original #options didn't exist
    const originalOptions = document.getElementById('options');
    if (!originalOptions) document.body.appendChild(container);
}

function selectAnswer(questionIndex, selectedOption, buttonEl, optsContainer) {
    answers[questionIndex] = selectedOption;

    // highlight selection, clear others
    Array.from(optsContainer.querySelectorAll('button')).forEach(b => b.classList.remove('selected'));
    if (buttonEl) buttonEl.classList.add('selected');
}

function showResult() {
    const unanswered = answers.map((a, i) => (a === null ? i + 1 : null)).filter(Boolean);
    if (unanswered.length) {
        alert('Please answer all questions: missing ' + unanswered.join(', '));
        return;
    }

    const qHeading = document.getElementById('question');
    if (qHeading) qHeading.innerText = 'Your Quiz Results!';

    resultElement.innerHTML = `
        <h2>Answers You Selected:</h2>
        <ul>
            ${answers.map(a => `<li>${a}</li>`).join('')}
        </ul>
    `;

    fetch('/Hair-Product-Recommendations/Hair_Quiz/save_quiz.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answers })
    })
    .then(r => r.json())
    .then(data => {
        if (data && data.success) {
            const msg = document.createElement('p');
            msg.innerText = 'Quiz saved. Thank you!';
            resultElement.appendChild(msg);
        } else {
            const err = document.createElement('p');
            err.innerText = 'Could not save quiz.';
            resultElement.appendChild(err);
        }
    })
    .catch(() => {
        const err = document.createElement('p');
        err.innerText = 'Could not save quiz.';
        resultElement.appendChild(err);
    });
}

renderAllQuestions();
