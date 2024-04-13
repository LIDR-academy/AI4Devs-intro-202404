let stopwatchInterval;
let countdownInterval;
let stopwatchTime = 0;
let countdownTime = "";

function updateDisplay(elementId, time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    document.getElementById(elementId).textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('stopwatch-btn').addEventListener('click', function () {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('stopwatch').classList.remove('hidden');
});

document.getElementById('countdown-btn').addEventListener('click', function () {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('countdown').classList.remove('hidden');
    document.getElementById('numeric-keypad').classList.remove('hidden');
});

document.querySelectorAll('.back').forEach(function (button) {
    button.addEventListener('click', function () {
        clearInterval(stopwatchInterval);
        clearInterval(countdownInterval);
        stopwatchTime = 0;
        countdownTime = "";
        updateDisplay('time', stopwatchTime);
        updateDisplay('timer', countdownTime);
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('stopwatch').classList.add('hidden');
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('numeric-keypad').classList.add('hidden');
    });
});

document.getElementById('start').addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(function () {
        stopwatchTime++;
        updateDisplay('time', stopwatchTime);
    }, 1000);
});

document.getElementById('clear').addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateDisplay('time', stopwatchTime);
});

document.getElementById('set').addEventListener('click', function () {
    clearInterval(countdownInterval);
    countdownTime = parseInt(document.getElementById('timer').textContent.replace(/:/g, ''), 10);
    document.getElementById('numeric-keypad').classList.add('hidden');
    countdownInterval = setInterval(function () {
        if (countdownTime > 0) {
            countdownTime--;
            updateDisplay('timer', countdownTime);
        } else {
            clearInterval(countdownInterval);
            alert('Time is up!');
        }
    }, 1000);
});

document.getElementById('clear-countdown').addEventListener('click', function () {
    countdownTime = "";
    updateCountdownDisplay();
});

function updateCountdownDisplay() {
    let timeStr = countdownTime.toString().padStart(6, '0');
    // Break the string into HH, MM, SS components
    let hours = timeStr.substr(0, 2);
    let minutes = timeStr.substr(2, 2);
    let seconds = timeStr.substr(4, 2);
    // Correct any invalid time entries
    //minutes = parseInt(minutes, 10) > 59 ? '59' : minutes;
    //seconds = parseInt(seconds, 10) > 59 ? '59' : seconds;
    // Update display with corrected time string
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

document.querySelectorAll('.number').forEach(function (button) {
    button.addEventListener('click', function () {
        let number = this.textContent;
        if (countdownTime.length < 6) {
            countdownTime += number;
        }

        updateCountdownDisplay();
    });
});
