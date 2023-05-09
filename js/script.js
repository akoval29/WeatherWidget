import { getWeatherTop } from "./useAPI.js";
import { getWeatherBottom } from "./useAPI.js";

const main = document.querySelector(".main");
export const cityInput = document.querySelector(".inputBlock__input");
const selected = document.querySelector(".inputBlock__selected");
const searchBtn = document.querySelector(".inputBlock__btn");
const outTopStart = document.querySelector(".outputBlock__start");
const outTopMid = document.querySelector(".outputBlock__mid");
const outTopEnd = document.querySelector(".outputBlock__end");
const outBottom = document.querySelector(".outputBlock__bottom");

function onRequestTop(data) {
  const temperature = Math.round(data.main.temp - 273.15);
  const temperatureFeels = Math.round(data.main.feels_like - 273.15);
  const cityName = data.name;
  const countryName = data.sys.country;
  const weatherIcon = data.weather[0].icon;
  const weatherDescr = data.weather[0].description;

  selected.innerHTML = `Selected: ${cityName}, ${countryName}`;

  outTopStart.innerHTML = `
    <p class="outputBlock__temp">${temperature}°C</p>
    <p class="outputBlock__feels">Feels like ${temperatureFeels}°C</p>
  `;

  outTopMid.innerHTML = `
    <p class="outputBlock__city">${cityName}</p>
    <p>${weatherDescr}</p>
  `;

  outTopEnd.innerHTML = `<img class="outputBlock__img" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon">`;
}

// function onRequestBottom(data) {
//   console.log("bottom");
//   console.log(resBottom.data);
// }

// перший старт - Київ
document.addEventListener("DOMContentLoaded", async () => {
  const resTop = await getWeatherTop("kyiv");
  onRequestTop(resTop.data);
  console.log("top");
  console.log(resTop.data);

  const resBottom = await getWeatherBottom("kyiv");
  // onRequestBottom(resBottom.data);
  console.log("bottom");
  console.log(resBottom.data);
});

// пошук
searchBtn.addEventListener("click", () => {
  // getWeatherTop(cityInput.value);
  // getWeatherBottom(cityInput.value);
});

// інпут реагує на клавішу ENTER
cityInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

// фокус на текстовий інпут при кліках по сторінці
main.addEventListener("click", () => {
  cityInput.focus();
});

// помилка
export function onError() {
  cityInput.value = "ERROR";
  cityInput.style.fontWeight = "bold";
  cityInput.style.backgroundColor = "red";
  setTimeout(() => {
    cityInput.style.removeProperty("background-color");
    cityInput.value = "";
  }, 1000);
}
