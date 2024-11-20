const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const playArea = document.querySelector(".play-area");

let score = 0;
let gameInterval;
let gameRunning = false;

function startGame() {
    if (gameRunning) return;

    score = 0;
    updateScore();
    gameRunning = true;
    startButton.style.display = "none";
    ball.style.display = "block";

    // Move the ball every 0.8 seconds
    gameInterval = setInterval(moveBall, 800);

    // End the game after 30 seconds
    setTimeout(endGame, 30000);
}

function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.style.display = "block";
    ball.style.display = "none";
    alert(`Game Over! Your final score is ${score}`);
}

function moveBall() {
    const playAreaRect = playArea.getBoundingClientRect();

    const ballSize = 40; // Ball size
    const maxX = playAreaRect.width - ballSize;
    const maxY = playAreaRect.height - ballSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

ball.addEventListener("click", () => {
    if (gameRunning) {
        score++;
        updateScore();
        moveBall(); // Move the ball immediately after a click
    }
});

startButton.addEventListener("click", startGame);
