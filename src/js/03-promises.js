const refs = {
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

refs.submitBtn.addEventListener('submit', start());

function start(evt) {
  evt.preventDefault();

  const createPromise = ({ AMOUNT, DELAY, STEP }) => {
    return new Promise((resolve, reject) => {
      for (let position = 1; position <= AMOUNT; position += 1) {
        let delay = DELAY;
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
          if (shouldResolve) {
            resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
          }

          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
        delay += STEP;
      }
    });
  };

  const AMOUNT = refs.amountEl.value;
  const DELAY = refs.delayEl.value;
  const STEP = refs.stepEl.value;
  createPromise({ AMOUNT, DELAY, STEP }).then().catch();
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
