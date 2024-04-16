const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const clearButton = document.getElementById('clearButton');

let countdown;
let isCounting = false;
let seconds = 8 * 60; // Set initial time to 8 minutes

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  return [hours, minutes, remainingSeconds]
    .map(unit => unit < 10 ? '0' + unit : unit)
    .join(':');
}

function startTimer() {
  if (seconds > 0 && !isCounting) {
    isCounting = true;
    startButton.disabled = true;
    clearButton.disabled = false; // Enable clear button when timer starts

    countdown = setInterval(() => {
      seconds--;
      timerDisplay.textContent = formatTime(seconds);
      if (seconds <= 0) {
        clearInterval(countdown);
        isCounting = false;
        startButton.disabled = false;
        clearButton.disabled = true; // Disable clear button when timer ends
      }
    }, 1000);
  }
}

function clearTimer() {
  if (isCounting) {
    clearInterval(countdown);
    isCounting = false;
  }
  seconds = 8 * 60; // Reset to 8 minutes
  timerDisplay.textContent = formatTime(seconds);
  startButton.disabled = false;
  clearButton.disabled = true; // Keep clear button disabled until start is pressed again
}

startButton.addEventListener('click', startTimer);
clearButton.addEventListener('click', clearTimer);
