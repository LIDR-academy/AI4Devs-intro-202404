/* script.js */

let timerInterval;
let startTime;
let running = false;

const timerDisplay = document.getElementById('timer');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const clearButton = document.getElementById('clear');

function startTimer() {
  if (!running) {
    running = true;
    startButton.textContent = 'Stop';
    startButton.style.backgroundColor = 'orange';
    startTime = Date.now() - (timerInterval ? timerInterval : 0);
    timerInterval = setInterval(updateTimer, 10);
  } else {
    running = false;
    startButton.textContent = 'Start';
    startButton.style.backgroundColor = 'green';
    clearInterval(timerInterval);
  }
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = elapsedTime % 1000;

  timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(milliseconds) {
  return milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds;
}

function clearTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  running = false;
  timerDisplay.textContent = '00:00:00';
  millisecondsDisplay.textContent = '000';
  startButton.textContent = 'Start';
  startButton.style.backgroundColor = 'green';
}

startButton.addEventListener('click', startTimer);
clearButton.addEventListener('click', clearTimer);
