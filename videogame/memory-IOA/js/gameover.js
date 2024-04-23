
// script.js (for game-over.html)

document.addEventListener('DOMContentLoaded', function() {
    const rankingList = document.getElementById('ranking-list');
    const newGameBtn = document.getElementById('new-game-btn');
    const sameGameBtn = document.getElementById('same-game-btn');

    // Function to retrieve cards won data from local storage
    function getCardsWonData() {
        const cardsWonJSON = localStorage.getItem('memory_game_scores');
        return cardsWonJSON ? JSON.parse(cardsWonJSON) : [];
    }

    function getPlayerNamesData() {
        const playerNamesJSON = localStorage.getItem('memory_game_player_names');
        return playerNamesJSON ? JSON.parse(playerNamesJSON) : [];
    }

    // Function to create the ranking list
    function createRankingList() {
        const cardsWon = getCardsWonData();
        const playerNames = getPlayerNamesData();

        // Combine player names with cards won data
        const players = playerNames.map((name, index) => ({ name, cards: cardsWon[index] }));


        // Sort players by the number of cards won (descending order)
        const sortedPlayers = players.sort((a, b) => b.cards - a.cards);

        // Generate the ranking list HTML
        const rankingListHTML = sortedPlayers.map((player, index) => {
            return `<li class="list-group-item">${index + 1}. ${player.name}: ${player.cards}</li>`;
        }).join('');

        // Display the ranking list
        rankingList.innerHTML = rankingListHTML;
    }

    // Event listener for New Game button
    newGameBtn.addEventListener('click', function() {
        // Redirect to index page
        window.location.href = 'index.html';
    });

    // Event listener for Same Game button
    sameGameBtn.addEventListener('click', function() {
        // Redirect to board page
        window.location.href = 'board.html';
    });

    // Call the function to create the ranking list when the page loads
    createRankingList();
});
