// Variables globales
let gameStarted = false;
let xVelocity = 2;
let yVelocity = -2;

document.addEventListener("DOMContentLoaded", initGame);

// Inicializar el juego
function initGame() {
  setupEventListeners();
  createBricks();
  setupPaddleAndBall(); // Posicionar y mostrar la pelota desde el inicio
}

// Configurar la paleta y la bola
function setupPaddleAndBall() {
  const paddle = document.getElementById("paddle");
  const ball = document.getElementById("ball");
  resetBall(paddle, ball); // Posicionar la pelota correctamente
  ball.style.display = ""; // Asegurar que la pelota sea visible desde el inicio
}

function resetBall(paddle, ball) {
  const paddleWidth = paddle.offsetWidth;
  const paddleX = paddle.offsetLeft;
  const ballWidth = ball.offsetWidth;

  // Centrar la pelota sobre la plataforma
  ball.style.left = `${paddleX + paddleWidth / 2 - ballWidth / 2}px`;
  ball.style.top = `${paddle.offsetTop - ball.offsetHeight}px`;
}

// Configurar oyentes de eventos
function setupEventListeners() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !gameStarted) {
      startGame();
    } else {
      handlePaddleMovement(event);
    }
  });
}

// Iniciar el juego
function startGame() {
  gameStarted = true;

  xVelocity = 0; // Sin movimiento horizontal inicial
  yVelocity = -4; // Comenzar el movimiento hacia arriba

  requestAnimationFrame(moveBall); // Comenzar la animación
}

// Manejar el movimiento de la paleta
function handlePaddleMovement(event) {
  if (!gameStarted) return; // Ignorar los eventos de teclado si el juego no ha empezado

  const paddle = document.getElementById("paddle");
  const left = paddle.offsetLeft;
  const step = 20; // Definir cuánto se mueve la paleta con cada pulsación

  if (event.key === "ArrowLeft" && left > 0) {
    paddle.style.left = `${left - step}px`;
  } else if (event.key === "ArrowRight" && left < 800 - paddle.offsetWidth) {
    paddle.style.left = `${left + step}px`;
  }
}

// Mover la pelota
function moveBall() {
  const ball = document.getElementById("ball");
  let x = ball.offsetLeft + xVelocity;
  let y = ball.offsetTop + yVelocity;

  boundaryCollisionCheck(x, y);
  brickCollisionCheck();
  paddleCollisionCheck();

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  if (y < 600) {
    requestAnimationFrame(moveBall);
  } else {
    endGame();
  }
}

// Comprobar colisión con bordes
function boundaryCollisionCheck(x, y) {
  if (x <= 0 || x >= 780) xVelocity *= -1;
  if (y <= 0) yVelocity *= -1;
}

// Comprobar colisión con ladrillos
function brickCollisionCheck() {
  const ball = document.getElementById("ball");
  const bricks = document.querySelectorAll(".brick");
  bricks.forEach((brick) => {
    if (brick.style.display !== "none" && detectCollision(ball, brick)) {
      yVelocity *= -1;
      brick.style.display = "none";
      return;
    }
  });
}

// Comprobar colisión con la paleta
function paddleCollisionCheck() {
  const ball = document.getElementById("ball");
  const paddle = document.getElementById("paddle");
  if (detectCollision(ball, paddle) && yVelocity > 0) {
    yVelocity = -yVelocity; // Asegurar que el rebote sólo ocurra si la pelota se está moviendo hacia abajo
    // Ajustar la dirección X basada en el punto de impacto
    let paddleCenter = paddle.offsetLeft + paddle.offsetWidth / 2;
    let ballCenter = ball.offsetLeft + ball.offsetWidth / 2;
    xVelocity += 0.1 * (ballCenter - paddleCenter);
  }
}

function hideRestartButton() {
  const button = document.getElementById("restartButton");
  if (button) {
    button.remove();
  }
}

function restartGame() {
  hideRestartButton(); // Ocultar el botón de reinicio
  gameStarted = false; // Marcar que el juego no ha comenzado
  clearBricks(); // Limpiar los ladrillos existentes
  createBricks(); // Crear ladrillos de nuevo
  setupPaddleAndBall(); // Reposicionar la paleta y la pelota
  resetBallAndPaddle(); // Resetear posiciones de la pelota y la paleta
  prepareForStart(); // Preparar el juego para que espere a que se presione 'Enter'
}

function resetBallAndPaddle() {
  const paddle = document.getElementById("paddle");
  const ball = document.getElementById("ball");
  paddle.style.left = "350px"; // Ajusta esto según la posición inicial deseada
  resetBall(paddle, ball);
  ball.style.display = ""; // Asegurar que la pelota sea visible
}

function prepareForStart() {
  // Asegurarse de que la pelota no se mueva
  xVelocity = 0;
  yVelocity = 0;
}

function clearBricks() {
  const bricks = document.querySelectorAll(".brick");
  bricks.forEach((brick) => brick.remove());
}

function showRestartButton() {
  const gameContainer = document.getElementById("gameArea");
  const button = document.createElement("button");
  button.textContent = "Volver a jugar";
  button.id = "restartButton";
  button.onclick = restartGame;
  gameContainer.appendChild(button);
}

// Fin del juego
function endGame() {
  alert("Game Over! You lost the ball."); // Mostrar un mensaje simple de fin del juego
  showRestartButton(); // Mostrar el botón para reiniciar el juego
}

// Crear ladrillos
function createBricks() {
  const gameArea = document.getElementById("bricks");
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "pink",
  ];
  const numRows = 8;
  const numBricksPerRow = 9;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 5;
  const offsetTop = 30;
  const offsetLeft = 30;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numBricksPerRow; col++) {
      const brick = document.createElement("div");
      brick.id = `brick-${row}-${col}`;
      brick.classList.add("brick");
      brick.style.backgroundColor = colors[row];
      let brickX = col * (brickWidth + brickPadding) + offsetLeft;
      let brickY = row * (brickHeight + brickPadding) + offsetTop;
      brick.style.left = `${brickX}px`;
      brick.style.top = `${brickY}px`;
      gameArea.appendChild(brick);
    }
  }
}

// Detectar colisión
function detectCollision(ball, target) {
  const ballRect = ball.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return (
    ballRect.left < targetRect.right &&
    ballRect.right > targetRect.left &&
    ballRect.top < targetRect.bottom &&
    ballRect.bottom > targetRect.top
  );
}
