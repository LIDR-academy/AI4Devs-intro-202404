// Variables to store the initial time and milliseconds
let initialTime = '00:00:00';
let initialMilliseconds = '000';

// Function to update time display on the first screen
function updateDisplay(num) {
    let currentTime = document.getElementById('timeDisplay').innerText.replace(/:/g, '');
    currentTime = (currentTime + num).slice(-6);
    currentTime = currentTime.slice(0, 2) + ':' + currentTime.slice(2, 4) + ':' + currentTime.slice(4, 6);
    document.getElementById('timeDisplay').innerText = currentTime;
}

// Setup button events for the first screen
document.querySelectorAll('#firstScreen button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.innerText === 'Clear') {
            document.getElementById('timeDisplay').innerText = '00:00:00';
            document.getElementById('millisecondDisplay').innerText = '000';
        } else if (this.innerText === 'Set') {
            initialTime = document.getElementById('timeDisplay').innerText;
            initialMilliseconds = document.getElementById('millisecondDisplay').innerText;
            document.getElementById('timeDisplay2').innerText = initialTime;
            document.getElementById('millisecondDisplay2').innerText = initialMilliseconds;
            document.getElementById('firstScreen').style.display = 'none';
            document.getElementById('secondScreen').style.display = 'block';
        } else {
            updateDisplay(this.innerText);
        }
    });
});

// Function to handle countdown including milliseconds
function startCountdown() {
    let [hours, minutes, seconds] = document.getElementById('timeDisplay2').innerText.split(':');
    let milliseconds = parseInt(document.getElementById('millisecondDisplay2').innerText);
    let totalMilliseconds = parseInt(hours) * 3600000 + parseInt(minutes) * 60000 + parseInt(seconds) * 1000 + milliseconds;

    const intervalId = setInterval(() => {
        if (totalMilliseconds <= 0) {
            clearInterval(intervalId);
            document.getElementById('startPauseBtn').innerText = 'Start';
            document.getElementById('startPauseBtn').style.backgroundColor = 'blue';
            return;
        }

        totalMilliseconds -= 10;
        let remainingHours = Math.floor(totalMilliseconds / 3600000);
        let remainingMinutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        let remainingSeconds = Math.floor((totalMilliseconds % 60000) / 1000);
        let remainingMilliseconds = totalMilliseconds % 1000;

        document.getElementById('timeDisplay2').innerText = `${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        document.getElementById('millisecondDisplay2').innerText = remainingMilliseconds.toString().padStart(3, '0');
    }, 10);

    return intervalId;
}

let countdownInterval;
document.getElementById('startPauseBtn').addEventListener('click', function() {
    if (this.innerText === 'Start') {
        this.innerText = 'Pause';
        this.style.backgroundColor = 'green';
        countdownInterval = startCountdown();
    } else if (this.innerText === 'Pause') {
        this.innerText = 'Continue';
        this.style.backgroundColor = 'blue';
        clearInterval(countdownInterval);
    } else if (this.innerText === 'Continue') {
        this.innerText = 'Pause';
        this.style.backgroundColor = 'green';
        countdownInterval = startCountdown();
    }
});

// Clear Button on Second Screen
document.getElementById('clearBtn2').addEventListener('click', function() {
    clearInterval(countdownInterval);
    document.getElementById('timeDisplay2').innerText = initialTime;
    document.getElementById('millisecondDisplay2').innerText = initialMilliseconds;
    document.getElementById('startPauseBtn').innerText = 'Start';
    document.getElementById('startPauseBtn').style.backgroundColor = 'blue';
});

// Back Button
document.getElementById('backBtn').addEventListener('click', function() {
    clearInterval(countdownInterval);
    document.getElementById('timeDisplay').innerText = '00:00:00';
    document.getElementById('millisecondDisplay').innerText = '000';
    document.getElementById('timeDisplay2').innerText = '00:00:00';
    document.getElementById('millisecondDisplay2').innerText = '000';
    document.getElementById('firstScreen').style.display = 'block';
    document.getElementById('secondScreen').style.display = 'none';
});
