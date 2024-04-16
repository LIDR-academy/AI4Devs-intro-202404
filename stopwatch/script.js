let timerInterval;
let startTime;
let pausedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('startPauseButton');

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime + pausedTime;
  display.textContent = formatTime(elapsedTime);
  millisecondsDisplay.textContent = String(elapsedTime % 1000).padStart(3, '0');
}

function startPauseTimer() {
  if (!isRunning) {
    startTime = Date.now() - pausedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startPauseButton.textContent = 'Pause';
    startPauseButton.classList.remove('btn-success');
    startPauseButton.classList.add('btn-primary');
  } else {
    clearInterval(timerInterval);
    pausedTime += Date.now() - startTime;
    startPauseButton.textContent = 'Continue';
    startPauseButton.classList.remove('btn-primary');
    startPauseButton.classList.add('btn-success');
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  pausedTime = 0;
  display.textContent = '00:00:00';
  millisecondsDisplay.textContent = '000';
  startPauseButton.textContent = 'Start';
  startPauseButton.classList.remove('btn-primary');
  startPauseButton.classList.add('btn-success');
  isRunning = false;
}


startPauseButton.addEventListener('click', startPauseTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
