let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    // change the button to say 'Stop' instead of 'Start'
    document.getElementById('startStop').innerText = 'Stop';
    running = true;
  } else {
    clearInterval(tInterval);
    document.getElementById('startStop').innerText = 'Start';
    running = false;
  }
}

function clearTimer(){
  clearInterval(tInterval);
  running = false;
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('startStop').innerText = 'Start';
}

function getShowTime(){
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  // Calculate the time components
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % (1000 * 60)) / 10);

  // Format to 2 digits
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  
  document.getElementById('display').innerText = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

// Event listeners for buttons
document.getElementById('startStop').addEventListener('click', startTimer);
document.getElementById('clear').addEventListener('click', clearTimer);
