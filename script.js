// Quiz Questions
const quizData = [
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        correct: 1
    },
    {
        question: "Which HTML tag is used to include JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        correct: 0
    },
    {
        question: "Which method is used to print something in the browser console?",
        options: ["console.write()", "console.print()", "console.log()", "log.console()"],
        correct: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Mozilla", "Netscape", "Microsoft"],
        correct: 2
    },
    {
        question: "Which one is a JavaScript framework?",
        options: ["Django", "Laravel", "React", "Flask"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answersLocked = false;

// DOM elements
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// Load question
function loadQuestion() {
    answersLocked = false;
    nextBtn.style.display = "none";

    const q = quizData[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionText.textContent = q.question;

    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;

        div.addEventListener("click", () => selectAnswer(div, index));
        optionsDiv.appendChild(div);
    });
}

// Handle answer selection
function selectAnswer(optionDiv, selectedIndex) {
    if (answersLocked) return;
    answersLocked = true;

    const correctIndex = quizData[currentQuestion].correct;

    if (selectedIndex === correctIndex) {
        optionDiv.classList.add("correct");
        score++;
    } else {
        optionDiv.classList.add("wrong");
        optionsDiv.children[correctIndex].classList.add("correct");
    }

    nextBtn.style.display = "block";
}

// Next button handler
nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Show results
function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    loadQuestion();
});

// Initial load
loadQuestion();
