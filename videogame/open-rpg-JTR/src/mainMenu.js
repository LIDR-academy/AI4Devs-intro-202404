// src/mainMenu.js
export function initMainMenu(scene) {
    const startNewGameButton = document.getElementById("startNewGame");
    const loadGameButton = document.getElementById("loadGame");

    startNewGameButton.addEventListener("click", () => {
        console.log("Start new game");
        // Trigger the character creation screen
    });

    loadGameButton.addEventListener("click", () => {
        console.log("Load game");
        // Implement game loading logic
    });

    // Show the main menu
    document.getElementById("mainMenu").style.display = "block";
}
