const gameArea = document.getElementById('gameArea');
const gameSize = 400;
const cellSize = 20;
let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
let direction = { x: cellSize, y: 0 };
let food = { x: 300, y: 200 };
let gameInterval;
let speed = 500;  // Velocidad inicial del intervalo en milisegundos

function initGame() {
    snake.forEach(segment => createSnakeSegment(segment));
    createFood();
    gameInterval = setInterval(moveSnake, speed);
}

function createSnakeSegment(segment) {
    const elem = document.createElement('div');
    elem.style.left = `${segment.x}px`;
    elem.style.top = `${segment.y}px`;
    elem.classList.add('snake');
    gameArea.appendChild(elem);
}

function createFood() {
    const foodElem = document.createElement('div');
    foodElem.style.left = `${food.x}px`;
    foodElem.style.top = `${food.y}px`;
    foodElem.classList.add('food');
    gameArea.appendChild(foodElem);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);  // Añade la nueva cabeza al frente de la serpiente

    if (newHead.x === food.x && newHead.y === food.y) {
        positionFood();  // Posiciona una nueva comida
        adjustSpeed();   // Ajusta la velocidad de la serpiente
        // No removemos el segmento de cola cuando la serpiente come la comida
        createSnakeSegment(newHead);  // Crea visualmente el nuevo segmento de serpiente
    } else {
        const removedTail = snake.pop();  // Remueve el último segmento si no ha comido
        removeSnakeSegment(removedTail);
    }

    updateSnake();  // Actualiza la posición de la serpiente en el DOM
    checkCollision(newHead);  // Comprueba colisiones
}

function positionFood() {
    food.x = Math.floor(Math.random() * (gameSize / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (gameSize / cellSize)) * cellSize;
    updateFood();
}

function updateSnake() {
    document.querySelectorAll('.snake').forEach((elem, index) => {
        elem.style.left = `${snake[index].x}px`;
        elem.style.top = `${snake[index].y}px`;
    });
}

function updateFood() {
    const foodElem = document.querySelector('.food');
    foodElem.style.left = `${food.x}px`;
    foodElem.style.top = `${food.y}px`;
}

function removeSnakeSegment(segment) {
    const segmentElem = document.querySelector(`.snake[style='left: ${segment.x}px; top: ${segment.y}px;']`);
    if (segmentElem) gameArea.removeChild(segmentElem);
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over! Press OK to restart.');
        restartGame();
    }
}

function adjustSpeed() {
    clearInterval(gameInterval);
    speed = Math.max(50, speed - 5);  // Aumentar velocidad y mantener un límite mínimo
    gameInterval = setInterval(moveSnake, speed);
}

function restartGame() {
    document.querySelectorAll('.snake').forEach(elem => gameArea.removeChild(elem));
    snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
    direction = { x: cellSize, y: 0 };
    speed = 100;  // Restablecer velocidad inicial
    initGame();
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -cellSize };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: cellSize };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -cellSize, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: cellSize, y: 0 };
});

window.onload = initGame;
