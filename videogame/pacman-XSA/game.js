// Definimos las variables para el tablero, Pac-Man y los fantasmas
let board = [];
let pacman = { x: 0, y: 0 }; // Posición inicial de Pac-Man
let ghosts = [];

// Variable para llevar la cuenta del marcador
let score = 0;

// Función para inicializar el tablero del juego
// Inicializamos el tablero con píldoras
function initializeBoard(width, height) {
  // Limpiamos el tablero antes de inicializar
  board = [];
  pills = [];
  score = 0;

  // Creamos un tablero vacío
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(0); // 0 representa una celda vacía
    }
    board.push(row);
  }

  // Colocamos a Pac-Man en su posición inicial
  pacman = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
  board[pacman.y][pacman.x] = 2; // 2 representa a Pac-Man

  // Colocamos a los fantasmas en sus posiciones iniciales
  ghosts.forEach((ghost) => {
    board[ghost.y][ghost.x] = 3; // 3 representa a un fantasma
  });

  // Colocamos píldoras aleatoriamente en el tablero
  for (let i = 0; i < width * height * 0.1; i++) {
    // 10% de las celdas tendrán píldoras
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (board[y][x] === 0) {
      board[y][x] = 4; // 4 representa una píldora
      pills.push({ x, y });
    }
  }

  ghosts = [
    { x: 0, y: 0 },
    { x: width - 1, y: 0 },
    { x: 0, y: height - 1 },
  ];

  // Renderizamos el tablero inicial
  renderBoard();
}

// Función para mostrar el tablero en la página HTML
function renderBoard() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Limpiamos el tablero antes de renderizar

  board.forEach((row) => {
    let rowElement = document.createElement("div");
    rowElement.classList.add("row");

    row.forEach((cell) => {
      let cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      let cellClass = getCellClass(cell);
      if (cellClass) {
        cellElement.classList.add(cellClass);
      }
      rowElement.appendChild(cellElement);
    });

    gameBoard.appendChild(rowElement);
  });
}

// Función auxiliar para obtener la clase CSS de una celda
function getCellClass(cell) {
  switch (cell) {
    case 0:
      return "empty"; // Celda vacía
    case 2:
      return "pacman"; // Pac-Man
    case 3:
      return "ghost"; // Fantasma
    case 4:
      return "pill"; // Píldora
    default:
      return ""; // Devolvemos una cadena vacía por defecto si no hay ninguna clase para la celda
  }
}

// Función para manejar el movimiento de Pac-Man
function movePacman(direction) {
  // Actualizamos la posición de Pac-Man según la dirección
  switch (direction) {
    case "up":
      if (pacman.x > 0 && board[pacman.y][pacman.x - 1] !== 1) {
        board[pacman.y][pacman.x] = 0; // Limpiamos la posición anterior de Pac-Man
        pacman.x--;
      }
      break;
    case "down":
      if (
        pacman.x < board[0].length - 1 &&
        board[pacman.y][pacman.x + 1] !== 1
      ) {
        board[pacman.y][pacman.x] = 0;
        pacman.x++;
      }
      break;
    case "left":
      if (pacman.y > 0 && board[pacman.y - 1][pacman.x] !== 1) {
        board[pacman.y][pacman.x] = 0;
        pacman.y--;
      }
      break;
    case "right":
      if (pacman.y < board.length - 1 && board[pacman.y + 1][pacman.x] !== 1) {
        board[pacman.y][pacman.x] = 0;
        pacman.y++;
      }
      break;
  }

  // Comprobamos si Pac-Man ha comido alguna píldora
  if (board[pacman.y][pacman.x] === 4) {
    // Pac-Man ha comido una píldora
    score++; // Incrementar el marcador
    updateScore(); // Actualizar el marcador en el HTML
    // Aquí puedes agregar lógica para sumar puntos
    // Por ejemplo, puedes aumentar una variable de puntos y actualizar la interfaz de usuario
    // También puedes eliminar la píldora del tablero
    let index = pills.findIndex(
      (pill) => pill.x === pacman.x && pill.y === pacman.y
    );
    if (index !== -1) {
      pills.splice(index, 1); // Eliminamos la píldora del array
    }
  }

  // Actualizamos la posición de Pac-Man en el tablero
  board[pacman.y][pacman.x] = 2;

  // Verificamos si Pac-Man ha chocado con un fantasma
  if (board[pacman.y][pacman.x] === 3) {
    console.log("Pac-Man ha chocado con un fantasma");
    // Si Pac-Man toca un fantasma, mostramos un mensaje de pérdida y preguntamos al jugador si desea reiniciar
    let restart = confirm(
      "¡Oh no! ¡Has perdido! ¿Quieres intentarlo de nuevo?"
    );
    console.log("Confirm mostrado");
    if (restart) {
      console.log("Reinicio solicitado");
      // Si el jugador elige reiniciar, llamamos a la función para reiniciar el juego
      restartGame();
    }
  }

  // Verificamos si todas las píldoras han sido consumidas
  if (pills.length === 0) {
    // Si no quedan píldoras, mostramos un mensaje de victoria y preguntamos al jugador si desea reiniciar
    let restart = confirm(
      "¡Felicidades! ¡Has ganado el juego! ¿Quieres empezar de nuevo?"
    );
    if (restart) {
      // Si el jugador elige reiniciar, llamamos a la función para reiniciar el juego
      restartGame();
    }
  }

  // Renderizamos el tablero actualizado
  renderBoard();
}

