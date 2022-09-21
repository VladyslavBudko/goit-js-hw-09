function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

startRef.addEventListener('click', changeColor);
stopRef.addEventListener('click', changeColorStop);

let timerID = null;

function changeColor(event) {
  startRef.classList.add('is-active');
  stopRef.classList.remove('is-active');

  timerID = setInterval(() => {
    console.log(event.target);
    console.log(timerID);
  }, 1000);
}

function changeColorStop(event) {
  stopRef.classList.add('is-active');
  startRef.classList.remove('is-active');

  clearInterval(timerID);
  console.log(event.target);
  console.log(timerID);
}
