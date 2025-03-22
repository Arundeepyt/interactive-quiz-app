const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Hemingway", "Austen", "Orwell"],
        correct: "Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const timeLeftSpan = document.getElementById("time-left");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timeLeftSpan.textContent = timeLeft;
    startTimer();

    questionContainer.innerHTML = "";
    let questionData = quizData[currentQuestionIndex];
    let questionElement = document.createElement("h2");
    questionElement.textContent = questionData.question;
    questionContainer.appendChild(questionElement);

    let optionsContainer = document.createElement("div");
    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(button, option, questionData.correct));
        optionsContainer.appendChild(button);
    });

    questionContainer.appendChild(optionsContainer);
}

function selectAnswer(button, chosen, correct) {
    clearInterval(timer);
    if (chosen === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }
    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    progressBar.style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score}/${quizData.length}</p>`;
    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

nextButton.addEventListener("click", moveToNextQuestion);
restartButton.addEventListener("click", () => {
    restartButton.style.display = "none";
    nextButton.style.display = "block";
    progressBar.style.width = "0%";
    startQuiz();
});

startQuiz();