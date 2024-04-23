document.addEventListener("DOMContentLoaded", function () {
  initSudokuBoard();
  populateSudokuBoard(puzzle);
});

// Inicialización del tablero de Sudoku
function initSudokuBoard() {
  const board = document.getElementById("sudoku-board");
  board.innerHTML = ""; // Limpiar el tablero anterior si es necesario
  const grid = document.createElement("table");
  grid.className = "sudoku-grid";

  for (let i = 0; i < 9; i++) {
    const row = grid.insertRow();
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.className = "sudoku-cell";
      input.maxLength = 1; // Solo permite un dígito por celda
      cell.appendChild(input);
    }
  }
  board.appendChild(grid);
}

// Un ejemplo de puzzle de Sudoku (0 representa celdas vacías)
const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function populateSudokuBoard(puzzle) {
  const board = document.getElementById("sudoku-board");
  const inputs = board.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    if (puzzle[row][col] !== 0) {
      inputs[i].value = puzzle[row][col];
      inputs[i].classList.add("given-number");
      inputs[i].readOnly = true; // Evita que el usuario edite este número
    }
  }
}

function checkSection(section) {
  const seen = new Set();
  for (let i = 0; i < section.length; i++) {
    if (section[i] !== 0) {
      if (seen.has(section[i])) {
        return false; // Número repetido
      }
      seen.add(section[i]);
    }
  }
  return true;
}

// Esta función valida todo el tablero de Sudoku
function validateSudokuBoard() {
    const inputs = document.querySelectorAll('.sudoku-cell');
    const size = 9;
    const board = [];

    // Convertir la entrada en una matriz 2D para facilitar la manipulación
    for (let i = 0; i < size; i++) {
        board[i] = Array.from(inputs).slice(i * size, (i + 1) * size).map(cell => parseInt(cell.value) || 0);
    }

    // Comprobar si todas las celdas están llenas
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                return false; // No todas las celdas están llenas
            }
        }
    }

    // Comprobar filas y columnas
    for (let i = 0; i < size; i++) {
        const row = board[i];
        const col = board.map(row => row[i]);
        if (!checkSection(row) || !checkSection(col)) {
            return false;
        }
    }

    // Comprobar subcuadrículas
    for (let i = 0; i < size; i += 3) {
        for (let j = 0; j < size; j += 3) {
            const subgrid = [];
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    subgrid.push(board[i + k][j + l]);
                }
            }
            if (!checkSection(subgrid)) {
                return false;
            }
        }
    }

    return true; // El tablero es válido
}

function checkSudoku() {
    if (validateSudokuBoard()) {
        alert('¡Felicidades! Has resuelto correctamente el Sudoku.');
    } else {
        alert('Solución incorrecta o incompleta, sigue intentándolo.');
    }
}

// Añadir evento al botón de comprobación
document.getElementById("check-button").addEventListener("click", checkSudoku);
