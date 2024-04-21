const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');
const grid = 30; // Tamaño de cada celda del tablero (15x15 celdas)
const boardSize = grid * 15;
let snake = [{ x: 7 * grid, y: 7 * grid }];
let apple = { x: 5 * grid, y: 5 * grid };
let dx = grid;
let dy = 0;
let score = 0;
let speed = 1000;
let gameInterval;

document.addEventListener('keydown', changeDirection);

function main() {
    if (hasGameEnded()) return gameOver();
    setTimeout(function onTick() {
        clearCanvas();
        drawApple();
        moveSnake();
        drawSnake();
        main();
    }, speed);
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, boardSize, boardSize);
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(part.x, part.y, grid - 1, grid - 1);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        score += 1;
        document.getElementById('score').textContent = score;
        placeApple();
        adjustSpeed();
    } else {
        snake.pop();
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -grid;
    const goingDown = dy === grid;
    const goingRight = dx === grid;
    const goingLeft = dx === -grid;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -grid;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -grid;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = grid;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = grid;
    }
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return snake[0].x < 0 || snake[0].x >= boardSize || snake[0].y < 0 || snake[0].y >= boardSize;
}

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.fillText('Juego Terminado', 150, 225);
    clearInterval(gameInterval);
}

function placeApple() {
    apple = {
        x: Math.floor(Math.random() * 15) * grid,
        y: Math.floor(Math.random() * 15) * grid
    };
}

function adjustSpeed() {
    if (score % 5 === 0 && speed > 200) {
        speed -= 50; // Reducir la velocidad muy suavemente
    }
}

//

// Inicialización del juego
gameInterval = setInterval(main, speed);
