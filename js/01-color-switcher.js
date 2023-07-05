const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");
let intervalId = null;

start.addEventListener("click", onStart);
stop.addEventListener("click", onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onStart() {
    start.disabled = true;
    intervalId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor(); }, 1000);
    console.log(intervalId);
 };

function onStop() {
    clearInterval(intervalId);
  start.disabled = false;
 };
