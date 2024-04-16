const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 20;
let direction = 'RIGHT';
let apple = { x: cellSize * 5, y: cellSize * 5 };
let snake = [{ x: cellSize * 2, y: cellSize * 2 }];
let speed = 100;

function drawCell(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let part of snake) {
        drawCell('green', part.x, part.y);
    }
    drawCell('red', apple.x, apple.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction === 'LEFT') snakeX -= cellSize;
    if (direction === 'RIGHT') snakeX += cellSize;
    if (direction === 'UP') snakeY -= cellSize;
    if (direction === 'DOWN') snakeY += cellSize;

    if (snakeX === apple.x && snakeY === apple.y) {
        apple = {
            x: Math.floor(Math.random() * canvas.width / cellSize) * cellSize,
            y: Math.floor(Math.random() * canvas.height / cellSize) * cellSize
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || checkCollision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
    }
}

function checkCollision(head, snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) return true;
    }
    return false;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

let game = setInterval(updateGame, speed);
