// game.js
let money = 1000;
let zoomLevel = 1;
const map = document.getElementById('map');
const container = document.getElementById('game-container');
let population = 0;
let populationIncreaseRate = 20000;
let bienestar = 100;

const costs = {
  Residencia: 50,
  Fabrica: 100,
  Tienda: 70,
  Almacen: 150,
  Hospital: 150,
  Escuela: 150,
  Supermercado: 150
};

const productionRates = {
  Residencia: 5000,
  Fabrica: 1000,
  Tienda: 5000,
  Supermercado: 7000,
  Almacen: {Tienda: 5000, Supermercado: 7000} // Valor inicial, se actualizará dinámicamente
};
let residenceCount = 0;
let hospitalAndSchoolCount = 0;

const moneyPerProduction = {
  Residencia: 10,
  Fabrica: 12,
  Tienda: 50,
  Supermercado: 100
};

function updateDisplay() {
  document.getElementById('money').textContent = money;
  document.getElementById('population').textContent = population;
  document.getElementById('bienestar').textContent = bienestar;
}

function buildBuilding(type) {
  if (money >= costs[type]) {
    money -= costs[type];
    population += calculatePopulationIncrease(type);
    bienestar += calculateWellbeingIncrease(type);
    updateBuildingCounts(type);
    placeBuildingOnMap(type);
    updateDisplay();
    displayMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} construido!`);
    updateProductionTime(type);
    startProduction(type);
  } else {
    displayMessage('No hay suficiente dinero para construir.');
  }
}

function updateBuildingCounts(type) {
  switch (type) {
    case 'Residencia':
      residenceCount++;
      break;
    case 'Hospital':
    case 'Escuela':
      hospitalAndSchoolCount++;
      updatePopulationIncreaseRate();
      break;
  }
}

function updatePopulationIncreaseRate() {
  populationIncreaseRate = Math.max(5000, 20000 - hospitalAndSchoolCount * 100);
}

function increasePopulation() {
  population += residenceCount;
  updateDisplay();
}

function calculatePopulationIncrease(type) {
  switch (type) {
    case 'Residencia':
      return 5;
    case 'Fabrica':
      return 3;
    case 'Tienda':
      return 2;
    case 'Hospital':
      return 1;
    case 'Escuela':
      return 1;
    case 'Supermercado':
      return 2;
    default:
      return 0;
  }
}

function calculateWellbeingIncrease(type) {
  switch (type) {
    case 'Hospital':
      return 5;
    case 'Escuela':
      return 7;
    default:
      return 0;
  }
}

function placeBuildingOnMap(type) {
  const cells = Array.from(document.querySelectorAll('.grid-cell'));
  const emptyCells = cells.filter(cell => !cell.classList.contains('occupied'));
  if (emptyCells.length === 0) return alert('No hay más espacio disponible');
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.classList.add('occupied', type);
  randomCell.style.backgroundImage = `url('images/${type}.webp')`;
  randomCell.dataset.type = type;
  randomCell.dataset.production = moneyPerProduction[type] || 0;
  randomCell.dataset.timeRemaining = productionRates[type] / 1000 || 0;
}

function startProduction(type) {
  setInterval(() => {
    if (type in moneyPerProduction) {
      money += moneyPerProduction[type];
      updateDisplay();
    }
  }, productionRates[type]);
}

function updateProductionTime(type) {
  if (type === 'Fabrica') {
    productionRates.Fabrica -= 5;
  } else if (type === 'Almacen') {
    productionRates.Tienda -= 30;
    productionRates.Supermercado -= 10;
  }
}

function displayMessage(message) {
  document.getElementById('messages').textContent = message;
  setTimeout(() => {
    document.getElementById('messages').textContent = 'No hay mensajes';
  }, 5000);
}

document.querySelectorAll('.grid-cell').forEach(cell => {
  cell.addEventListener('mouseenter', function () {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.innerHTML = `Edificio: ${this.dataset.type}<br>Producción: $${this.dataset.production}<br>Tiempo restante: ${this.dataset.timeRemaining}s`;
    document.body.appendChild(tooltip);
    this.addEventListener('mouseleave', function () {
      document.body.removeChild(tooltip);
    });
  });
});


function randomEvents() {
  if (Math.random() < 0.1) { // 10% de probabilidad de un evento
    const events = [
      { name: 'desastre natural', moneyLoss: 100, populationLoss: 10 },
      { name: 'pandemia', moneyLoss: 150, populationLoss: 20 },
      { name: 'guerra', moneyLoss: 200, populationLoss: 30 },
      { name: 'invasión', moneyLoss: 250, populationLoss: 40 }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    money -= event.moneyLoss;
    population -= event.populationLoss;
    bienestar -= 10; // Todos los eventos disminuyen el bienestar
    displayMessage(`¡${event.name}! Pérdidas económicas y de población.`);
    updateDisplay();
    checkGameOver();
  }
}

function checkGameOver() {
  if (population <= 0 || bienestar < 0) {
    displayGameOver();
  }
}

function displayGameOver() {
  const gameOverMessage = document.createElement('div');
  gameOverMessage.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 2px solid black; z-index: 1000;">
            <h1>Game Over</h1>
            <p>¡Tu ciudad ha caído en desgracia!</p>
            <button onclick="restartGame()">Reiniciar Juego</button>
        </div>
    `;
  document.body.appendChild(gameOverMessage);
}

