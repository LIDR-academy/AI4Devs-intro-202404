const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let foodX, foodY;
let score = 0;
let gameOver = false; // Define gameOver variable

function drawSnake() {
    ctx.fillStyle = "#000";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const ateFood = snake[0].x === foodX && snake[0].y === foodY;
    if (ateFood) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);

    snake.forEach(segment => {
        if (segment.x === foodX && segment.y === foodY) {
            generateFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function main() {
    clearCanvas();
    moveSnake();
    drawFood();
    drawSnake();
    drawScore();
    checkGameOver();

    if (!gameOver) {
        setTimeout(main, 100);
    }
}

function checkGameOver() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= tileCount ||
        snake[0].y < 0 ||
        snake[0].y >= tileCount ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        gameOver = true;
        ctx.fillStyle = "#000";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
        case "Escape":
            gameOver = true;
            break;
    }
});

generateFood();
main();
