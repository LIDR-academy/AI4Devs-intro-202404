const scoreDisplay = document.getElementById("scoreDisplay");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const button = document.getElementById("restartButton");
const gameArea = document.getElementById("bricks");
const gameContainer = document.getElementById("gameArea");

// Variables globales
let gameStarted = false;
let xVelocity = 2;
let yVelocity = -2;
let score = 0;
document.addEventListener("DOMContentLoaded", initGame);

// Inicializar el juego
function initGame() {
  setupEventListeners();
  createBricks();
  setupPaddleAndBall(); // Posicionar y mostrar la pelota desde el inicio
  displayScores();
}

// Configurar la paleta y la bola
function setupPaddleAndBall() {
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
  if (!gameStarted) {
    gameStarted = true;
    score = 0; // Restablecer la puntuación a 0 al comenzar el juego
    updateScoreDisplay(); // Actualizar el display de la puntuación
    xVelocity = 0; // Sin movimiento horizontal inicial
    yVelocity = -4; // Comenzar el movimiento hacia arriba
    requestAnimationFrame(moveBall); // Comenzar la animación del juego
  }
}

// Manejar el movimiento de la paleta
function handlePaddleMovement(event) {
  if (!gameStarted) return; // Ignorar los eventos de teclado si el juego no ha empezado

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
  const bricks = document.querySelectorAll(".brick");
  let scoreUpdated = false;

  bricks.forEach((brick) => {
    if (brick.style.display !== "none" && detectCollision(ball, brick)) {
      yVelocity *= -1;
      brick.style.display = "none";
      score += parseInt(brick.dataset.points); // Sumar puntos del ladrillo
      scoreUpdated = true;
    }
  });

  if (scoreUpdated) {
    updateScoreDisplay(); // Actualizar el display de la puntuación
  }
}

// Comprobar colisión con la paleta
function paddleCollisionCheck() {
  if (detectCollision(ball, paddle) && yVelocity > 0) {
    yVelocity = -yVelocity; // Asegurar que el rebote sólo ocurra si la pelota se está moviendo hacia abajo
    // Ajustar la dirección X basada en el punto de impacto
    let paddleCenter = paddle.offsetLeft + paddle.offsetWidth / 2;
    let ballCenter = ball.offsetLeft + ball.offsetWidth / 2;
    xVelocity += 0.1 * (ballCenter - paddleCenter);
  }
}

function hideRestartButton() {
  if (button) {
    button.remove();
  }
}

function restartGame() {
  hideRestartButton(); // Ocultar el botón de reinicio
  gameStarted = false; // Marcar que el juego no ha comenzado
  score = 0; // Restablecer la puntuación a 0
  updateScoreDisplay(); // Actualizar el display de la puntuación
  clearBricks(); // Limpiar los ladrillos existentes
  createBricks(); // Crear ladrillos de nuevo
  setupPaddleAndBall(); // Reposicionar la paleta y la pelota
  resetBallAndPaddle(); // Resetear posiciones de la pelota y la paleta
  prepareForStart(); // Preparar el juego para que espere a que se presione 'Enter'
}

function resetBallAndPaddle() {
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
  const button = document.createElement("button");
  button.textContent = "Volver a jugar";
  button.id = "restartButton";
  button.onclick = restartGame;
  gameContainer.appendChild(button);
}

function updateScoreDisplay() {
  if (!scoreDisplay) {
    console.error("Score display element is missing!");
    return;
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

// Fin del juego
function endGame() {
  alert("Game Over! You lost the ball.");
  showRestartButton(); // Mostrar el botón de reinicio
  let initials = prompt("Enter your initials (3 letters):", "");
  if (initials && initials.length === 3) {
    saveScore(initials, score);
  } else {
    alert("Invalid initials. Please enter exactly 3 letters.");
  }
}

function saveScore(initials, newScore) {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let existingEntry = scores.find((s) => s.initials === initials);

  if (existingEntry) {
    // Si las iniciales ya existen, actualizar solo si la nueva puntuación es mayor
    if (newScore > existingEntry.score) {
      existingEntry.score = newScore; // Actualizar la puntuación
    }
  } else {
    // Si no existen las iniciales, agregar nueva entrada
    scores.push({ initials, score: newScore });
  }

  // Ordenar y guardar las puntuaciones
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(scores));
  displayScores(); // Actualizar la lista de puntuaciones cada vez que se guarda una nueva
}

function displayScores() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let scoreList = document.getElementById("scoreList");
  if (!scoreList) {
    console.error("Score list element is missing!");
    return;
  }

  // Ordenar puntuaciones de mayor a menor
  scores.sort((a, b) => b.score - a.score);

  // Limpiar la lista existente antes de agregar nuevas entradas
  scoreList.innerHTML = "";

  // Tomar solo los 10 mejores resultados
  scores.slice(0, 10).forEach((s) => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.textContent = s.initials;
    let scoreCell = document.createElement("td");
    scoreCell.textContent = s.score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    scoreList.appendChild(row);
  });
}

// Crear ladrillos
function createBricks() {
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
      brick.dataset.points = (numRows - row) * 10; // Asignar puntos de manera ascendente desde la parte superior
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
