function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

const timer = {
  timerID: null,
  isActive: false,

  changeColor() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtn.style.color = '#390d0d34';
    stopBtn.style = null;

    this.timerID = setInterval(() => {
      bodyEl.style.background = getRandomHexColor();
    }, 1000);
  },

  changeColorStop() {
    clearInterval(this.timerID);
    this.isActive = false;
    startBtn.style = null;
    stopBtn.style.color = '#390d0d34';
  },
};

startBtn.addEventListener('click', () => timer.changeColor());
stopBtn.addEventListener('click', () => timer.changeColorStop());
