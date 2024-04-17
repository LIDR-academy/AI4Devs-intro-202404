class Stopwatch {
  constructor() {
    this.displayTimeElement = document.querySelector('.display-time');
    this.millisecondsElement = document.querySelector('.milliseconds');
    this.startBtn = document.getElementById('start-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.clearBtn.classList.add('disabled');
    this.startTime = null;
    this.elapsedTime = 0;
    this.timerId = null;
    this.isRunning = false;
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.startBtn.addEventListener('click', this.toggleStartStop.bind(this));
    this.clearBtn.addEventListener('click', this.clear.bind(this));
  }

  toggleStartStop() {
    if (!this.isRunning) {
      this.start();
    } else {
      this.pause();
    }
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerId = setInterval(this.updateTime.bind(this), 10);
      this.isRunning = true;
      this.startBtn.textContent = 'Pause';
      this.startBtn.classList.remove('continue');
      this.startBtn.classList.add('pause');
      this.clearBtn.classList.remove('disabled');
      document.body.classList.remove('paused');
    }
  }

  pause() {
    clearInterval(this.timerId);
    this.isRunning = false;
    this.startBtn.textContent = 'Continue';
    this.startBtn.classList.remove('pause');
    this.startBtn.classList.add('continue');
    document.body.classList.add('paused');
  }

  clear() {
    clearInterval(this.timerId);
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.updateTime();
    this.displayTimeElement.textContent = '00:00:00';
    this.millisecondsElement.textContent = '000';
    this.startBtn.textContent = 'Start';
    this.startBtn.classList.remove('pause', 'continue');
    this.startBtn.classList.add('start');
    this.clearBtn.classList.add('disabled');
    document.body.classList.remove('paused');
  }

  updateTime() {
    if (this.startTime !== null) {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - this.startTime;
      let hours = Math.floor(this.elapsedTime / (1000 * 60 * 60));
      let minutes = Math.floor((this.elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((this.elapsedTime % (1000 * 60)) / 1000);
      let milliseconds = this.elapsedTime % 1000;

      this.displayTimeElement.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      this.millisecondsElement.textContent = this.pad(milliseconds, 3);
    }
  }

  pad(value, length = 2) {
    return value.toString().padStart(length, '0');
  }
}

class CountdownTimer {
  constructor() {
    this.countdownInterval = null;
    this.isCountdownRunning = false;
    this.startTime = null;

    // Select buttons
    this.startPauseButton = document.getElementById('startPauseButton');
    this.clearButton = document.getElementById('clearButton');

    // Add event listeners
    this.startPauseButton.addEventListener('click', this.startPauseCountdown.bind(this));
    this.clearButton.addEventListener('click', this.clearCountdown.bind(this));
  }

  startPauseCountdown() {
    if (this.isCountdownRunning) {
      // If countdown is running, pause it
      clearInterval(this.countdownInterval);
      this.startPauseButton.innerText = 'Continue'; // Change button text to "Continue"
    } else {
      // If countdown is paused or hasn't started, start it
      this.startCountdown();
      this.startPauseButton.innerText = 'Pause'; // Change button text to "Pause"
    }

    // Toggle the countdown state
    this.isCountdownRunning = !this.isCountdownRunning;
  }

  startCountdown() {
    // Clear any existing countdown interval
    clearInterval(this.countdownInterval);

    // Get the input values for hours, minutes, seconds, and milliseconds
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const millisecondsInput = document.getElementById('milliseconds');

    // Convert input values to integers
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const milliseconds = parseInt(millisecondsInput.value);

    // Validate input values
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(milliseconds)) {
      alert('Please enter valid numbers for hours, minutes, seconds, and milliseconds.');
      return;
    }

    // Calculate the total number of milliseconds
    const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;

    // Start the countdown
    let currentMillisecond = totalMilliseconds;
    this.startTime = performance.now();

    this.countdownInterval = setInterval(() => {
      // Calculate elapsed time since the start of the countdown
      const elapsedTime = performance.now() - this.startTime;

      // Calculate remaining hours, minutes, seconds, and milliseconds
      const remainingMilliseconds = currentMillisecond - elapsedTime;
      const remainingHours = Math.floor(remainingMilliseconds / 3600000);
      const remainingMinutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
      const remainingSeconds = Math.floor((remainingMilliseconds % 60000) / 1000);
      const remainingMillisecondsPadded = Math.floor(remainingMilliseconds % 1000).toString().padStart(3, '0');

      // Update the countdown display
      hoursInput.value = remainingHours.toString().padStart(2, '0');
      minutesInput.value = remainingMinutes.toString().padStart(2, '0');
      secondsInput.value = remainingSeconds.toString().padStart(2, '0');
      millisecondsInput.value = remainingMillisecondsPadded;

      // If countdown reaches zero, clear the interval
      if (remainingMilliseconds <= 0) {
        clearInterval(this.countdownInterval);
        alert('Countdown completed!');
        hoursInput.value = '00';
        minutesInput.value = '00';
        secondsInput.value = '00';
        millisecondsInput.value = '000';
        this.isCountdownRunning = false;
        this.startPauseButton.innerText = 'Start'; // Change button text to "Start" when countdown completes
      }
    }, 10); // Update every 10 milliseconds
  }

  clearCountdown() {
    // Clear the interval and reset input fields to zero
    clearInterval(this.countdownInterval);
    document.getElementById('hours').value = '0';
    document.getElementById('minutes').value = '0';
    document.getElementById('seconds').value = '0';
    document.getElementById('milliseconds').value = '0';

    // Reset the countdown state
    this.isCountdownRunning = false;
    this.startPauseButton.innerText = 'Start'; // Change button text to "Start" when countdown is cleared
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Stopwatch();
  new CountdownTimer();
});
