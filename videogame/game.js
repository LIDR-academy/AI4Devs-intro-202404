// Definir variables para puntaje y vidas
let score = 0;
let lives = 3;

// Obtener elementos del DOM
const scoreElement = document.getElementById('score-value');
const livesElement = document.getElementById('lives-value');

// Actualizar puntaje y vidas en la interfaz de usuario
function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

// Función principal para inicializar el juego
function initGame() {
    // Lógica del juego empezaría aquí
    // Por ejemplo, inicializar el nivel, manejar colisiones, etc.
    // Por ahora, solo actualizamos la interfaz de usuario
    updateUI();
}

// Llamar a la función principal para iniciar el juego
initGame();

// Función para manejar la recolección de monedas
function collectCoin() {
  score += 10; // Aumentar el puntaje al recolectar una moneda
  updateUI(); // Actualizar la interfaz de usuario
}

// Manejar eventos de clic para recolección de monedas
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('coin')) {
      event.target.remove(); // Eliminar la moneda al recolectarla
      collectCoin(); // Llamar a la función para recolectar la moneda
  }
});

// Llamar a la función principal para iniciar el juego
initGame();
