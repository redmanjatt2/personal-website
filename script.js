// DOM Elements
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const difficultySelect = document.getElementById("difficulty");

// Game Variables
let score = 0;
let timer = 30;
let gameInterval;
let timerInterval;
let ballSpeed = 800;

// Move Ball Function
function moveBall() {
    const playArea = document.querySelector(".play-area").getBoundingClientRect();
    const ballSize = ball.offsetWidth;
    const maxX = playArea.width - ballSize;
    const maxY = playArea.height - ballSize;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

// Update Timer
function updateTimer() {
    timerDisplay.textContent = `Time Left: ${timer}s`;
}

// Start Game
function startGame() {
    score = 0;
    timer = 30;
    updateScore();
    updateTimer();
    startButton.style.display = "none";
    ball.style.display = "block";
    gameOverScreen.style.display = "none";

    setDifficulty();

    gameInterval = setInterval(moveBall, ballSpeed);
    timerInterval = setInterval(countdown, 1000);
}

// Countdown Timer
function countdown() {
    timer--;
    updateTimer();
    if (timer <= 0) {
        endGame();
    }
}

// Update Score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Ball Click Event
ball.addEventListener("click", () => {
    score++;
    updateScore();
    moveBall();
});

// End Game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    ball.style.display = "none";
    startButton.style.display = "block";
    gameOverScreen.style.display = "block";
    finalScoreDisplay.textContent = score;
}

// Restart Game
restartButton.addEventListener("click", startGame);

// Set Difficulty
function setDifficulty() {
    const difficulty = difficultySelect.value;
    if (difficulty === "easy") {
        ballSpeed = 1000;
    } else if (difficulty === "medium") {
        ballSpeed = 800;
    } else if (difficulty === "hard") {
        ballSpeed = 600;
    }
}

// Attach Event Listeners
startButton.addEventListener("click", startGame);
