import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', start);

function start(evt) {
  evt.preventDefault();

  const AMOUNT = refs.amountEl.value;
  const DELAY = refs.delayEl.value;
  const STEP = refs.stepEl.value;

  let delay = DELAY;

  for (let position = 1; position <= AMOUNT; position += 1) {
    const createPromise = () => {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
          if (shouldResolve) {
            // resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
            resolve(
              Notiflix.Notify.success(
                `✅ Fulfilled promise ${position} in ${delay}ms`
              )
            );
          }
          // reject(`❌ Rejected promise ${position} in ${delay}ms`);
          reject(
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`
            )
          );
        }, delay);
        delay += STEP;
      });
    };

    createPromise()
      .then(
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
