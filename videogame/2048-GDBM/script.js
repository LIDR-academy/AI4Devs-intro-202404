const gridContainer = document.querySelector('.container');
    let board = [];
    for (let i = 0; i < 4; i++) {
        board.push([0, 0, 0, 0]);
    }
    let score = 0;

    function getColorForNumber(number) {
        switch (number) {
            case 2:
                return '#eee4da'; // Color para el número 2
            case 4:
                return '#ede0c8'; // Color para el número 4
            case 8:
                return '#f2b179'; // Color para el número 8
            case 16:
                return '#f59563'; // Color para el número 16
            case 32:
                return '#f67c5f'; // Color para el número 32
            case 64:
                return '#f65e3b'; // Color para el número 64
            case 128:
                return '#edcf72'; // Color para el número 128
            case 256:
                return '#edcc61'; // Color para el número 256
            case 512:
                return '#edc850'; // Color para el número 512
            case 1024:
                return '#edc53f'; // Color para el número 1024
            case 2048:
                return '#edc22e'; // Color para el número 2048
            default:
                return '#ccc0b3'; // Color para otros números
        }
    }

    function renderBoard() {
        gridContainer.innerHTML = '';
        board.forEach(row => {
            row.forEach(num => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = num ? num : '';
                cell.style.backgroundColor = getColorForNumber(num);
                gridContainer.appendChild(cell);
            });
        });
        document.getElementById('score').textContent = score;
    }

    function generateRandomNumber() {
        return Math.random() < 0.9 ? 2 : 4;
    }

    function addRandomNumber() {
        const availableCells = [];
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 0) {
                    availableCells.push({ row: rowIndex, col: colIndex });
                }
            });
        });
        if (availableCells.length > 0) {
            const { row, col } = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[row][col] = generateRandomNumber();
        }
    }

    // Función para mover y combinar números
    function moveAndCombineNumbers(direction) {
        switch (direction) {
            case 'up':
                for (let col = 0; col < 4; col++) {
                    for (let row = 1; row < 4; row++) {
                        if (board[row][col] !== 0) {
                            let newRow = row;
                            while (newRow > 0 && board[newRow - 1][col] === 0) {
                                newRow--;
                            }
                            if (newRow !== row) {
                                board[newRow][col] = board[row][col];
                                board[row][col] = 0;
                            }
                            if (newRow > 0 && board[newRow - 1][col] === board[newRow][col]) {
                                board[newRow - 1][col] *= 2;
                                board[newRow][col] = 0;
                            }
                        }
                    }
                }
                break;
            case 'down':
                for (let col = 0; col < 4; col++) {
                    for (let row = 2; row >= 0; row--) {
                        if (board[row][col] !== 0) {
                            let newRow = row;
                            while (newRow < 3 && board[newRow + 1][col] === 0) {
                                newRow++;
                            }
                            if (newRow !== row) {
                                board[newRow][col] = board[row][col];
                                board[row][col] = 0;
                            }
                            if (newRow < 3 && board[newRow + 1][col] === board[newRow][col]) {
                                board[newRow + 1][col] *= 2;
                                board[newRow][col] = 0;
                            }
                        }
                    }
                }
                break;
            case 'left':
                for (let row = 0; row < 4; row++) {
                    for (let col = 1; col < 4; col++) {
                        if (board[row][col] !== 0) {
                            let newCol = col;
                            while (newCol > 0 && board[row][newCol - 1] === 0) {
                                newCol--;
                            }
                            if (newCol !== col) {
                                board[row][newCol] = board[row][col];
                                board[row][col] = 0;
                            }
                            if (newCol > 0 && board[row][newCol - 1] === board[row][newCol]) {
                                board[row][newCol - 1] *= 2;
                                board[row][newCol] = 0;
                            }
                        }
                    }
                }
                break;
            case 'right':
                for (let row = 0; row < 4; row++) {
                    for (let col = 2; col >= 0; col--) {
                        if (board[row][col] !== 0) {
                            let newCol = col;
                            while (newCol < 3 && board[row][newCol + 1] === 0) {
                                newCol++;
                            }
                            if (newCol !== col) {
                                board[row][newCol] = board[row][col];
                                board[row][col] = 0;
                            }
                            if (newCol < 3 && board[row][newCol + 1] === board[row][newCol]) {
                                board[row][newCol + 1] *= 2;
                                board[row][newCol] = 0;
                            }
                        }
                    }
                }
                break;
        }

        // Actualizar el puntaje
        let combinedScore = 0;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                combinedScore += board[row][col];
            }
        }
        score += combinedScore;
        // Actualizar el marcador de puntaje en el HTML
        document.getElementById('score').textContent = score;
    }

    // Función para verificar si el juego ha terminado
    function isGameOver() {

        // Verificar si todas las celdas están ocupadas
        let cellsFilled = true;
        board.forEach(row => {
            row.forEach(num => {
                if (num === 0) {
                    cellsFilled = false;
                }
            });
        });
        if (cellsFilled) {
            document.getElementById('final-score').textContent = score; // Actualizar el puntaje final
            document.getElementById('game-over-popup').style.display = 'flex';
            return true;
        }

        // Verificar si no hay movimientos posibles
        let movesPossible = false;

        // Verificar si hay celdas vacías
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    return false;
                }
            }
        }
        // Verificar si hay movimientos posibles
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (row > 0 && board[row][col] === board[row - 1][col]) {
                    return false;
                }
                if (row < 3 && board[row][col] === board[row + 1][col]) {
                    return false;
                }
                if (col > 0 && board[row][col] === board[row][col - 1]) {
                    return false;
                }
                if (col < 3 && board[row][col] === board[row][col + 1]) {
                    return false;
                }
            }
        }

        if (!movesPossible) {
            document.getElementById('final-score').textContent = score; // Actualizar el puntaje final
            document.getElementById('game-over-popup').style.display = 'flex';
            return true;
        }
        return false;
    }

    // Función para manejar el evento de teclado
    document.addEventListener('keydown', event => {
        let direction;
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
        if (direction) {
            moveAndCombineNumbers(direction);
            addRandomNumber();
            renderBoard();
            if (isGameOver()) {
                // gameOverPopup();
                // alert('¡Juego terminado! Puntaje final: ' + score);
            }
        }
    });

    // Inicialización del juego
    function initGame() {
        addRandomNumber();
        addRandomNumber();
        renderBoard();
    }

function startGame() {
    document.getElementById('overlay').style.display = 'none';
    // initGame();
}

function restartGame() {
    document.getElementById('game-over-popup').style.display = 'none';
    score = 0;
    board = [];
    for (let i = 0; i < 4; i++) {
        board.push([0, 0, 0, 0]);
    }
    initGame();
}

document.addEventListener('DOMContentLoaded', () => {
    // Iniciar el juego
    initGame();
});
