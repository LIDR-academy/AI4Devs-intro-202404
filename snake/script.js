// Obtener el contenedor del juego y el marcador
const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");

// Definir variables globales
const gridSize = 20; // Tamaño de cada cuadrado en píxeles
const gridWidth = gameContainer.offsetWidth / gridSize;
const gridHeight = gameContainer.offsetHeight / gridSize;
let snake = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }];
let apple = getRandomPosition();
let direction = "right";
let score = 0;
let gameInterval;

// Función para obtener una posición aleatoria dentro de la cuadrícula
function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight)
  };
}

// Función para dibujar la serpiente y la manzana en el contenedor del juego
function draw() {
  // Limpiar el contenedor del juego
  gameContainer.innerHTML = "";

  // Dibujar la serpiente
  snake.forEach(segment => {
    const snakePart = document.createElement("div");
    snakePart.classList.add("snakePart");
    snakePart.style.left = segment.x * gridSize + "px";
    snakePart.style.top = segment.y * gridSize + "px";
    gameContainer.appendChild(snakePart);
  });

  // Dibujar la manzana
  const appleElement = document.createElement("div");
  appleElement.classList.add("apple");
  appleElement.style.left = apple.x * gridSize + "px";
  appleElement.style.top = apple.y * gridSize + "px";
  gameContainer.appendChild(appleElement);
}

// Función para manejar el movimiento de la serpiente
function move() {
  // Mover la serpiente en la dirección actual
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  // Verificar si la serpiente ha colisionado con los límites del juego
  if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
    gameOver();
    return;
  }

  // Verificar si la serpiente ha colisionado consigo misma
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  // Agregar la nueva cabeza a la serpiente
  snake.unshift(head);

  // Verificar si la serpiente ha comido la manzana
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreElement.textContent = "Score: " + score;
    apple = getRandomPosition();
  } else {
    // Si no ha comido la manzana, eliminar la cola de la serpiente
    snake.pop();
  }

  // Dibujar la serpiente y la manzana actualizadas
  draw();
}

// Función para finalizar el juego
function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Your score: " + score);
}

// Evento de teclado para controlar la dirección de la serpiente
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Función para iniciar el juego
function startGame() {
  // Reiniciar variables
  snake = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }];
  apple = getRandomPosition();
  direction = "right";
  score = 0;
  scoreElement.textContent = "Score: " + score;

  // Dibujar la serpiente y la manzana inicial
  draw();

  // Iniciar el intervalo de juego
  gameInterval = setInterval(move, 100);
}

// Evento de clic para iniciar el juego
document.getElementById("startButton").addEventListener("click", startGame);

// Iniciar el juego cuando se cargue la página
startGame();
