import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const delay = this.elements.delay;
  const step = this.elements.step;
  const amount = this.elements.amount;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  const promises = [];

  for (let i = 1; i <= amountValue; i += 1){
    const currentDelay = delayValue + (i - 1) * stepValue;
promises.push(createPromise(i, currentDelay))
  }

  promises.forEach((promise) => {
    promise.then(({ position, delay }) =>
    { Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); })
      .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      });
};