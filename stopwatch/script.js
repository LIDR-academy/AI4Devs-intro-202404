let isRunning = false;
let elapsedTime = 0;
let timerInterval;
let isCountdown = false; // Flag to check if it's a countdown
const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTime() {
  let totalMilliseconds = isCountdown ? elapsedTime : Math.max(0, elapsedTime);
  let totalSeconds = totalMilliseconds / 1000;
  let hours = parseInt(totalSeconds / 3600, 10);
  totalSeconds = totalSeconds % 3600;  // Remove hours from total seconds
  let minutes = parseInt(totalSeconds / 60, 10);
  let seconds = parseInt(totalSeconds % 60, 10);
  let milliseconds = parseInt(totalMilliseconds % 1000);

  display.textContent = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
    millisecondsDisplay.textContent = pad(milliseconds, 3);

    // When counting down, if we hit 0, stop the timer
    if (isCountdown && elapsedTime <= 0) {
        stopTimer();
        alert('Time is up!');
    }
}

function pad(number, digits) {
    return number.toString().padStart(digits, '0');
}

function startTimer() {
  let startTime = Date.now();
  let updateFunction = () => {
      let now = Date.now();
      let delta = now - startTime;
      elapsedTime = isCountdown ? Math.max(0, elapsedTime - delta) : elapsedTime + delta;
      startTime = now;
      updateTime();
  };

    updateFunction(); // update once immediately
    timerInterval = setInterval(updateFunction, 10);
}
function toggleStopwatch() {
  if (!isRunning && elapsedTime > 0) {
      isRunning = true;
      startStopBtn.textContent = 'Stop';
      startStopBtn.className = 'btn btn-warning';
      startTimer();
  } else if (isRunning) {
      stopTimer();
  }
}


function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.className = 'btn btn-success';
}

function resetStopwatch() {
    stopTimer();
    elapsedTime = 0;
    isCountdown = false;
    updateTime();
    millisecondsDisplay.textContent = '000';
}

function setPredefinedTime(time) {
  isCountdown = true;
  elapsedTime = time * 1000;  // Convert seconds to milliseconds
  updateTime();
  millisecondsDisplay.textContent = '000';
}


startStopBtn.addEventListener('click', toggleStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initialize display to 00:00:00 and 000 milliseconds
updateTime();
