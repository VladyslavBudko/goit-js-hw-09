const startBtn = document.querySelector('[data-start]');
const pickerEl = document.querySelector('#datetime-picker');

startBtn.addEventListener('click', startTimer);
pickerEl.addEventListener('click', picker);

function picker(event) {
  console.log(pickerEl);
}

function startTimer(event) {
  console.log(startBtn);
}
