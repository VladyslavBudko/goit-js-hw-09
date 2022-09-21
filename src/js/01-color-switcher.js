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
    this.timerID = setInterval(() => {
    //   console.log(event.target);
      console.log(this.timerID);

      bodyEl.backgroundColor = getRandomHexColor;
      // bodyEl.setAttribute('background-color', getRandomHexColor());
    //   console.log(bodyEl);
    }, 1000);
  },

  changeColorStop() {
    clearInterval(this.timerID);
    this.isActive = false;

    // console.log(event.target);
    console.log(this.timerID);
  },
};

startBtn.addEventListener('click',() => timer.changeColor());
stopBtn.addEventListener('click',() => timer.changeColorStop());
