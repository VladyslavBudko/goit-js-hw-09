const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
  }

  changeColor() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtn.style.color = '#390d0d34';
    stopBtn.style = null;

    this.timerID = setInterval(() => {
      bodyEl.style.background = this.getRandomHexColor();
    }, 1000);
  }

  changeColorStop() {
    clearInterval(this.timerID);
    this.isActive = false;
    startBtn.style = null;
    stopBtn.style.color = '#390d0d34';
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

const timer = new Timer();

startBtn.addEventListener('click', timer.changeColor.bind(timer));
stopBtn.addEventListener('click', timer.changeColorStop.bind(timer));
