import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  pickerEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
  fieldsValueEl: document.querySelectorAll('.value'),
  fieldsLabelEl: document.querySelectorAll('.label'),
};

refs.timerEl.style.display = 'flex';
refs.timerEl.style.justifyContent = 'space-evenly';
for (const fieldValueEl of refs.fieldsValueEl) {
  fieldValueEl.style.display = 'flex';
  fieldValueEl.style.flexDirection = 'column';
  fieldValueEl.style.fontSize = '30px';
  fieldValueEl.style.alignItems = 'center';
}
for (const fieldLabelEl of refs.fieldsLabelEl) {
  fieldLabelEl.style.textTransform = 'uppercase';
}

let isActive = false;
refs.startBtn.style.color = '#390d0d34';
let startTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr) {
    startTime = selectedDates[0];
    const date = new Date();

    if (selectedDates[0] - date < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      return;
    }

    // console.log('Pаспродажа начнется:', dateStr);
    Notiflix.Notify.success(`Pаспродажа начнется:, ${dateStr}`);

    refs.startBtn.style = null;
    isActive = true;
  },
};

flatpickr('input', options);

class Timer {
  constructor({ onTick }) {
    this.timerID = null;
    this.onTick = onTick;
    this.isActive = false;
  }

  startTimer() {
    if (this.isActive || startTime < Date.now()) {
      return;
    }
    this.isActive = true;
    refs.startBtn.style.color = '#390d0d34';

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
        // console.log('Распродажа началась!', startTime);
        Notiflix.Notify.success(`Распродажа началась!!!`);
        this.isActive = false;
        refs.startBtn.style = null;
      }

      const time = convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.startTimer.bind(timer));

// * - Адская копипаста со стека 💩

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

/*
 * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
 */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается дней/часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
