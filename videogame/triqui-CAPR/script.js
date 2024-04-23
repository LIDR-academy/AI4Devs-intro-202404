document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const player1Score = document.querySelector('#player1 .score');
    const player2Score = document.querySelector('#player2 .score');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill(null);
    let score = { 'X': 0, 'O': 0 };

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function initializeBoard() {
        board.innerHTML = '';
        gameState.fill(null);
        gameActive = true;
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const cellIndex = parseInt(event.target.dataset.index);
        if (gameState[cellIndex] || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            updateScore(currentPlayer);
            alert(`Jugador ${currentPlayer} ha ganado!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes(null)) {
            alert('Empate!');
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function updateScore(winner) {
        score[winner]++;
        if (winner === 'X') {
            player1Score.textContent = score['X'];
        } else {
            player2Score.textContent = score['O'];
        }
    }

    document.getElementById('new-game').addEventListener('click', initializeBoard);
    document.getElementById('reset-score').addEventListener('click', () => {
        score = { 'X': 0, 'O': 0 };
        player1Score.textContent = '0';
        player2Score.textContent = '0';
        initializeBoard();
    });

    initializeBoard();
});