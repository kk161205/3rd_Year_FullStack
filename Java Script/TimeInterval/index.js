const minDisplay = document.getElementById("min");
const secDisplay = document.getElementById("sec");

let minutes = 15;
let seconds = 0;
let interval = null;

function startTimer() {
  if (interval !== null) return; 

  interval = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      alert("Time Over");
      clearInterval(interval);
      interval = null;
      return;
    }

    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    minDisplay.textContent = minutes;
    secDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  minutes = 15;
  seconds = 0;
  minDisplay.textContent = minutes;
  secDisplay.textContent = "00";
}
