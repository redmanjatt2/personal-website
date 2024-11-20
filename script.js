const ball = document.getElementById("ball");
const goldenBall = document.getElementById("golden-ball");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highScoreDisplay = document.getElementById("high-score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const leaderboardList = document.getElementById("leaderboard-list");

let score = 0;
let timer = 30;
let gameInterval;
let goldenInterval;
let timerInterval;
let gameRunning = false;

// Leaderboard and High Score
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = `High Score: ${highScore}`;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Update leaderboard UI
function updateLeaderboard() {
    leaderboardList.innerHTML = leaderboard.map((score, index) => `<li>${index + 1}. ${score}</li>`).join("");
}

// Start the game
function startGame() {
    if (gameRunning) return;

    score = 0;
    timer = 30;
    updateScore();
    updateTimer();
    gameRunning = true;
    startButton.style.display = "none";
    restartButton.style.display = "block";
    ball.style.display = "block";

    gameInterval = setInterval(moveBall, 800);
    timerInterval = setInterval(countdown, 1000);
    goldenInterval = setInterval(spawnGoldenBall, 5000);
}

// Countdown timer
function countdown() {
    timer--;
    updateTimer();

    if (timer <= 0) {
        endGame();
    }
}

function updateTimer() {
    timerDisplay.textContent = `Time Left: ${timer}s`;
}

// Move the ball
function moveBall() {
    const playAreaRect = document.querySelector(".play-area").getBoundingClientRect();
    const ballSize = 40;
    const maxX = playAreaRect.width - ballSize;
    const maxY = playAreaRect.height - ballSize;

    ball.style.left = `${Math.floor(Math.random() * maxX)}px`;
    ball.style.top = `${Math.floor(Math.random() * maxY)}px`;
}

// Golden Ball
function spawnGoldenBall() {
    if (gameRunning) {
        const playAreaRect = document.querySelector(".play-area").getBoundingClientRect();
        const ballSize = 50;
        const maxX = playAreaRect.width - ballSize;
        const maxY = playAreaRect.height - ballSize;

        goldenBall.style.left = `${Math.floor(Math.random() * maxX)}px`;
        goldenBall.style.top = `${Math.floor(Math.random() * maxY)}px`;
        goldenBall.style.display = "block";

        setTimeout(() => {
            goldenBall.style.display = "none";
        }, 2000);
    }
}

goldenBall.addEventListener("click", () => {
    score += 5; // Bonus points
    updateScore();
    goldenBall.style.display = "none";
});

// End the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    clearInterval(goldenInterval);
    gameRunning = false;
    ball.style.display = "none";
    goldenBall.style.display = "none";
    restartButton.style.display = "block";

    // Update leaderboard
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a).splice(3); // Keep top 3
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }

    updateLeaderboard();
    alert(`Game Over! Your score: ${score}`);
}

// Restart game
restartButton.addEventListener("click", startGame);

// Update score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

ball.addEventListener("click", () => {
    if (gameRunning) {
        score++;
        updateScore();
        moveBall();
    }
});

startButton.addEventListener("click", startGame);
updateLeaderboard();
