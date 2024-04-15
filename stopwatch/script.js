let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;

// Variables to store countdown time (in seconds)
let countdownTime = 0;
let currentDigit = -1; // -1 indicates no digit selected
let intervalId = null; // Variable to store setInterval ID

const timeDisplay = document.getElementById('time');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');
const stopwatch = document.getElementById('stopwatch');
const backBtn = document.getElementById('backBtn');

const stopwatchBtn = document.getElementById('stopwatchBtn');
const countdownBtn = document.getElementById('countdownBtn');

stopwatchBtn.addEventListener('click', () => {
  countdown.classList.add('d-none');
  stopwatch.classList.remove('d-none');
});

countdownBtn.addEventListener('click', () => {
  stopwatch.classList.add('d-none');
  countdown.classList.remove('d-none');
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
    // Change button color to blue for "Continue" state
    startBtn.classList.remove('btn-danger', 'btn-success');
    startBtn.classList.add('btn-primary');
  } else {
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.textContent = "Pause";
    // Change button color to green for "Start" state
    startBtn.classList.remove('btn-primary', 'btn-danger');
    startBtn.classList.add('btn-success');
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


// Function to update countdown display
function updateCountdownDisplay() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    // Check for zero countdown and display "00:00"
    if (countdownTime === 0) {
      document.getElementById("countdownDisplay").innerText = "00:00";
    } else {
        document.getElementById("countdownDisplay").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Event listeners for digit buttons
const digitButtons = document.querySelectorAll('.btn-success.btn-lg');
digitButtons.forEach(button => {
    button.addEventListener('click', function() {
      const digit = parseInt(this.innerText);

      // Check if a previous digit was selected
      if (currentDigit !== -1) {
        countdownTime = countdownTime * 10 + digit;
      } else {
        countdownTime = digit;
      }

      currentDigit++; // Update current digit position

      updateCountdownDisplay();
    });
});

// Event listener for "Set" button
document.getElementById("btnSet").addEventListener('click', function() {
    updateCountdownDisplay(); // Call updateCountdownDisplay to show set time
    console.log("Countdown set to:", countdownTime, "seconds");

     if (intervalId) {
      clearInterval(intervalId);
    }

    // Start countdown using setInterval
    intervalId = setInterval(function() {
      if (countdownTime > 0) {
        countdownTime--;
        updateCountdownDisplay();
      } else {
        clearInterval(intervalId);
        // Handle countdown completion (e.g., play sound, display message)
        console.log("Countdown finished!");
      }
    }, 1000); // Update every second (1000 milliseconds)
});

// Event listener for "Clear" button
document.getElementById("btnClear").addEventListener('click', function() {
    countdownTime = 0;
    currentDigit = -1;
    updateCountdownDisplay();
});