// Game Constants
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;

// Game Variables
let board;
let currentPiece;
let currentPosition;
let score;
let level;
let isGameOver;
let intervalId; // Variable to store the interval ID
let isPaused = false;

// Tetromino Shapes
const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
];

// Initialize the game
function init() {
    board = createBoard();
    currentPiece = getRandomPiece();
    currentPosition = { row: 0, col: Math.floor(COLS / 2) - 1 };
    score = 0;
    level = 1;
    isGameOver = false;
    drawBoard();
    drawPiece();
    startGame();
    drawScore(); // Draw the initial score
    displayMessage('Use arrow keys to move and rotate. Press Space to pause/resume.');
}

// Create the game board
function createBoard() {
    const board = [];
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
        }
    }
    return board;
}

// Get a random tetromino shape
function getRandomPiece() {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}

// Draw the game board
function drawBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'game-piece';
            cellElement.style.left = `${col * BLOCK_SIZE}px`;
            cellElement.style.top = `${row * BLOCK_SIZE}px`;
            if (board[row][col]) {
                cellElement.style.backgroundColor = 'red';
            }
            boardElement.appendChild(cellElement);
        }
    }
}

// Draw the current tetromino piece
function drawPiece() {
    const boardElement = document.getElementById('game-board');

    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col]) {
                const cellElement = document.createElement('div');
                cellElement.className = 'game-piece';
                cellElement.style.left = `${(currentPosition.col + col) * BLOCK_SIZE}px`;
                cellElement.style.top = `${(currentPosition.row + row) * BLOCK_SIZE}px`;
                cellElement.style.backgroundColor = 'blue';
                boardElement.appendChild(cellElement);
            }
        }
    }
}

// Handle arrow key events
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case 'Space':
            togglePause();
            break;
    }
});

document.addEventListener('keydown', (event) => {
    if (isGameOver && event.code === 'Enter') {
        restartGame();
    }
});

// Move the piece left
function moveLeft() {
    const newPosition = { row: currentPosition.row, col: currentPosition.col - 1 };
    if (isPossibleMove(newPosition)) {
        currentPosition = newPosition;
        drawBoard();
        drawPiece();
    }
}

// Move the piece right
function moveRight() {
    const newPosition = { row: currentPosition.row, col: currentPosition.col + 1 };
    if (isPossibleMove(newPosition)) {
        currentPosition = newPosition;
        drawBoard();
        drawPiece();
    }
}

// Move the piece down
function moveDown() {
    const newPosition = { row: currentPosition.row + 1, col: currentPosition.col };
    if (isPossibleMove(newPosition)) {
        currentPosition = newPosition;
        drawBoard();
        drawPiece();
    } else {
        // Piece has landed, lock it in place and get a new piece
        lockPiece();
        currentPiece = getRandomPiece();
        currentPosition = { row: 0, col: Math.floor(COLS / 2) - 1 };
        if (!isPossibleMove(currentPosition)) {
            isGameOver = true;
            clearInterval(intervalId); // Stop the game loop
            alert('Game Over!');
        }
    }
    if (!isPossibleMove(currentPosition)) {
        isGameOver = true;
        clearInterval(intervalId);
        displayMessage('Game Over! Press Enter to restart.');
    }
}

// Check if a move is possible
function isPossibleMove(position, piece = currentPiece) {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col]) {
                const newRow = position.row + row;
                const newCol = position.col + col;

                if (
                    newRow < 0 ||
                    newRow >= ROWS ||
                    newCol < 0 ||
                    newCol >= COLS ||
                    board[newRow][newCol]
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Lock the current piece in place
function lockPiece() {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col]) {
                board[currentPosition.row + row][currentPosition.col + col] = currentPiece[row][col];
            }
        }
    }
    clearLines();
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        let isLineComplete = true;
        for (let col = 0; col < COLS; col++) {
            if (!board[row][col]) {
                isLineComplete = false;
                break;
            }
        }
        if (isLineComplete) {
            linesCleared++;
            for (let r = row; r > 0; r--) {
                for (let c = 0; c < COLS; c++) {
                    board[r][c] = board[r - 1][c];
                }
            }
            row++;
        }
    }
    updateScore(linesCleared);
}

// Rotate the piece
function rotatePiece() {
    const newPiece = [];
    for (let row = 0; row < currentPiece.length; row++) {
        newPiece[row] = [];
    }

    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            newPiece[col][currentPiece.length - 1 - row] = currentPiece[row][col];
        }
    }

    const newPosition = { row: currentPosition.row, col: currentPosition.col };
    if (isPossibleMove({ row: currentPosition.row, col: currentPosition.col }, newPiece)) {
        currentPiece = newPiece;
        drawBoard();
        drawPiece();
    }
}

// Start the game
init();

function startGame() {
    intervalId = setInterval(moveDown, 1000); // Call moveDown every 1 second
}


function drawScore() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateScore(linesCleared) {
    const scorePerLine = [0, 40, 100, 300, 1200]; // Score values for 0, 1, 2, 3, and 4 lines cleared

    if (linesCleared > 0) {
        let lineScore = scorePerLine[linesCleared] * (level + 1);
        score += lineScore;

        // Check if the player has reached the next level
        if (score >= (level * LINES_PER_LEVEL * 100)) {
            level++;
        }
    }

    drawScore();
}

function togglePause() {
    if (isPaused) {
        resume();
    } else {
        pause();
    }
}

function pause() {
    clearInterval(intervalId);
    isPaused = true;
    displayMessage('Paused');
}

function resume() {
    intervalId = setInterval(moveDown, 1000);
    isPaused = false;
    displayMessage(''); // Clear the message display
}

function restartGame() {
    init();
    startGame();
}

// Display a message
function displayMessage(message) {
    const messageDisplay = document.getElementById('message-display');
    messageDisplay.textContent = message;
}