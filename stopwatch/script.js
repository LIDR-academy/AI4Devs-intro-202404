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
})
