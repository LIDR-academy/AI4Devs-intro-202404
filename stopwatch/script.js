document.addEventListener('DOMContentLoaded', () => {
  const stopwatchBtn = document.getElementById('stopwatchBtn');
  const countdownBtn = document.getElementById('countdownBtn');
  const timerContainer = document.getElementById('timerContainer');
  const countdownContainer = document.getElementById('countdownContainer');
  const stopwatchDisplay = document.getElementById('stopwatchDisplay');
  const countdownDisplay = document.getElementById('countdownDisplay');
  const startPauseBtn = document.getElementById('startPauseBtn');
  const clearBtn = document.getElementById('clearBtn');
  const numberBtns = document.querySelectorAll('.numberBtn');
  const setBtn = document.getElementById('setBtn');
  const clearCountdownBtn = document.getElementById('clearCountdownBtn');

  let stopwatchInterval;
  let countdownInterval;
  let stopwatchTime = 0;
  let countdownTime = 0;

  function formatStopwatchTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  }

  function updateStopwatch() {
    stopwatchInterval = setInterval(() => {
      stopwatchTime += 1;
      stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
    }, 1);
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00.0';
  }

  function formatCountdownTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  }

  function updateCountdown() {
    countdownInterval = setInterval(() => {
      countdownTime -= 1;
      countdownDisplay.textContent = formatCountdownTime(countdownTime);
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '00:00:00.0';
        alert('Countdown finished!');
      }
    }, 1);
  }

  function setCountdownTime() {
    countdownTime = parseFloat(countdownDisplay.textContent) * 1000;
    clearInterval(countdownInterval);
    numberBtns.forEach(btn => btn.style.display = 'none');
    setBtn.style.display = 'none';
    startPauseBtn.style.display = 'inline-block';
    startPauseBtn.textContent = 'Start';

    startPauseBtn.onclick = () => {
      if (startPauseBtn.textContent === 'Start') {
        updateCountdown();
        startPauseBtn.textContent = 'Pause';
      } else if (startPauseBtn.textContent === 'Pause') {
        clearInterval(countdownInterval);
        startPauseBtn.textContent = 'Continue';
      } else {
        updateCountdown();
        startPauseBtn.textContent = 'Pause';
      }
    };
  }

  function updateCountdownDisplay(btnValue) {
    let currentDisplay = countdownDisplay.textContent.replace(/:/g, '');
  
    currentDisplay = currentDisplay.substring(1);
    currentDisplay += btnValue;
  
    const formattedDisplay = currentDisplay.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
  
    countdownDisplay.textContent = formattedDisplay;
  }  
   

  stopwatchBtn.addEventListener('click', () => {
    timerContainer.style.display = 'block';
    countdownContainer.style.display = 'none';
    clearInterval(countdownInterval);
    resetStopwatch();

    startPauseBtn.textContent = 'Start';
    startPauseBtn.onclick = () => {
      if (startPauseBtn.textContent === 'Start') {
        updateStopwatch();
        startPauseBtn.textContent = 'Pause';
      } else if (startPauseBtn.textContent === 'Pause') {
        clearInterval(stopwatchInterval);
        startPauseBtn.textContent = 'Continue';
      } else {
        updateStopwatch();
        startPauseBtn.textContent = 'Pause';
      }
    };

    clearBtn.onclick = resetStopwatch;
  });

  countdownBtn.addEventListener('click', () => {
    timerContainer.style.display = 'none';
    countdownContainer.style.display = 'block';
    clearInterval(stopwatchInterval);
    resetStopwatch();

    countdownDisplay.textContent = '00:00:00';

    for (const btn of numberBtns) {
      btn.style.display = 'inline-block';
      btn.onclick = () => {
        const btnValue = btn.textContent;
        updateCountdownDisplay(btnValue);
      };
    }    

    setBtn.style.display = 'inline-block';
    setBtn.onclick = setCountdownTime;

    clearCountdownBtn.onclick = () => {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = '00:00:00.0';
      countdownTime = 0;
    };
  });
});
