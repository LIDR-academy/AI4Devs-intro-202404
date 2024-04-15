let timerInterval;
let timerRunning = false;
let timerValue = 0;

const txtTimer = document.getElementById('txtTimer');
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

function startTimer() {
    timerRunning = true;
    btnStart.innerText = 'Pause';
    btnStart.style.backgroundColor = 'lightblue';
    timerInterval = setInterval(updateTimer, 1);
}

function pauseTimer() {
    timerRunning = false;
    btnStart.innerText = 'Continue';
    btnStart.style.backgroundColor = 'green';
    clearInterval(timerInterval);
}

function continueTimer() {
    timerRunning = true;
    btnStart.innerText = 'Pause';
    btnStart.style.backgroundColor = 'lightblue';
    timerInterval = setInterval(updateTimer, 1);
}

function resetTimer() {
    timerRunning = false;
    btnStart.innerText = 'Start';
    btnStart.style.backgroundColor = 'green';
    clearInterval(timerInterval);
    timerValue = 0;
    updateTimerDisplay();
}

function updateTimer() {
    timerValue += 1;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const milliseconds = timerValue % 1000;
    const seconds = Math.floor((timerValue / 1000) % 60);
    const minutes = Math.floor((timerValue / (1000 * 60)) % 60);
    const hours = Math.floor((timerValue / (1000 * 60 * 60)) % 24);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
    txtTimer.value = formattedTime;
}

function pad(num, size = 2) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

btnStart.addEventListener('click', function () {
    if (!timerRunning) {
        startTimer();
    } else {
        if (btnStart.innerText === 'Pause') {
            pauseTimer();
        } else {
            continueTimer();
        }
    }
});

btnReset.addEventListener('click', resetTimer);

// Initial setup
resetTimer();
