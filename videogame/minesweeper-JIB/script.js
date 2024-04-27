// Variables globales para el contador de banderas y el estado del juego
let flagsLeft;
let currentLevel = { width: 10, height: 10, flags: 10 }; // Nivel por defecto
let minePositions = []; // Array para guardar las posiciones de las minas
let gameBoard;

// Función para crear el tablero
function createBoard(width, height) {
    gameBoard.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    minePositions = placeMines(width, height, currentLevel.flags);

    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        // Agregar manejadores para clic y doble clic
        addEventHandlers(cell);

        gameBoard.appendChild(cell);
    }
}

function addEventHandlers(cell) {
    // Manejar clic para revelar celda
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('flagged')) { // Solo permitir clic si no está marcada con flag
            cellClickHandler(cell);
        }
    });

    // Manejar clic derecho para colocar/quitar flags
    cell.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Evitar que aparezca el menú contextual del navegador
        toggleFlag(cell);
    });

    // Manejar doble clic para quitar flags
    cell.addEventListener('dblclick', () => {
        if (cell.classList.contains('flagged')) {
            toggleFlag(cell);
        }
    });
}

// Función para colocar las minas de forma aleatoria
function placeMines(width, height, mines) {
  const positions = new Array(width * height).fill(0).map((_, index) => index);
  const minePositions = [];

  while (minePositions.length < mines) {
    const mineIndex = positions.splice(Math.floor(Math.random() * positions.length), 1)[0];
    minePositions.push(mineIndex);
  }

  return minePositions;
}

// Función para revelar la celda
function revealCell(cell) {
  const index = parseInt(cell.dataset.index);

  if (minePositions.includes(index)) {
    cell.classList.add('mine');
    gameOver();
  } else {
    cell.classList.add('revealed');
    const minesAround = calculateMinesAround(index);
    if (minesAround > 0) {
      cell.textContent = minesAround;
    } else {
      // Revela las celdas adyacentes si no hay minas alrededor
      revealAdjacentCells(index);
    }
  }
  checkWinCondition();
}

// Función para marcar la celda con una bandera
function toggleFlag(cell) {
    if (cell.classList.contains('flagged')) {
        cell.classList.remove('flagged'); // Remover flag
        cell.classList.remove('no-interact'); // Permitir interacciones nuevamente
        flagsLeft++; // Incrementar cuando se quita una bandera
    } else if (!cell.classList.contains('revealed')) { // Solo añadir flags a celdas no reveladas
        cell.classList.add('flagged'); // Añadir flag
        cell.classList.add('no-interact'); // Desactivar otras interacciones
        flagsLeft--; // Disminuir cuando se añade una bandera
    }
    document.getElementById('flags-left').textContent = flagsLeft;

    // Si se ha colocado una bandera, verifica la condición de victoria
    if (cell.classList.contains('flagged')) {
        checkWinCondition();
    }
}

function cellClickHandler(cell) {
    // Este controlador ya no necesita comprobar por 'no-interact' porque
    // el manejo de flags se realiza en el evento 'contextmenu'
    if (minePositions.includes(parseInt(cell.dataset.index))) {
        cell.classList.add('mine');
        gameOver();
    } else if (!cell.classList.contains('flagged')) {
        revealCell(cell);
    }
}

// Calcula cuántas minas hay alrededor de una celda
function calculateMinesAround(index) {
  const adjacentIndexes = getAdjacentIndexes(index);
  return adjacentIndexes.reduce((count, idx) => {
    return count + (minePositions.includes(idx) ? 1 : 0);
  }, 0);
}

// Obtiene los índices de las celdas adyacentes
function getAdjacentIndexes(index) {
  const adjacent = [];
  const width = currentLevel.width;

  // Determinar las posiciones adyacentes permitidas
  const positions = [
    index - width - 1, index - width, index - width + 1,
    index - 1, index + 1,
    index + width - 1, index + width, index + width + 1
  ];

  positions.forEach(pos => {
    if (pos >= 0 && pos < width * currentLevel.height) {
      if (!(index % width === 0 && pos % width === width - 1) &&
          !(index % width === width - 1 && pos % width === 0)) {
        adjacent.push(pos);
      }
    }
  });

  return adjacent;
}

// Revela las celdas adyacentes si no tienen minas alrededor
function revealAdjacentCells(index) {
  const adjacentIndexes = getAdjacentIndexes(index);
  adjacentIndexes.forEach(idx => {
    const adjacentCell = gameBoard.children[idx];
    if (!adjacentCell.classList.contains('revealed')) {
      revealCell(adjacentCell);
    }
  });
}

// Función para manejar el fin del juego
function gameOver() {
    minePositions.forEach((mineIndex) => {
        const mineCell = gameBoard.children[mineIndex];
        mineCell.classList.add('mine');
        mineCell.textContent = '💣'; // Agregar un símbolo de bomba para visualizar la mina
    });
    gameBoard.classList.add('disabled'); // Deshabilitar más interacciones
    console.log('Game Over!'); // Usar console.log en lugar de alert para evitar bloqueos en el flujo del juego
}

// Función para inicializar un nuevo juego
function initializeGame(width, height, levelName) {
    gameBoard.classList.remove('disabled'); // Habilitar interacción

    currentLevel.width = width;
    currentLevel.height = height;
    if (levelName === 'Low') {
        currentLevel.flags = 10;
    } else if (levelName === 'Medium') {
        currentLevel.flags = 40;
    } else if (levelName === 'High') {
        currentLevel.flags = 90;
    }

  // Reiniciar el contador de banderas
  flagsLeft = currentLevel.flags;
  document.getElementById('flags-left').textContent = flagsLeft;

  // Reiniciar y crear un nuevo tablero con los nuevos parámetros
  minePositions = [];
  gameBoard.innerHTML = '';
  createBoard(currentLevel.width, currentLevel.height);
}


// Event listener para cuando se carga el DOM


document.addEventListener('DOMContentLoaded', () => {

    gameBoard = document.getElementById('game-board'); // Asegúrate de que este ID exista en tu HTML
    const restartBtn = document.getElementById('restart-button');
    restartBtn.addEventListener('click', () => initializeGame(currentLevel.width, currentLevel.height, 'Low'));
    initializeGame(currentLevel.width, currentLevel.height, 'Low'); // Inicia con configuración predeterminada al cargar

});

function checkWinCondition() {
    // Asumiendo que 'flagsLeft' se decrementa correctamente y 'minePositions' tiene las posiciones de las minas
    let minesFlaggedCorrectly = minePositions.every(index => {
        return gameBoard.children[index].classList.contains('flagged');
    });

    let nonMinesRevealed = Array.from(gameBoard.children).every((cell, index) => {
        return minePositions.includes(index) || cell.classList.contains('revealed');
    });

    // Si todas las minas están marcadas con banderas y todas las no-minas están reveladas
    if (minesFlaggedCorrectly && nonMinesRevealed) {
        setTimeout(() => alert('¡Has ganado!'), 100); // Retraso para permitir que la UI se actualice
    }
}

function showAlert(message) {
    // Puedes personalizar esto para cambiar cómo se muestra el mensaje
    alert(message);
}
