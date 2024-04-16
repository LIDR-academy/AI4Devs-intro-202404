document.addEventListener('DOMContentLoaded', function() {
    const stopwatchBtn = document.getElementById('stopwatch-btn');
    const timerBtn = document.getElementById('timer-btn');
    const content = document.getElementById('content');
    const modalBody = document.getElementById('modal-body');

    let activeScreen = null;
    let stopwatchInterval = null;
    let timerInterval = null;
    let timerDuration = 0;
    let timerRunning = false;
    let timerPaused = false;
    let previousTimerDuration = 0;

    stopwatchBtn.addEventListener('click', function() {
        renderStopwatchScreen();
    });

    timerBtn.addEventListener('click', function() {
        renderTimerScreen();
    });

    function renderStopwatchScreen() {
        activeScreen = 'stopwatch';
        content.innerHTML = `
      <h2 class="text-center my-4">Stopwatch</h2>
      <div class="mt-4 text-center" id="stopwatch-display">00:00:00</div>
      <div class="text-center">
        <button class="btn btn-success" id="start-btn">Start</button>
        <button class="btn btn-danger mx-2" id="reset-btn">Reset</button>
        <button class="btn btn-warning" id="stop-btn">Stop</button>
      </div>
    `;
        document.getElementById('start-btn').addEventListener('click', startStopwatch);
        document.getElementById('reset-btn').addEventListener('click', resetStopwatch);
        document.getElementById('stop-btn').addEventListener('click', stopStopwatch);
    }

    function renderTimerScreen() {
        activeScreen = 'timer';
        content.innerHTML = `
      <h2 class="text-center my-4">Timer</h2>
      <div class="mb-3 text-center">
        <label for="hours">Hours:</label>
        <input type="number" id="hours" min="0" value="0">
        <label for="minutes">Minutes:</label>
        <input type="number" id="minutes" min="0" max="59" value="0">
        <label for="seconds">Seconds:</label>
        <input type="number" id="seconds" min="0" max="59" value="0">
        <label for="milliseconds">Milliseconds:</label>
        <input type="number" id="milliseconds" min="0" max="999" value="0">
      </div>
      <div class="mt-4 text-center" id="timer-display">00:00:00:000</div>
      <div class="text-center">
        <button class="btn btn-primary" id="start-timer-btn">Start</button>
        <button class="btn btn-secondary mx-2" id="pause-timer-btn" style="display:none;">Pause</button>
        <button class="btn btn-secondary mx-2" id="resume-timer-btn" style="display:none;">Resume</button>
        <button class="btn btn-secondary mx-2" id="cancel-timer-btn">Cancel</button>
      </div>
    `;
        document.getElementById('start-timer-btn').addEventListener('click', startTimer);
        document.getElementById('pause-timer-btn').addEventListener('click', pauseTimer);
        document.getElementById('resume-timer-btn').addEventListener('click', resumeTimer);
        document.getElementById('cancel-timer-btn').addEventListener('click', cancelTimer);
    }

    function startStopwatch() {
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        stopwatchInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            document.getElementById('stopwatch-display').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
        }, 1000);
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        document.getElementById('stopwatch-display').innerText = '00:00:00';
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
    }

    function startTimer() {
        const hours = parseInt(document.getElementById('hours').value);
        const minutes = parseInt(document.getElementById('minutes').value);
        const seconds = parseInt(document.getElementById('seconds').value);
        const milliseconds = parseInt(document.getElementById('milliseconds').value);

        if (isNaN(hours) && isNaN(minutes) && isNaN(seconds) && isNaN(milliseconds)) {
            alert('Please enter valid values for hours, minutes, seconds, and milliseconds.');
            return;
        }

        timerDuration = (hours * 3600 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
        timerInterval = setInterval(updateTimerDisplay, 1);
        timerRunning = true;
        updateTimerButtons();
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        timerPaused = true;
        previousTimerDuration = timerDuration;
        updateTimerButtons();
    }

    function resumeTimer() {
        timerDuration = previousTimerDuration;
        timerInterval = setInterval(updateTimerDisplay, 1);
        timerRunning = true;
        timerPaused = false;
        updateTimerButtons();
    }

    function cancelTimer() {
        clearInterval(timerInterval);
        document.getElementById('timer-display').innerText = '00:00:00:000';
        timerRunning = false;
        timerPaused = false;
        updateTimerButtons();
    }

    function updateTimerDisplay() {
        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            timerPaused = false;
            updateTimerButtons();
            document.getElementById('timer-display').innerText = '00:00:00:000';
            alert('Timer finished!');
            return;
        }

        const hours = Math.floor(timerDuration / (3600 * 1000));
        const minutes = Math.floor((timerDuration % (3600 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timerDuration % (60 * 1000)) / 1000);
        const milliseconds = timerDuration % 1000;

        document.getElementById('timer-display').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds, true);

        timerDuration -= 1;
    }

    function formatTime(time, isMilliseconds = false) {
        if (isMilliseconds) {
            return time < 10 ? '00' + time : (time < 100 ? '0' + time : time);
        }
        return time < 10 ? '0' + time : time;
    }

    function updateTimerButtons() {
        const startBtn = document.getElementById('start-timer-btn');
        const pauseBtn = document.getElementById('pause-timer-btn');
        const resumeBtn = document.getElementById('resume-timer-btn');
        const cancelBtn = document.getElementById('cancel-timer-btn');

        if (timerRunning && !timerPaused) {
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            resumeBtn.style.display = 'none';
            cancelBtn.style.display = 'inline-block';
        } else if (!timerRunning && timerPaused) {
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'none';
            resumeBtn.style.display = 'inline-block';
            cancelBtn.style.display = 'inline-block';
        } else {
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
        }
    }

    // Toggle navbar to switch between stopwatch and timer
    function toggleNavbar() {
        if (activeScreen === 'stopwatch') {
            stopwatchBtn.classList.add('active');
            timerBtn.classList.remove('active');
        } else if (activeScreen === 'timer') {
            timerBtn.classList.add('active');
            stopwatchBtn.classList.remove('active');
        }
    }

    // Initial render
    renderStopwatchScreen();
    toggleNavbar();
});
