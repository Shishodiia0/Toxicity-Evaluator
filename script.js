const questions = [
    {
        question: "Does your friend often put others down?",
        answers: ["Yes", "No"],
        points: [2, 0]  // Yes = 2 points, No = 0 points
    },
    {
        question: "Is your friend sarcastic often?",
        answers: ["Yes", "No"],
        points: [2, 0]
    },
    {
        question: "Does your friend complain a lot?",
        answers: ["Yes", "No"],
        points: [2, 0]
    },
    {
        question: "Does your friend take responsibility for their actions?",
        answers: ["Yes", "No"],
        points: [0, 2]  // No = 2 points, Yes = 0 points (positive question)
    },
    {
        question: "Does your friend create drama often?",
        answers: ["Yes", "No"],
        points: [2, 0]
    }
];

let currentQuestion = 0;
let score = 0;

const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const resultContainer = document.getElementById("result");
const toxicResult = document.getElementById("toxic-result");
const progressBar = document.getElementById("progress-bar");
const resetButton = document.getElementById("reset-button");

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <h3>${questions[currentQuestion].question}</h3>
        ${questions[currentQuestion].answers
            .map((answer, index) => 
                `<div class="answer-btn" data-index="${index}">${answer}</div>`
            )
            .join("")}
    `;

    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            answerButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            const index = e.target.getAttribute("data-index");
            score += questions[currentQuestion].points[index];

            updateProgressBar();

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                setTimeout(loadQuestion, 500); // Smooth transition between questions
            } else {
                nextButton.classList.add("hidden");
                submitButton.classList.remove("hidden");
            }
        });
    });
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function displayResult() {
    let resultText = score >= 5 
        ? "Warning: Your friend may be toxic!" 
        : "Your friend seems to be okay.";
    
    toxicResult.textContent = resultText;
    resultContainer.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

nextButton.addEventListener("click", loadQuestion);
submitButton.addEventListener("click", displayResult);
resetButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    nextButton.classList.remove("hidden");
    submitButton.classList.add("hidden");
    resultContainer.classList.add("hidden");
    resetButton.classList.add("hidden");
});

loadQuestion();
