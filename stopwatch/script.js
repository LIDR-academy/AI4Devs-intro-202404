class Stopwatch {
  constructor() {
    this.timeElement = document.querySelector('.time');
    this.startBtn = document.getElementById('start-btn');
    this.clearBtn = document.getElementById('clear-btn');
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
    this.startTime = Date.now() - this.elapsedTime;
    this.timerId = setInterval(this.updateTime.bind(this), 10);
    this.isRunning = true;
    this.startBtn.textContent = 'Pause';
    this.startBtn.classList.remove('start');
    this.startBtn.classList.add('pause');
    this.clearBtn.classList.remove('disabled');
    document.body.classList.remove('paused');
  }

  pause() {
    clearInterval(this.timerId);
    this.elapsedTime = Date.now() - this.startTime;
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
    this.startBtn.textContent = 'Start';
    this.startBtn.classList.remove('pause', 'continue');
    this.startBtn.classList.add('start');
    this.clearBtn.classList.add('disabled');
    document.body.classList.remove('paused');
  }

  updateTime() {
    const currentTime = Date.now() - this.startTime + this.elapsedTime;
    const hours = Math.floor(currentTime / (1000 * 60 * 60));
    const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const milliseconds = currentTime % 1000;
    this.timeElement.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds, 3)}`;
  }

  pad(value, length = 2) {
    return value.toString().padStart(length, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Stopwatch();
});