// Función para manejar los eventos de teclado
document.addEventListener("keydown", (event) => {
  let direction = null;

  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }

  if (direction !== null) {
    movePacman(direction);
  }
});

// Función para calcular la dirección en la que mover el fantasma para seguir a Pac-Man
function calculateDirectionToPacman(ghost) {
  // Calculamos la distancia horizontal y vertical entre el fantasma y Pac-Man
  let dx = pacman.x - ghost.x;
  let dy = pacman.y - ghost.y;

  // Elegimos la dirección para minimizar la distancia horizontal o vertical
  if (Math.abs(dx) > Math.abs(dy)) {
    // Movimiento horizontal
    return dx > 0 ? "right" : "left";
  } else {
    // Movimiento vertical
    return dy > 0 ? "down" : "up";
  }
}

// Función para calcular la dirección en la que mover el fantasma para seguir a un objetivo
function calculateDirectionToTarget(ghost, target) {
  // Calculamos la distancia horizontal y vertical entre el fantasma y el objetivo
  let dx = target.x - ghost.x;
  let dy = target.y - ghost.y;

  // Elegimos la dirección para minimizar la distancia horizontal o vertical
  if (Math.abs(dx) > Math.abs(dy)) {
    // Movimiento horizontal
    return dx > 0 ? "right" : "left";
  } else {
    // Movimiento vertical
    return dy > 0 ? "down" : "up";
  }
}

// Función para mover los fantasmas
function moveGhosts() {
  ghosts.forEach((ghost) => {
    // Calculamos la dirección para seguir a Pac-Man
    let direction = calculateDirectionToTarget(ghost, pacman);

    // Movemos el fantasma en la dirección calculada
    switch (direction) {
      case "up":
        if (
          ghost.y > 0 &&
          board[ghost.y - 1][ghost.x] !== 1 &&
          !isGhostAtPosition(ghost.x, ghost.y - 1)
        ) {
          board[ghost.y][ghost.x] = 0; // Limpiamos la posición anterior del fantasma
          ghost.y--;
        }
        break;
      case "down":
        if (
          ghost.y < board.length - 1 &&
          board[ghost.y + 1][ghost.x] !== 1 &&
          !isGhostAtPosition(ghost.x, ghost.y + 1)
        ) {
          board[ghost.y][ghost.x] = 0;
          ghost.y++;
        }
        break;
      case "left":
        if (
          ghost.x > 0 &&
          board[ghost.y][ghost.x - 1] !== 1 &&
          !isGhostAtPosition(ghost.x - 1, ghost.y)
        ) {
          board[ghost.y][ghost.x] = 0;
          ghost.x--;
        }
        break;
      case "right":
        if (
          ghost.x < board[0].length - 1 &&
          board[ghost.y][ghost.x + 1] !== 1 &&
          !isGhostAtPosition(ghost.x + 1, ghost.y)
        ) {
          board[ghost.y][ghost.x] = 0;
          ghost.x++;
        }
        break;
    }

    // Actualizamos la posición del fantasma en el tablero
    board[ghost.y][ghost.x] = 3;

    // Verificamos si el fantasma ha alcanzado la posición de Pac-Man
    if (ghost.x === pacman.x && ghost.y === pacman.y) {
      // Si el fantasma alcanza la posición de Pac-Man, mostramos un mensaje de pérdida y finalizamos el juego
      alert("¡Oh no! ¡Has perdido! Un fantasma te ha atrapado.");
      restartGame(); // Función para finalizar el juego
    }
  });

  // Renderizamos el tablero actualizado
  renderBoard();
}

// Función para verificar si hay un fantasma en la posición dada
function isGhostAtPosition(x, y) {
  return ghosts.some((ghost) => ghost.x === x && ghost.y === y);
}

// Función para calcular la dirección en la que mover el fantasma
function calculateDirection(ghost) {
  // Aquí puedes implementar la lógica para calcular la dirección en la que mover el fantasma
  // Por ejemplo, podrías hacer que los fantasmas persigan a Pac-Man o sigan un patrón predefinido
  // En este ejemplo, simplemente se mueven en la misma dirección que Pac-Man
  return "right"; // En este caso, el fantasma se mueve hacia la derecha
}

// Función para actualizar el marcador
function updateScore() {
  // Actualizamos el marcador en el HTML
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.textContent = "Score: " + score;
}

function resetScore() {
  // Actualizamos el marcador en el HTML
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.textContent = "Score: " + score;
}

// Función para reiniciar el juego
function restartGame() {
  // Aquí puedes agregar la lógica para restablecer el estado inicial del juego
  // Por ejemplo, puedes reiniciar la posición de Pac-Man, los fantasmas y las píldoras

  score = 0;
  resetScore();
  initializeBoard(10, 10); // Aquí se reinicializa el tablero, ajusta los parámetros según tu implementación
}

// Llamamos a la función para mover los fantasmas en intervalos de tiempo
setInterval(moveGhosts, 500); // Cambia el valor para ajustar la velocidad de movimiento de los fantasmas

// Llamamos a las funciones de inicialización y renderizado cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  let width = 10;
  let height = 10;

  initializeBoard(10, 10); // Anchura y altura del tablero
  renderBoard();
  updateScore();
});
