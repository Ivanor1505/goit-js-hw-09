import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const date = new Date();

startBtn.addEventListener('click', onClick);

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < date) {
            // window.alert("Please choose a date in the future");  
            Notify.warning("Please choose a date in the future");
        } else { startBtn.disabled = false; };
        
    // console.log(selectedDates[0]);
  },
};
  
flatpickr(input, options);


function onClick() {
    startBtn.disabled = true;
    const intervalId = setInterval(timer, 1000)

    function timer() {
        const curentDate = new Date();
        const endDate = Date.parse(input.value);
        const timeOff = endDate - curentDate;
        const finalTime = convertMs(timeOff);
        // console.log(timeOff)
        // console.log(finalTime); 
    
        if(timeOff > 0) {
        days.textContent = addLeadingZero(finalTime.days);
        hours.textContent = addLeadingZero(finalTime.hours);
        minutes.textContent = addLeadingZero(finalTime.minutes);
        seconds.textContent = addLeadingZero(finalTime.seconds);
    } else {
        clearInterval(intervalId)
        }
    }
    };
 
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

