document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const numbersDiv = document.getElementById("numbers");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");
  const setBtn = document.getElementById("set-btn");

  let timerInterval;
  let currentTime = 0;
  let countdownTime = 0;
  let isRunning = false;
  let isStopwatch = true;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function updateCountdownDisplay(btnValue) {
    let currentDisplay = timeDisplay.textContent.replace(/:/g, '');
    currentDisplay = currentDisplay.substring(1);
    currentDisplay += btnValue;
    const formattedDisplay = currentDisplay.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
    timeDisplay.textContent = formattedDisplay;
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (isStopwatch) {
        currentTime++;
      } else {
        countdownTime--;
        if (countdownTime <= 0) {
          stopTimer();
          updateDisplay();
          return;
        }
      }
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Continue";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    countdownTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    isStopwatch = true;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "none";
  });

  countdownBtn.addEventListener("click", function () {
    isStopwatch = false;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "block";
  });

  startStopContinueBtn.addEventListener("click", function () {
    if (isStopwatch) {
      toggleTimer();
    } else {
      if (!isRunning) {
        startTimer();
        startStopContinueBtn.style.display = "none";
      }
    }
  });

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  setBtn.addEventListener("click", function () {
    const inputSeconds = parseInt(timeDisplay.textContent.slice(6, 8));
    countdownTime = inputSeconds;
    startTimer();
    startStopContinueBtn.style.display = "none";
    numbersDiv.style.display = "none";
  });

  numbersDiv.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.textContent;
      updateCountdownDisplay(buttonText);
    }
  });

  updateDisplay();
});
