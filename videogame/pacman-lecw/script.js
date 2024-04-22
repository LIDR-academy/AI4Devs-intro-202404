document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('.score span');
  const startOverlay = document.querySelector('#start-overlay');
  const gameOverOverlay = document.querySelector('#game-over-overlay');
  const startButton = document.querySelector('#start-button');
  const restartButton = document.querySelector('#restart-button');
  let score = 0;
  let fruitCount = 0;
  let cells = []; // Declarar cells aquí para asegurar que es accesible globalmente

  // Definir fantasmas como objetos
  const ghosts = [
    { name: "Blinky", currentIndex: 55, className: 'ghost' },
    { name: "Pinky", currentIndex: 88, className: 'ghost' },
    // { name: "Inky", currentIndex: 98, className: 'ghost' },
    // { name: "Clyde", currentIndex: 99, className: 'ghost' }
  ];


  // Función para inicializar el juego
  function initializeGame() {
    cells = []; // Limpiar el array de celdas
    grid.innerHTML = ''; // Limpiar completamente el grid
    score = 0; // Reiniciar el puntaje
    scoreDisplay.textContent = score;
    fruitCount = 0;
    startOverlay.style.display = 'none'; // Ocultar overlay de inicio
    gameOverOverlay.style.display = 'none'; // Ocultar overlay de terminación
    grid.style.display = 'grid'; // Asegurarse de que el grid se muestre como grid

    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId);
    });

    const layout = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 2, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
      1, 0, 1, 0, 1, 1, 0, 1, 2, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
      1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
      1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    // Construir el tablero asegurándose de que cada celda se añade correctamente
    layout.forEach((item, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (item === 1) {
        cell.classList.add('wall');
      } else if (item === 2) {
        cell.classList.add('fruit');
        fruitCount++;
        // Configuración específica para la fruta (cereza)
        cell.textContent = '🍒'; // Añade el emoji de la cereza directamente en la celda
        cell.style.fontSize = '24px'; // Ajusta esto según el tamaño de tus celdas
        cell.style.textAlign = 'center'; // Centrar el emoji en la celda
        cell.style.lineHeight = '40px'; // Alineación vertical
      } else {
        cell.classList.add('point');
      }

      grid.appendChild(cell);
      cells.push(cell); // Asegúrate de añadir la celda al array
    });


    let pacmanCurrentIndex = 21;
    cells[pacmanCurrentIndex].classList.add('pacman');

    // Añadir fantasmas al tablero
    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId);
      // Crear el elemento del fantasma
      const ghostElement = document.createElement('div');
      ghostElement.classList.add('ghost', ghost.className); // Añadir clases para el estilo general y color

      // Crear y añadir los ojos del fantasma
      const leftEye = document.createElement('div');
      leftEye.classList.add('eye', 'left-eye');
      const rightEye = document.createElement('div');
      rightEye.classList.add('eye', 'right-eye');

      // Añadir los ojos al elemento fantasma
      ghostElement.appendChild(leftEye);
      ghostElement.appendChild(rightEye);

      // Añadir el elemento fantasma a la celda correspondiente en el grid
      cells[ghost.currentIndex].appendChild(ghostElement);

      // Guardar el elemento del fantasma en el objeto ghost para manipulación futura
      ghost.element = ghostElement;
      ghost.timerId = setInterval(() => moveGhost(ghost), 1000);  // Reiniciar el movimiento
    });

    function movePacman(e) {
      cells[pacmanCurrentIndex].classList.remove('pacman');
      switch (e.keyCode) {
        case 37: // left
          if (pacmanCurrentIndex % 10 !== 0 && !cells[pacmanCurrentIndex - 1].classList.contains('wall')) pacmanCurrentIndex -= 1;
          break;
        case 38: // up
          if (pacmanCurrentIndex - 10 >= 0 && !cells[pacmanCurrentIndex - 10].classList.contains('wall')) pacmanCurrentIndex -= 10;
          break;
        case 39: // right
          if (pacmanCurrentIndex % 10 < 9 && !cells[pacmanCurrentIndex + 1].classList.contains('wall')) pacmanCurrentIndex += 1;
          break;
        case 40: // down
          if (pacmanCurrentIndex + 10 < 100 && !cells[pacmanCurrentIndex + 10].classList.contains('wall')) pacmanCurrentIndex += 10;
          break;
      }
      cells[pacmanCurrentIndex].classList.add('pacman');

      // Puntuación y eliminación de frutas
      if (cells[pacmanCurrentIndex].classList.contains('fruit')) {
        score += 50; // solo sumar puntos con frutas
        cells[pacmanCurrentIndex].classList.remove('fruit');
        cells[pacmanCurrentIndex].textContent = ''; // Eliminar el emoji de la cereza
        fruitCount--;
        scoreDisplay.textContent = score;

        if (fruitCount === 0) {
          document.removeEventListener('keyup', movePacman); // Detener el movimiento si no quedan frutas
          gameOver(); // Terminar juego si no quedan frutas
        }
      }
      checkForGhostCollision(pacmanCurrentIndex);
    }

    function moveGhost(ghost) {
      const directions = [-1, +1, -10, +10]; // izquierda, derecha, arriba, abajo
      let direction = directions[Math.floor(Math.random() * directions.length)];
      let nextIndex = ghost.currentIndex + direction;

      if (cells[nextIndex] && !cells[nextIndex].classList.contains('wall') && !cells[nextIndex].children.length) {
        // Remover el elemento fantasma de su posición actual
        cells[ghost.currentIndex].removeChild(ghost.element);
        // Actualizar el índice del fantasma
        ghost.currentIndex = nextIndex;
        // Añadir el elemento fantasma a la nueva celda
        cells[ghost.currentIndex].appendChild(ghost.element);
      }

      checkForGhostCollision(pacmanCurrentIndex);
    }

    function checkForGhostCollision(pacmanIndex) {
      if (cells[pacmanIndex] && cells[pacmanIndex].querySelector('.ghost')) {
        document.removeEventListener('keyup', movePacman); // Detener el movimiento si no quedan frutas
        gameOver();
        return true;
      }
      return false;
    }


    document.addEventListener('keyup', movePacman);
  }

  function gameOver() {
    gameOverOverlay.style.display = 'flex'; // Mostrar mensaje de fin de juego
    grid.style.display = 'none'; // Ocultar el tablero correctamente
  }

  startButton.addEventListener('click', initializeGame);
  restartButton.addEventListener('click', initializeGame);
});
