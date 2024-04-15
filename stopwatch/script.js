let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId = null;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');
const stopwatch = document.getElementById('stopwatch');
const backBtn = document.getElementById('backBtn');

const stopwatchBtn = document.getElementById('stopwatchBtn');

stopwatchBtn.addEventListener('click', () => {
  stopwatch.classList.remove('d-none');
});

backBtn.addEventListener('click', () => {
  stopwatch.classList.add('d-none');
  clearTimer();
});

startBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startBtn.textContent = "Continue";
    // Change button color to green for "Pause" state
    startBtn.classList.remove('btn-danger');
    startBtn.classList.add('btn-success');
  } else {
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.textContent = "Pause";
    // Change button color to blue for "Start" state
    startBtn.classList.remove('btn-success');
    startBtn.classList.add('btn-primary');
  }
});

clearBtn.addEventListener('click', () => {
  clearTimer();
  startBtn.textContent = "Start";
  // Change button color to green for "Start" state on clear
  startBtn.classList.remove('btn-primary', 'btn-danger');
  startBtn.classList.add('btn-success');
});

function updateTime() {
  // Update milliseconds first
  milliseconds++;
  millisecondsDisplay.textContent = milliseconds.toString().padStart(3, '0');

  // Update remaining time variables
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  // Update the time display
  timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function clearTimer() {
  clearInterval(intervalId);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeDisplay.textContent = '00:00:00';
  millisecondsDisplay.textContent = '000';
}
