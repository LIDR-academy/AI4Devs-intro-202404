// Constantes y variables globales
const BOARD_SIZES = [8, 12, 16]; // Tamaños de tablero disponibles
const MINE_COUNTS = [10, 30, 60]; // Número de minas por nivel de dificultad
let BOARD_SIZE; // Tamaño del tablero actual
let NUM_MINES; // Número de minas actual
let board = []; // Matriz para representar el tablero
let isGameOver = false; // Bandera para indicar si el juego ha terminado
let flaggedCells = 0; // Contador de celdas marcadas con bandera
let remainingCells; // Contador de celdas restantes por revelar
let startTime; // Tiempo de inicio del juego
let highScores = []; // Arreglo para almacenar los puntajes más altos

// Función para iniciar un nuevo juego
function startGame(level) {
    BOARD_SIZE = BOARD_SIZES[level];
    NUM_MINES = MINE_COUNTS[level];
    isGameOver = false;
    flaggedCells = 0;
    remainingCells = BOARD_SIZE * BOARD_SIZE - NUM_MINES;
    startTime = null;
    createBoard();
    placeMines();
    renderBoard();
    addCellEventListeners();
    resetGameInfo();
}

// Función para reiniciar la información del juego
function resetGameInfo() {
    const gameInfoElement = document.getElementById('game-info');
    gameInfoElement.innerHTML = `
        <div>Minas restantes: ${NUM_MINES - flaggedCells}</div>
        <div>Tiempo: 0</div>
    `;
}

// Función para crear el tablero
function createBoard() {
    board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = new Array(BOARD_SIZE).fill(0);
    }
}

// Función para colocar las minas
function placeMines() {
    let minesToPlace = NUM_MINES;
    while (minesToPlace > 0) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        if (board[row][col] !== 'X') {
            board[row][col] = 'X';
            minesToPlace--;
        }
    }
}

// Función para renderizar el tablero en el DOM
function renderBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    let gameBoardClass = document.querySelector('.game-board');
    // Modificar la propiedad grid-template-columns
    gameBoardClass.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, minmax(30px, 0fr))`;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            boardElement.appendChild(cell);
        }
    }
}

// Función para agregar controladores de eventos a las celdas
function addCellEventListeners() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('contextmenu', handleRightClick);
    }
}

// Función para manejar los clics izquierdos en las celdas
function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Verificar si el juego ha comenzado
    startTimer();


    // Verificar si la celda contiene una mina
    if (board[row][col] === 'X') {
        revealMines(); // Revelar todas las minas
        isGameOver = true; // Terminar el juego
        alert('Game Over!');
    } else {
        revealCell(row, col); // Revelar la celda
        // Verificar si se ha ganado el juego
        checkWin();

    }
}

// Función para verificar si se ha ganado el juego
function checkWin() {
    const allMinesMarked = Array.from(document.querySelectorAll('.cell.flagged')).length === NUM_MINES;
    const allCellsRevealed = Array.from(document.querySelectorAll('.cell:not(.flagged):not(.revealed)')).length === 0;

    if (allMinesMarked) {
        handleWin();
    }
}

// Función para manejar la victoria
function handleWin() {
    isGameOver = true;
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let msg = `${NUM_MINES} minas en ${elapsedTime}`;
    saveHighScore(msg);
    renderHighScores();
    alert(`¡Felicitaciones! Has encontrado ${NUM_MINES} minas en ${elapsedTime} segundos.`);
}

// Función para revelar una celda
function revealCell(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (!cell.classList.contains('revealed')) {
        const minesAround = countMinesAround(row, col);
        cell.innerHTML = minesAround === 0 ? '' : minesAround;
        cell.classList.remove('flagged');
        cell.classList.add('revealed');
        remainingCells--;
        // Si la celda no tiene minas alrededor, revelar las celdas vecinas
        if (minesAround === 0) {
            revealNeighbors(row, col);
        }
    }
}

// Función para revelar las celdas vecinas de forma recursiva
function revealNeighbors(row, col) {
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE) {
                const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
                if (!cell.classList.contains('revealed')) {
                    revealCell(i, j);
                }
            }
        }
    }
}

// Función para contar las minas alrededor de una celda
function countMinesAround(row, col) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && board[i][j] === 'X') {
                count++;
            }
        }
    }
    return count;
}

// Función para revelar todas las minas
function revealMines() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (board[row][col] === 'X') {
            cell.innerHTML = '💣';
            cell.classList.add('mine');
        }
    }
}

// Función para manejar los clics derechos en las celdas
function handleRightClick(event) {
    event.preventDefault(); // Prevenir el menú contextual del navegador
    // Verificar si el juego ha comenzado
    startTimer();
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (!cell.classList.contains('revealed')) {
        if (!cell.classList.contains('flagged')) {
            cell.classList.add('flagged');
            cell.innerHTML = '🚩';
            flaggedCells++;
            remainingCells--;
        } else {
            cell.classList.remove('flagged');
            cell.innerHTML = '';
            flaggedCells--;
            remainingCells++;
        }

        // Actualizar el contador de minas restantes
        const gameInfoElement = document.getElementById('game-info');
        const minesRemainingElement = gameInfoElement.querySelector('div:first-child');
        minesRemainingElement.textContent = `Minas restantes: ${NUM_MINES - flaggedCells}`;
        // Verificar si se ha ganado el juego
        checkWin();
    }
}



// Función para guardar el puntaje más alto
function saveHighScore(time) {
   highScores.push(time);
   highScores.sort((a, b) => a - b);
   highScores = highScores.slice(0, 5); // Mantener solo los 5 mejores puntajes
   localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Función para renderizar los puntajes más altos
function renderHighScores() {
   const highScoresElement = document.getElementById('high-scores');
   highScoresElement.innerHTML = '';
    highScoresElement.innerHTML += '<ol class="list-group">';
   for (let score of highScores) {
       highScoresElement.innerHTML += `<li class="list-group-item">${score} segundos</li>`;
   }
   highScoresElement.innerHTML += '</ol>';
}

// Función para iniciar el cronómetro
function startTimer() {
    if (startTime) {
        return;
    }
    startTime = Date.now();
    const gameInfoElement = document.getElementById('game-info');
    const timerElement = gameInfoElement.querySelector('div:last-child');

    function updateTimer() {
        if (!isGameOver) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerElement.textContent = `Tiempo: ${elapsedTime}`;
            requestAnimationFrame(updateTimer);
        }
    }

    updateTimer();
}

// Agregar eventos de clic para los botones de nivel de dificultad
const difficultyButtons = document.querySelectorAll('.difficulty-button');
for (let i = 0; i < difficultyButtons.length; i++) {
   difficultyButtons[i].addEventListener('click', () => startGame(i));
}

// Cargar los puntajes más altos guardados (si existen)
const savedHighScores = localStorage.getItem('highScores');
if (savedHighScores) {
   highScores = JSON.parse(savedHighScores);
}
renderHighScores();
