// Stopwatch
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchStartTime;
let stopwatchElapsed = 0;

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsRemainder = milliseconds % 1000;

    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: millisecondsRemainder.toString().padStart(3, '0')
    };
}

function updateStopwatch() {
    const currentTime = Date.now();
    stopwatchElapsed += currentTime - stopwatchStartTime;
    stopwatchStartTime = currentTime;

    const formattedTime = formatTime(stopwatchElapsed);
    document.getElementById('stopwatchHours').textContent = formattedTime.hours;
    document.getElementById('stopwatchMinutes').textContent = formattedTime.minutes;
    document.getElementById('stopwatchSeconds').textContent = formattedTime.seconds;
    document.getElementById('stopwatchMilliseconds').textContent = formattedTime.milliseconds;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchStartTime = Date.now();
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchRunning = true;
        document.getElementById('startStopwatch').textContent = 'Stop';
    } else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        document.getElementById('startStopwatch').textContent = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchElapsed = 0;
    stopwatchRunning = false;
    document.getElementById('startStopwatch').textContent = 'Start';
    const initialTime = formatTime(stopwatchElapsed);
    document.getElementById('stopwatchHours').textContent = initialTime.hours;
    document.getElementById('stopwatchMinutes').textContent = initialTime.minutes;
    document.getElementById('stopwatchSeconds').textContent = initialTime.seconds;
    document.getElementById('stopwatchMilliseconds').textContent = initialTime.milliseconds;
}

document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);

// Countdown
let countdownInterval;
let countdownRunning = false;
let countdownEndTime;

function startCountdown() {
    if (!countdownRunning) {
        const hours = parseInt(document.getElementById('countdownHours').value) || 0;
        const minutes = parseInt(document.getElementById('countdownMinutes').value) || 0;
        const seconds = parseInt(document.getElementById('countdownSeconds').value) || 0;
        const countdownTime = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        if (countdownTime > 0) {
            countdownEndTime = Date.now() + countdownTime;
            countdownInterval = setInterval(updateCountdown, 10);
            countdownRunning = true;
            document.getElementById('startCountdown').textContent = 'Stop';
        } else {
            alert('Please enter a valid countdown time.');
        }
    } else {
        clearInterval(countdownInterval);
        countdownRunning = false;
        document.getElementById('startCountdown').textContent = 'Start';
    }
}

function updateCountdown() {
    const currentTime = Date.now();
    const timeRemaining = Math.max(countdownEndTime - currentTime, 0);
    const formattedTime = formatTime(timeRemaining);

    document.getElementById('countdownHours').value = formattedTime.hours;
    document.getElementById('countdownMinutes').value = formattedTime.minutes;
    document.getElementById('countdownSeconds').value = formattedTime.seconds;

    if (timeRemaining === 0) {
        clearInterval(countdownInterval);
        countdownRunning = false;
        document.getElementById('startCountdown').textContent = 'Start';
        alert('Countdown finished!');
    }
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    document.getElementById('startCountdown').textContent = 'Start';
    document.getElementById('countdownHours').value = '';
    document.getElementById('countdownMinutes').value = '';
    document.getElementById('countdownSeconds').value = '';
}

document.getElementById('startCountdown').addEventListener('click', startCountdown);
document.getElementById('resetCountdown').addEventListener('click', resetCountdown);