let isRunning = false;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTime() {
  let date = new Date(elapsedTime);
  let minutes = date.getUTCMinutes().toString().padStart(2, '0');
  let seconds = date.getUTCSeconds().toString().padStart(2, '0');
  let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
  display.textContent = `00:${minutes}:${seconds}`;
  millisecondsDisplay.textContent = milliseconds;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      elapsedTime += 10;
      updateTime();
    }, 10);
    startStopBtn.textContent = 'Stop';
    startStopBtn.className = 'btn btn-warning';
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.className = 'btn btn-success';
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTime();
  startStopBtn.textContent = 'Start';
  startStopBtn.className = 'btn btn-success';
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

updateTime(); // Initialize display
