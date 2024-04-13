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

document.addEventListener('DOMContentLoaded', () => {
  new Stopwatch();
});
