import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  pickerEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let isActive = false;
refs.startBtn.style.color = '#390d0d34';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr) {
    console.log(selectedDates[0]);
    console.log('Pаспродажа начнется:', dateStr);
    const date = new Date();
    console.log(date);

    if (selectedDates[0] - date < 0) {
      window.alert('Please choose a date in the future');
      return;
    };

    startBtn.style = null;
    isActive = true;
  },
};

flatpickr('input', options);


class Timer {
  constructor({ onTick }) {
    this.timerID = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  init() {
    const time = convertMs(0);
    this.onTick(time);
  }

  startTimer() {
    if (!this.isActive) {
      return;
    }

    const startTime = Date.now();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);
      this.onTick(time);

      if (time = 0) {
        console.log("Распродажа началась!", startTime);
        return;
      } 
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

/*
 * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
 */
function pad(value) {
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