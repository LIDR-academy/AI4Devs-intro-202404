// Function to generate the empty game board grid
function generateEmptyGameBoard(size) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear previous content

    for (let i = 0; i < size; i++) {
        const card = document.createElement('div');
        card.classList.add('card', 'empty');
        card.dataset.index = i;
        gameBoard.appendChild(card);
    }
}

// Array of image names available for the game
const imageNames = [
    'crocodile.png', 'flamingo.png', 'leopard.png', 'lion.png', 'monkey.png', 'toucan.png'
    // Add more image names as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const playerDisplay = document.getElementById('player-display');
    const playerTurn = document.getElementById('player-turn');
    let currentPlayerIndex = 0; // Index of the current player
    let playerNames = []; // Array to store player names
    let cardsWon = []; // Array to store the amount of cards won by each player
    // Load board size from local storage when the page loads
    const difficulty = localStorage.getItem('memory_game_difficulty');
    let selectedCards = []; // Array to store selected cards


    // Function to retrieve player data from local storage
    function getPlayerData() {
        const playerDataJSON = localStorage.getItem('memory_game_player_names');
        return playerDataJSON ? JSON.parse(playerDataJSON) : [];
    }

    // Function to select the first player randomly
    function selectFirstPlayer() {
        currentPlayerIndex = Math.floor(Math.random() * playerNames.length);
        updatePlayerDisplay();
    }

    // Function to get the index of the next player's turn
    function getNextTurn(previousIndex) {
        return (previousIndex + 1) % playerNames.length;
    }

    // Function to update the player display
    function updatePlayerDisplay() {
        playerTurn.textContent = playerNames[currentPlayerIndex];
    }

    // Function to update the cards won for a player
    function updateCardsWon(playerIndex, numCards) {
        cardsWon[playerIndex] += numCards;
        // Update any UI related to cards won (e.g., scoreboard)
    }

    function initScores(length) {
        cardsWon = new Array(length).fill(0);
    }

    // Retrieve player data from local storage
    playerNames = getPlayerData();
    initScores(playerNames.length);

    // Select the first player randomly
    selectFirstPlayer();

    // Update the player display initially
    updatePlayerDisplay();

    
    function generateImageArray(difficulty) {
        const selectedImages = [];
        for (let i = 0; i < difficulty; i++) {
            const randomIndex = Math.floor(Math.random() * imageNames.length);
            selectedImages.push(imageNames[randomIndex]);
            // Remove the selected image from the available pool to prevent duplicates
            imageNames.splice(randomIndex, 1);
        }
        // Duplicate the selected images and shuffle the array
        return [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);
    }

    // Function to generate the game board
    // function generateGameBoard(difficulty) {
    //     const imageArray = generateImageArray(difficulty);

    //     gameBoard.innerHTML = ''; // Clear previous content

    //     // Generate card elements based on image array
    //     imageArray.forEach((imageName, index) => {
    //         const card = document.createElement('div');
    //         card.classList.add('card', 'empty'); // Initially face down
    //         card.dataset.index = index;
    //         //card.style.background = 'none'
    //         card.style.backgroundImage = `url('images/${imageName}')`; // Set background image
    //         gameBoard.appendChild(card);
    //     });

    //     // Add event listener to each card div
    //     const cards = gameBoard.querySelectorAll('.card');
    //     cards.forEach(card => {
    //         card.addEventListener('click', handleCardClick);
    //     });
    // }

    // Function to generate the game board
    function generateGameBoard(difficulty) {
        const imageArray = generateImageArray(difficulty);

        gameBoard.innerHTML = ''; // Clear previous content

        // Generate card elements based on image array
        imageArray.forEach((imageName, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'empty'); // Initially face down
            card.dataset.index = index;
            // Remove any existing background image
            card.style.backgroundImage = `url('images/${imageName}')`;
            gameBoard.appendChild(card);
        });

        // Add event listener to each card div
        const cards = gameBoard.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });
    }

    // Function to handle card click event
    function handleCardClick(event) {
        const card = event.target;

        // Check if the card is already face up or if it's one of the selected cards
        if (!card.classList.contains('empty') || selectedCards.includes(card)) {
            return; // Ignore click if card is already face up or selected
        }

        // Flip the card (reveal image)
        card.classList.remove('empty');

        // Add the selected card to the array
        selectedCards.push(card);

        // If two cards are selected, check for a match
        if (selectedCards.length === 2) {
            checkForMatch();
            if (allCardsMatched()) {
                // Store cards won by each player in local storage
                localStorage.setItem('memory_game_scores', JSON.stringify(cardsWon));
                // Redirect to Game Over page
                window.location.href = 'gameover.html';
            }
            currentPlayerIndex = getNextTurn(currentPlayerIndex);
            updatePlayerDisplay();
        }
    }

    // Function to check for a match between the selected cards
    function checkForMatch() {
        const [card1, card2] = selectedCards;

        // If the background images match, it's a match
        if (card1.style.backgroundImage === card2.style.backgroundImage) {
            // Do something when there's a match (e.g., remove cards)
            // For now, we'll just log a message
            console.log('Match!');

            // Update the cards won for the current player
            updateCardsWon(currentPlayerIndex, 2);
        } else {
            // If no match, flip the cards back face down
            setTimeout(() => {
                card1.classList.add('empty');
                card2.classList.add('empty');
            }, 1000); // Delay before flipping back
        }

        // Clear the selected cards array for the next turn
        selectedCards = [];
    }

    // Function to check if all cards have been matched
    function allCardsMatched() {
        const totalCards = gameBoard.querySelectorAll('.card').length;
        const totalCardsWon = cardsWon.reduce((acc,  numCards) => acc + numCards, 0);
        return totalCardsWon === totalCards;
    }
    

    
    if (difficulty) {
        // Generate empty game board based on board size
        generateGameBoard(parseInt(difficulty));
    }
});