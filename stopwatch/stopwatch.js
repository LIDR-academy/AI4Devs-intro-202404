let stopwatchInterval;
let elapsedMilliseconds = 0;
let running = false;

function updateDisplay() {
  const hours = Math.floor(elapsedMilliseconds / 3600000).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = (elapsedMilliseconds % 1000).toString().padStart(3, '0');

  document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
  document.querySelector('.milliseconds').textContent = milliseconds;
}

function toggleStopwatch() {
  if (!running) {
    // Comenzar el cronómetro
    stopwatchInterval = setInterval(() => {
      elapsedMilliseconds += 10;
      updateDisplay();
    }, 10);
    running = true;
    document.querySelector('.start').textContent = 'Stop';
  } else {
    // Detener el cronómetro
    clearInterval(stopwatchInterval);
    running = false;
    document.querySelector('.start').textContent = 'Start';
  }
}

function clearStopwatch() {
  clearInterval(stopwatchInterval);
  elapsedMilliseconds = 0;
  updateDisplay();
  running = false;
  document.querySelector('.start').textContent = 'Start';
}

function goBack() {
  window.location.href = 'index.html';
}

// Inicializar el cronómetro con el tiempo actualizado
updateDisplay();