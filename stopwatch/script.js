let timer;
let isCountdown = false;
let time = { hours: 0, minutes: 0, seconds: 0 };

const updateDisplay = () => {
  document.getElementById('hours').textContent = String(time.hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(time.minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(time.seconds).padStart(2, '0');
};

const tick = () => {
  if (isCountdown) {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      stopTimer();
      alert('Countdown finished!');
      return;
    }
    // Decrement seconds and handle underflow for minutes and hours
    if (time.seconds > 0) {
      time.seconds--;
    } else {
      time.seconds = 59;
      if (time.minutes > 0) {
        time.minutes--;
      } else {
        time.minutes = 59;
        time.hours--;
      }
    }
  } else {
    // Increment seconds and handle overflow for minutes and hours
    time.seconds++;
    if (time.seconds >= 60) {
      time.seconds = 0;
      time.minutes++;
      if (time.minutes >= 60) {
        time.minutes = 0;
        time.hours++;
      }
    }
  }
  updateDisplay();
};

const startTimer = () => {
  if (!timer) {
    isCountdown = false;
    timer = setInterval(tick, 1000);
  }
};

const startCountdown = () => {
  if (!timer) {
    isCountdown = true;
    // Prompt user for countdown time
    const hours = prompt("Enter hours:", "0");
    const minutes = prompt("Enter minutes:", "0");
    const seconds = prompt("Enter seconds:", "0");
    time = {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10)
    };
    updateDisplay();
    timer = setInterval(tick, 1000);
  }
};

const stopTimer = () => {
  clearInterval(timer);
  timer = null;
};

const resetTimer = () => {
  stopTimer();
  time = { hours: 0, minutes: 0, seconds: 0 };
  updateDisplay();
};

// Initialize display
updateDisplay();
