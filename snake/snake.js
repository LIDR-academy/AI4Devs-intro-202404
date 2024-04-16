// Inicializar PixiJS
let app = new PIXI.Application({
    width: 800, 
    height: 600, 
    backgroundColor: 0x1099bb
});
document.getElementById('gameContainer').appendChild(app.view);

// Variables de control
let snake = [];
let direction = 'right';
let food = null;
let gridSize = 20;
let gameStarted = false;
let intervalId;
let speed = 250;  // Velocidad inicial en milisegundos

// Inicializar el snake
function createSnake() {
    for (let i = 0; i < 5; i++) {
        let part = new PIXI.Graphics();
        part.beginFill(0xFFFFFF);
        part.drawRect(0, 0, gridSize, gridSize);
        part.x = 160 - i * gridSize;
        part.y = 160;
        snake.push(part);
        app.stage.addChild(part);
    }
}

// Crear comida
function createFood() {
    let x = Math.floor(Math.random() * (app.screen.width / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (app.screen.height / gridSize)) * gridSize;
    food = new PIXI.Graphics();
    food.beginFill(0xFF0000);
    food.drawCircle(gridSize / 2, gridSize / 2, gridSize / 2);
    food.x = x;
    food.y = y;
    app.stage.addChild(food);
}

// Ajustar velocidad del snake
function adjustSpeed() {
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, speed);
}

// Movimiento y lógica del juego
function gameLoop() {
    if (!gameStarted) return;

    let x = snake[0].x;
    let y = snake[0].y;
    if (direction == 'right') x += gridSize;
    if (direction == 'left') x -= gridSize;
    if (direction == 'up') y -= gridSize;
    if (direction == 'down') y += gridSize;

    // Comprobar colisiones con bordes
    if (x >= app.screen.width || x < 0 || y >= app.screen.height || y < 0) {
        alert("Game Over");
        clearInterval(intervalId);
        return;
    }

    // Comprobar colisión con uno mismo
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            alert("Game Over");
            clearInterval(intervalId);
            return;
        }
    }

    // Comer la comida
    if (x === food.x && y === food.y) {
        let newPart = new PIXI.Graphics();
        newPart.beginFill(0xFFFFFF);
        newPart.drawRect(0, 0, gridSize, gridSize);
        newPart.x = snake[snake.length - 1].x;
        newPart.y = snake[snake.length - 1].y;
        snake.push(newPart);
        app.stage.addChild(newPart);
        food.destroy();
        createFood();
        speed = Math.max(100, speed - 10); // Reducir el intervalo por 10 milisegundos, no menor de 100 milisegundos
        adjustSpeed();
    } else {
        let tail = snake.pop();
        tail.x = x;
        tail.y = y;
        snake.unshift(tail);
    }
}

// Esperar a que el usuario presione cualquier tecla para iniciar
window.addEventListener('keydown', (e) => {
    if (!gameStarted) {
        createSnake();
        createFood();
        adjustSpeed();
        gameStarted = true;
    }

    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});