function restartGame() {
  document.location.reload(); // Reinicia la página para comenzar de nuevo
}

function createMapGrid() {
  for (let i = 0; i < 1600; i++) { // 40x40 grid
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.addEventListener('mouseenter', showTooltip);
    cell.addEventListener('mouseleave', hideTooltip);
    map.appendChild(cell);
  }
}

function showTooltip(event) {
  const cell = event.target;
  if (cell.dataset.type) { // Solo mostrar tooltip si hay un edificio
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${event.pageX + 20}px`;
    tooltip.style.top = `${event.pageY}px`;
    tooltip.innerHTML = `<strong>Edificio:</strong> ${cell.dataset.type}`;

    if (cell.dataset.production !== "0") {
      tooltip.innerHTML += `<br><strong>Producción:</strong> $${cell.dataset.production}`;
      if (cell.dataset.timeRemaining) {
        tooltip.innerHTML += `<br><strong>Tiempo restante:</strong> <span id='time-${cell.dataset.id}'>${cell.dataset.timeRemaining}</span>s`;
        updateCountdown(cell);
      }
    }

    document.body.appendChild(tooltip);
  }
}

function hideTooltip() {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => document.body.removeChild(tooltip));
}

function updateCountdown(cell) {
  let timeLeft = parseFloat(cell.dataset.timeRemaining);
  if (!cell.countdownInterval) {
    cell.countdownInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        timeLeft = productionRates[cell.dataset.type] / 1000;
      }
      cell.dataset.timeRemaining = timeLeft.toFixed(1);  // Actualizar el dataset para mantener la consistencia
      const timeSpan = document.getElementById(`time-${cell.dataset.id}`);
      if (timeSpan) {
        timeSpan.textContent = timeLeft.toFixed(1);
      }
    }, 1000);
  }
}

function toggleControls(event) {
  event.stopPropagation(); // Prevenir que se propague el clic
  const menu = document.querySelector('.menu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function closeMenu() {
  const menu = document.querySelector('.menu');
  menu.style.display = 'none';
}

// Función para cerrar el menú si se hace clic fuera de él
document.addEventListener('click', function (event) {
  const controls = document.getElementById('controls');
  const menu = document.querySelector('.menu');
  if (!controls.contains(event.target)) {
    menu.style.display = 'none';
  }
});

// Detener la propagación del clic dentro del menú para evitar que se cierre inadvertidamente
document.querySelector('.menu').addEventListener('click', function (event) {
  event.stopPropagation();
});


function zoomIn() {
  zoomLevel *= 1.1;
  updateZoom();
}

function zoomOut() {
  if (zoomLevel > 1) {
    zoomLevel /= 1.1;
    updateZoom();
  }
}

function updateZoom() {
  map.style.transform = `scale(${zoomLevel})`;
  map.style.width = `${1600 * zoomLevel}px`;
  map.style.height = `${1600 * zoomLevel}px`;
}

document.addEventListener('wheel', function (event) {
  if (event.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
  event.preventDefault();
});

let isDragging = false;
let lastPosX = 0;
let lastPosY = 0;

map.addEventListener('mousedown', function (event) {
  isDragging = true;
  lastPosX = event.clientX;
  lastPosY = event.clientY;
  event.preventDefault();
});

document.addEventListener('mousemove', function (event) {
  if (isDragging) {
    const deltaX = event.clientX - lastPosX;
    const deltaY = event.clientY - lastPosY;
    container.scrollLeft -= deltaX;
    container.scrollTop -= deltaY;
    lastPosX = event.clientX;
    lastPosY = event.clientY;
  }
});

document.addEventListener('mouseup', function () {
  isDragging = false;
});

document.getElementById('info-panel').addEventListener('mouseover', function() {
  this.classList.add('hidden');
});

document.getElementById('info-panel').addEventListener('mouseout', function() {
  this.classList.remove('hidden');
});

window.onload = function () {
  createMapGrid();
  updateDisplay();
  setInterval(randomEvents, 10000); // Eventos aleatorios cada 10 segundos
  setInterval(increasePopulation, populationIncreaseRate); // Aumento de población cada 20 segundos inicialmente
};