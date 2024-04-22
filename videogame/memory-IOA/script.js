
// Function to load settings from local storage
function loadSettings() {
    const settingsString = localStorage.getItem('memory_game_settings');
    if (settingsString) {
        return JSON.parse(settingsString);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    // Load settings from local storage when the page loads
    const savedSettings = loadSettings();
    if (savedSettings) {
        // If settings are found, pre-fill form fields with saved values
        document.getElementById('num-players').value = savedSettings.players;
        document.getElementById('difficulty').value = savedSettings.difficulty;
    }

    // Rest of the JavaScript code...
});

// script.js






// Function to handle the player's turn
function handlePlayerTurn(player) {
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = `Current Player: ${player}`;
}

// Event listener for the change turn button
const changeTurnBtn = document.getElementById('change-turn-btn');
changeTurnBtn.addEventListener('click', function() {
    // Implement logic to change player turn here
    // For demonstration, let's toggle between Player 1 and Player 2
    const currentPlayer = document.getElementById('current-player').textContent;
    const nextPlayer = currentPlayer.includes('1') ? 'Player 2' : 'Player 1';
    handlePlayerTurn(nextPlayer);
});

// Initial generation of game board based on default difficulty (4 pairs)
//generateGameBoard(4);
handlePlayerTurn('Player 1');


// script.js

document.addEventListener('DOMContentLoaded', function() {
    const winnerText = document.getElementById('winner-text');
    const newGameBtn = document.getElementById('new-game-btn');
    const sameGameBtn = document.getElementById('same-game-btn');

    // Function to display the winner's name
    function displayWinner(winner) {
        winnerText.textContent = `Winner: ${winner}`;
    }

    // Event listener for the new game (new settings) button
    newGameBtn.addEventListener('click', function() {
        // Redirect to the settings page (index.html)
        window.location.href = 'index.html';
    });

    // Event listener for the new game (same settings) button
    sameGameBtn.addEventListener('click', function() {
        // Redirect to the board page (board.html)
        window.location.href = 'board.html';
    });

    // Get winner from query parameter (if provided) and display it
    const urlParams = new URLSearchParams(window.location.search);
    const winner = urlParams.get('winner');
    if (winner) {
        displayWinner(winner);
    } else {
        // If winner is not provided, display default message
        displayWinner('No winner specified');
    }
});
