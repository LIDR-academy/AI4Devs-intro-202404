let knightPosition; // Global para rastrear la posición del caballo
let timerInterval = null;
let knightSquare; // Vamos a mantener una referencia al elemento del caballo actual
let queenPosition; // Rastrear la posición de la reina
let moveCount = 0; // Rastrear la cantidad de movimientos del caballo

function isValidQueenPosition(possibleIndex) {
  // Asegurarse de que la reina no esté en los movimientos posibles del caballo
  return !knightMoves.some((move) => {
    const knightPos = getBoardCoordinates(knightPosition);
    const newX = knightPos.x + move.x;
    const newY = knightPos.y + move.y;
    return possibleIndex === getIndexFromCoordinates(newX, newY);
  });
}

document.querySelectorAll(".back-button").forEach((button) => {
  button.addEventListener("click", function () {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("high-scores").style.display = "none";
    document.getElementById("credits").style.display = "none";
  });
});

document.getElementById("play-button").addEventListener("click", function () {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("game-container").parentNode.style.display = "block";
});

document
  .getElementById("high-scores-button")
  .addEventListener("click", function () {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("high-scores").style.display = "block";
    displayHighScores(); // Función que mostrará los puntajes
  });

document
  .getElementById("credits-button")
  .addEventListener("click", function () {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("credits").style.display = "block";
  });

function initializeChessboard() {
  const board = document.getElementById("chessboard");
  board.innerHTML = ""; // Clear the board
  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    square.className = `chess-square chess-square-${
      (Math.floor(i / 8) + i) % 2 == 0 ? "white" : "black"
    }`;
    board.appendChild(square);
  }
}

function placePieces() {
  const squares = document.querySelectorAll(".chess-square");
  squares.forEach((square) => {
    square.textContent = ""; // Limpiamos el tablero
    square.classList.remove("knight-position", "knight-move");
  });

  queenPosition = Math.floor(Math.random() * 64);
  do {
    knightPosition = Math.floor(Math.random() * 64);
  } while (
    queenPosition === knightPosition ||
    !isValidQueenPosition(queenPosition)
  );

  knightSquare = squares[knightPosition];
  const queenSquare = squares[queenPosition];

  knightSquare.textContent = "♞"; // Emoji del caballo
  queenSquare.textContent = "♕"; // Emoji de la reina

  highlightKnightMoves(); // Resaltar los movimientos iniciales
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  let startTime = Date.now();
  timerInterval = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    // Añade un cero a la izquierda si los números son menores de 10 (excepto para los milisegundos)
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    timerElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
  }, 10); // Actualizamos el temporizador cada 10 milisegundos
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Aseguramos reiniciar los eventos cuando iniciamos un nuevo juego
document
  .getElementById("new-game-button")
  .addEventListener("click", function () {
    restartGame();
  });

function restartGame() {
  stopTimer();
  initializeChessboard(); // Re-crear el tablero para eliminar los event listeners anteriores
  placePieces();
  startTimer();
}

document.addEventListener("DOMContentLoaded", function () {
  restartGame();
});

// Definimos las direcciones de movimiento de un caballo en el ajedrez
const knightMoves = [
  { x: -2, y: 1 },
  { x: -1, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 2, y: -1 },
  { x: 1, y: -2 },
  { x: -1, y: -2 },
  { x: -2, y: -1 },
];

function getBoardCoordinates(index) {
  return { x: index % 8, y: Math.floor(index / 8) };
}

function getIndexFromCoordinates(x, y) {
  return y * 8 + x;
}

function highlightKnightMoves() {
  // Limpiamos todas las casillas resaltadas y eliminamos eventos antiguos
  document.querySelectorAll(".chess-square").forEach((square) => {
    square.classList.remove("knight-position", "knight-move");
    square.onclick = null;
  });

  const knightPos = getBoardCoordinates(knightPosition);
  knightSquare = document.querySelectorAll(".chess-square")[knightPosition];
  knightSquare.classList.add("knight-position");

  knightMoves.forEach((move) => {
    let newX = knightPos.x + move.x;
    let newY = knightPos.y + move.y;
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      let newIndex = getIndexFromCoordinates(newX, newY);
      let moveSquare = document.querySelectorAll(".chess-square")[newIndex];
      moveSquare.classList.add("knight-move");

      // Actualizar el manejador de eventos para usar el nuevo índice
      moveSquare.onclick = () => moveKnight(newIndex);
    }
  });
}

