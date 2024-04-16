// Landing page logic
const landingPage = document.getElementById('landing');
const stopwatchSection = document.getElementById('stopwatch');
const countdownSection = document.getElementById('countdown');
const toStopwatchButton = document.getElementById('toStopwatch');
const toCountdownButton = document.getElementById('toCountdown');

toStopwatchButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    stopwatchSection.style.display = 'block';
});

toCountdownButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    countdownSection.style.display = 'block';
    // Additional logic to initialize countdown timer will go here
});

// Stopwatch logic
let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

startStopButton.addEventListener('click', () => {
    if (startStopButton.textContent === 'Start') {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            stopwatchDisplay.textContent = formatTime(stopwatchTime);
        }, 1000);
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(stopwatchInterval);
        startStopButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
});

function formatTime(timeInSeconds) {
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 3600);
    return [hours, minutes, seconds]
        .map(val => val < 10 ? `0${val}` : val)
        .join(':');
}

// Countdown logic
const countdownDisplay = document.getElementById('countdown-display');
const setCountdownButton = document.getElementById('set-countdown');
const startCountdownButton = document.getElementById('start-countdown');
let countdownTime = 0;
let countdownInterval;

// Generate number buttons for time input
const numberInputs = document.getElementById('number-inputs');
for (let i = 0; i <= 9; i++) {
    let numberButton = document.createElement('button');
    numberButton.textContent = i;
    numberButton.className = 'number-button';
    numberButton.onclick = () => appendNumber(i);
    numberInputs.appendChild(numberButton);
}

function appendNumber(number) {
    if (countdownTime.toString().length < 6) {
        countdownTime = countdownTime * 10 + number;
        countdownDisplay.textContent = formatTime(countdownTime);
    }
}

setCountdownButton.addEventListener('click', () => {
    countdownTime = convertDisplayTimeToSeconds(countdownDisplay.textContent);
    countdownDisplay.textContent = formatTime(countdownTime);
});

startCountdownButton.addEventListener('click', () => {
    if (startCountdownButton.textContent === 'Start') {
        startCountdownButton.textContent = 'Stop';
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                countdownDisplay.textContent = formatTime(countdownTime);
            } else {
                clearInterval(countdownInterval);
                startCountdownButton.textContent = 'Start';
                alert('Countdown finished!');
            }
        }, 1000);
    } else {
        clearInterval(countdownInterval);
        startCountdownButton.textContent = 'Start';
    }
});

function convertDisplayTimeToSeconds(displayTime) {
    let parts = displayTime.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
}
