
window.onload = function() {
    var startPauseButton = document.getElementById('start-pause');
    var clearButton = document.getElementById('clear');
    var timerInput = document.getElementById('timer-input');
    var intervalId;
    var remainingTime;

    function updateTimerDisplay(time) {
        var minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        var seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, '0');
        var milliseconds = (time % 1000).toString().padStart(3, '0');
        timerInput.value = minutes + ':' + seconds + ' ' + milliseconds;
    }

    startPauseButton.addEventListener('click', function() {
        if (this.textContent === 'Start') {
            remainingTime = parseInputTime(timerInput.value);
            if (remainingTime > 0) {
                intervalId = setInterval(function() {
                    remainingTime -= 10;
                    updateTimerDisplay(remainingTime);
                    if (remainingTime <= 0) {
                        clearInterval(intervalId);
                        startPauseButton.textContent = 'Start';
                        timerInput.value = '00:00:00 000';
                        startPauseButton.style.backgroundColor = '#28a745';
                    }
                }, 10);
                this.textContent = 'Pause';
                this.style.backgroundColor = '#007bff';
            }
        } else if (this.textContent === 'Pause') {
            clearInterval(intervalId);
            this.textContent = 'Continue';
        } else if (this.textContent === 'Continue') {
            intervalId = setInterval(function() {
                remainingTime -= 10;
                updateTimerDisplay(remainingTime);
                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    startPauseButton.textContent = 'Start';
                    timerInput.value = '00:00:00 000';
                    startPauseButton.style.backgroundColor = '#28a745';
                }
            }, 10);
            this.textContent = 'Pause';
            this.style.backgroundColor = '#007bff';
        }
    });

    clearButton.addEventListener('click', function() {
        clearInterval(intervalId);
        updateTimerDisplay(parseInputTime(timerInput.value));
        startPauseButton.textContent = 'Start';
        startPauseButton.style.backgroundColor = '#28a745';
    });

    function parseInputTime(input) {
        var parts = input.split(':');
        var minutes = parseInt(parts[0], 10);
        var seconds = parseInt(parts[1], 10);
        var milliseconds = parseInt(parts[2], 10);
        return ((minutes * 60 + seconds) * 1000 + milliseconds);
    }
};
