const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño de cada celda y tamaño del tablero
const gridSize = 20;
const canvasSize = 400;
const snakeSize = 1;

// Inicialización de la serpiente
let snake = [{x: 10, y: 10}];

// Dirección de la serpiente
let dx = 0;
let dy = 0;

// Posición de la manzana
let apple = {x: 15, y: 15};

// Flag para indicar si el juego ha comenzado
let gameStarted = false;

// Puntuación del jugador
let score = 0;

// Elemento de puntuación en el DOM
const scoreElement = document.getElementById("score");

// Función para dibujar la serpiente
function drawSnake() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Función para dibujar la manzana
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

// Función principal del juego
function main() {
    if (!gameStarted) return; // No se ejecuta si el juego no ha comenzado

    // Actualizar posición de la serpiente
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Comprobar si el juego ha terminado
    if (isGameOver()) {
        alert("¡Juego terminado! Puntuación: " + score);
        resetGame();
        return;
    }

    // Comprobar si la serpiente ha comido la manzana
    if (head.x === apple.x && head.y === apple.y) {
        // Generar nueva posición para la manzana
        generateApple();
        // Incrementar la puntuación
        score++;
        // Actualizar la puntuación en el DOM
        scoreElement.textContent = score;
    } else {
        snake.pop(); // Eliminar el último segmento solo si no se ha comido la manzana
    }

    // Dibujar la serpiente y la manzana en el canvas
    drawSnake();
    drawApple();
}

// Función para manejar las teclas presionadas
function handleKeyPress(event) {
    const key = event.key;
    if (!gameStarted) {
        // Comenzar el juego al presionar cualquier tecla de flecha
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
            gameStarted = true;
        }
    }

    if (key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }
}

// Función para generar una nueva posición para la manzana
function generateApple() {
    apple = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)),
        y: Math.floor(Math.random() * (canvasSize / gridSize))
    };

    // Verificar que la nueva posición no esté ocupada por la serpiente
    if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
        generateApple(); // Generar una nueva posición si está ocupada
    }
}

// Función para comprobar si el juego ha terminado
function isGameOver() {
    const head = snake[0];
    // Verificar si la serpiente colisiona consigo misma
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        return true;
    }
    // Verificar si la serpiente colisiona con los bordes del tablero
    return head.x < 0 || head.x >= canvasSize / gridSize || head.y < 0 || head.y >= canvasSize / gridSize;
}

// Función para reiniciar el juego
function resetGame() {
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    gameStarted = false;
    score = 0;
    scoreElement.textContent = score; // Reiniciar la puntuación en el DOM
}

// Llamar a la función principal cada 100ms
setInterval(main, 100);

// Escuchar eventos de teclado
document.addEventListener("keydown", handleKeyPress);
