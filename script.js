const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';

const questionContainer = document.getElementById('question-container');
const answerForm = document.getElementById('answer-form');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let questions = [];

function fetchQuestions() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            showQuestion();
        });
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
    `;
    const answers = shuffleArray([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);
    for (let i = 0; i < answers.length; i++) {
        const answerInput = document.getElementById(`answer${i + 1}`);
        const answerLabel = document.getElementById(`answer${i + 1}-label`);
        answerInput.value = answers[i];
        answerLabel.textContent = answers[i];
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        submitButton.disabled = false;
    } else {
        questionContainer.innerHTML = '<h2>End of Quiz</h2>';
        nextButton.style.display = 'none';
        submitButton.style.display = 'none';
    }
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const userAnswer = selectedAnswer.value;
    if (userAnswer === correctAnswer) {
        alert('Correct!');
    } else {
        alert(`Incorrect. The correct answer is: ${correctAnswer}`);
    }
    submitButton.disabled = true;
}

submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', showNextQuestion);

fetchQuestions();

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
