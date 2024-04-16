let stopwatchInterval;
let countdownInterval;
let stopwatchSeconds = 0;
let countdownSeconds = 0;

function startStopwatch() {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function updateStopwatch() {
    stopwatchSeconds++;
    const hours = Math.floor(stopwatchSeconds / 3600);
    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    const seconds = stopwatchSeconds % 60;
    const displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('stopwatchDisplay').innerText = displayTime;
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    document.getElementById('stopwatchDisplay').innerText = '00:00:00';
}

function startCountdown() {
    const inputSeconds = parseInt(document.getElementById('countdownInput').value);
    if (!isNaN(inputSeconds)) {
        countdownSeconds = inputSeconds;
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

function updateCountdown() {
    if (countdownSeconds > 0) {
        countdownSeconds--;
        const minutes = Math.floor(countdownSeconds / 60);
        const seconds = countdownSeconds % 60;
        const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('countdownDisplay').innerText = displayTime;
    } else {
        stopCountdown();
        alert('Countdown finished!');
    }
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownSeconds = 0;
    document.getElementById('countdownInput').value = '';
    document.getElementById('countdownDisplay').innerText = '00:00';
}
