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
    this.startPauseButton = document.getElementById('startPauseButton');
    this.clearButton = document.getElementById('clearButton');
    this.clearButton.classList.add('disabled');
    this.startPauseButton.addEventListener('click', this.startPauseCountdown.bind(this));
    this.clearButton.addEventListener('click', this.clearCountdown.bind(this));
  }

  startPauseCountdown() {
    if (this.isCountdownRunning) {
      clearInterval(this.countdownInterval);
      this.startPauseButton.innerText = 'Continue';
    } else {
      this.startCountdown();
      this.startPauseButton.innerText = 'Pause';
      this.clearButton.classList.remove('disabled');
    }
    this.isCountdownRunning = !this.isCountdownRunning;
  }

  startCountdown() {
    clearInterval(this.countdownInterval);

    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const millisecondsInput = document.getElementById('milliseconds');

    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const milliseconds = parseInt(millisecondsInput.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(milliseconds)) {
      alert('Please enter valid numbers for hours, minutes, seconds, and milliseconds.');
      return;
    }

    const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;

    let currentMillisecond = totalMilliseconds;
    this.startTime = performance.now();

    this.countdownInterval = setInterval(() => {
      const elapsedTime = performance.now() - this.startTime;
      const remainingMilliseconds = currentMillisecond - elapsedTime;
      const remainingHours = Math.floor(remainingMilliseconds / 3600000);
      const remainingMinutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
      const remainingSeconds = Math.floor((remainingMilliseconds % 60000) / 1000);
      const remainingMillisecondsPadded = Math.floor(remainingMilliseconds % 1000).toString().padStart(3, '0');

      hoursInput.value = remainingHours.toString().padStart(2, '0');
      minutesInput.value = remainingMinutes.toString().padStart(2, '0');
      secondsInput.value = remainingSeconds.toString().padStart(2, '0');
      millisecondsInput.value = remainingMillisecondsPadded;

      if (remainingMilliseconds <= 0) {
        clearInterval(this.countdownInterval);
        alert('Countdown completed!');
        hoursInput.value = '00';
        minutesInput.value = '00';
        secondsInput.value = '00';
        millisecondsInput.value = '000';
        this.isCountdownRunning = false;
        this.startPauseButton.innerText = 'Start';
      }
    }, 10);
  }

  clearCountdown() {
    clearInterval(this.countdownInterval);
    document.getElementById('hours').value = '0';
    document.getElementById('minutes').value = '0';
    document.getElementById('seconds').value = '0';
    document.getElementById('milliseconds').value = '0';

    this.isCountdownRunning = false;
    this.startPauseButton.innerText = 'Start';
    this.clearButton.classList.add('disabled');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const showStopwatchButton = document.getElementById('showStopwatch');
  const showCountdownButton = document.getElementById('showCountdown');
  const stopwatchSection = document.querySelector('.stopwatch');
  const countdownSection = document.querySelector('.countdown');
  const backButton = document.getElementById('backButton');
  const title = document.querySelector('.title');
  backButton.style.display = 'none';

  showStopwatchButton.addEventListener('click', () => {
    title.style.display = 'none';
    stopwatchSection.style.display = 'block';
    countdownSection.style.display = 'none';
    showStopwatchButton.style.display = 'none';
    showCountdownButton.style.display = 'none';
    backButton.style.display = 'block';
  });

  showCountdownButton.addEventListener('click', () => {
    title.style.display = 'none';
    stopwatchSection.style.display = 'none';
    countdownSection.style.display = 'block';
    showStopwatchButton.style.display = 'none';
    showCountdownButton.style.display = 'none';
    backButton.style.display = 'block';
  });

  backButton.addEventListener('click', () => {
    title.style.display = 'block';
    stopwatchSection.style.display = 'none';
    countdownSection.style.display = 'none';
    showStopwatchButton.style.display = 'inline-block';
    showCountdownButton.style.display = 'inline-block';
    backButton.style.display = 'none';
  });

  new Stopwatch();
  new CountdownTimer();
});