function moveKnight(toIndex) {
  const fromSquare = knightSquare;
  const toSquare = document.querySelectorAll(".chess-square")[toIndex];
  // Incrementar el contador de movimientos si no se ha ganado todavía
  moveCount++;
  // Comprobar si el caballo ha alcanzado la reina
  if (toIndex === queenPosition) {
    stopTimer(); // Detener el cronómetro
    showVictoryMessage();
  } else {
    // Animar el caballo
    toSquare.classList.add("animate-knight");
    toSquare.textContent = fromSquare.textContent; // Mover el emoji del caballo
    fromSquare.textContent = ""; // Quitar el emoji de la casilla anterior
    fromSquare.classList.remove("knight-position"); // Quitar la clase de posición del caballo

    // Esperar que la animación termine antes de resaltar los nuevos movimientos
    setTimeout(() => {
      toSquare.classList.remove("animate-knight");
      highlightKnightMoves((knightPosition = toIndex)); // Actualizar la posición y resaltar los nuevos movimientos
    }, 300); // Corresponde al tiempo de la animación
  }
}

function showVictoryMessage() {
  const timerElement = document.getElementById("timer");
  const [minutes, seconds, millis] = timerElement.textContent
    .split(":")
    .map((num) => parseInt(num, 10));
  const totalTimeInMillis = minutes * 60000 + seconds * 1000 + millis;
  const score = Math.round(totalTimeInMillis / moveCount); // Puntaje basado en tiempo total en milisegundos por movimiento

  document.getElementById(
    "victory-details"
  ).textContent = `Lo hiciste en ${timerElement.textContent}, con ${moveCount} movimientos. Tu puntaje es ${score}.`;

  // Lógica para manejar el almacenamiento del puntaje
  handleScoreStorage(score, moveCount, timerElement.textContent);

  document.getElementById("victory-message").style.display = "block";
}

function handleScoreStorage(score, moves, time) {
  let scores = JSON.parse(localStorage.getItem("queenHunterScores")) || [];

  let newScore = { score, moves, time, name: "" }; // Creamos el objeto de puntaje nuevo sin nombre aún

  // Insertar el nuevo puntaje en la posición correcta
  scores.push(newScore);
  scores.sort((a, b) => a.score - b.score); // Ordenamos los puntajes (menor es mejor)

  // Si hay más de 5 puntajes, removemos el más alto (peor)
  if (scores.length > 5) {
    scores = scores.slice(0, 5);
  }

  // Solicitar nombre del jugador si es uno de los 5 mejores puntajes
  if (scores.includes(newScore)) {
    const playerName = prompt(
      "¡Has obtenido uno de los 5 mejores puntajes! Por favor, ingresa tu nombre:"
    );
    newScore.name = playerName;
  }

  localStorage.setItem("queenHunterScores", JSON.stringify(scores)); // Almacenar los puntajes actualizados

  // Actualizar mensaje de victoria con la posición del jugador
  const position = scores.findIndex((s) => s === newScore) + 1; // Encontrar la posición del nuevo puntaje
  document.getElementById(
    "victory-details"
  ).textContent += ` Estás en la posición ${position} de la tabla de líderes.`;
}

// Reiniciar juego con el botón 'Jugar de Nuevo'
document
  .getElementById("play-again-button")
  .addEventListener("click", function () {
    document.getElementById("victory-message").style.display = "none";
    document.getElementById("game-container").parentNode.style.display = "block";
    moveCount = 0; // Reiniciar contador de movimientos
    initializeChessboard(); // Re-crear el tablero
    placePieces(); // Colocar las piezas nuevamente
    startTimer(); // Reiniciar el cronómetro
  });

function displayHighScores() {
  const scoresContainer = document.getElementById("scores-container");
  scoresContainer.innerHTML = ""; // Limpiar cualquier contenido anterior
  const scores = JSON.parse(localStorage.getItem("queenHunterScores")) || [];

  if (scores.length === 0) {
    scoresContainer.innerHTML =
      "<p>Aún no existen registros, ve a jugar para imponer tu récord.</p>";
  } else {
    // Crear una tabla para mostrar los puntajes
    const table = document.createElement("table");
    table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Puntaje</th>
                    <th>Tiempo</th>
                    <th>Movimientos</th>
                </tr>
            </thead>
        `;
    const tbody = document.createElement("tbody");

    // Agregar una fila por cada puntaje
    scores.forEach((score) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${score.name || "Anónimo"}</td>
                <td>${score.score}</td>
                <td>${score.time}</td>
                <td>${score.moves}</td>
            `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    scoresContainer.appendChild(table);
  }
}
