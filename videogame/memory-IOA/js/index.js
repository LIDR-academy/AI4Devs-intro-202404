// Function to dynamically generate player name fields
function generatePlayerNameFields(numPlayers) {
    const playerNamesContainer = document.getElementById('player-names-container');
    playerNamesContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < numPlayers; i++) {
        const playerNameField = document.createElement('div');
        playerNameField.classList.add('settings-field');

        const label = document.createElement('label');
        label.textContent = `Player ${i + 1} Name:`;
        playerNameField.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `player${i}`;
        input.classList.add('settings-input');
        playerNameField.appendChild(input);

        playerNamesContainer.appendChild(playerNameField);
    }
}

// Event listener for changes in the number of players dropdown
const numPlayersDropdown = document.getElementById('num-players');
numPlayersDropdown.addEventListener('change', function() {
    const numPlayers = parseInt(this.value);
    generatePlayerNameFields(numPlayers);
});

// Initial generation of player name fields based on default value
generatePlayerNameFields(parseInt(numPlayersDropdown.value));



document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settings-form');

    // Predefined list of colors
    const defaultColors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

    // Function to save settings to local storage
    function saveDifficulty(difficulty) {
        localStorage.setItem('memory_game_difficulty', difficulty);
    }

    function saveNumPlayers(numPlayers) {
        localStorage.setItem('memory_game_num_players', numPlayers);
    }

    function savePlayerNames(playerNames) {
        localStorage.setItem('memory_game_player_names', JSON.stringify(playerNames));
    }

    // Event listener for form submission
    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        saveNumPlayers(settingsForm.elements['num-players'].value);
        saveDifficulty(settingsForm.elements['difficulty'].value);

        const numPlayers = parseInt(settingsForm.elements['num-players'].value, 10);
        const playerNames = [];

        // Extract player names from form fields
        for (let i = 0; i <= numPlayers-1 ; i++) {
            const playerNameInput = document.getElementById(`player${i}`);
            let playerName = playerNameInput.value.trim();
            if (playerName === '') {
                playerName = defaultColors[i]; // Assign default color name if no name provided
            }
            playerNames.push(playerName);
        }

        // Save player names in local storage
        savePlayerNames(playerNames);

        // Redirect to the board page (board.html)
        window.location.href = 'board.html';
    });

    // Get difficulty from local storage and display it
    const difficulty = localStorage.getItem('memory_game_difficulty');
    if (difficulty) {
        document.getElementById('difficulty').value = difficulty;
    }

    // Get number of players from local storage and display it
    const numPlayers = localStorage.getItem('memory_game_num_players');
    if (numPlayers) {
        document.getElementById('num-players').value = numPlayers;
    }

});