import { getWeatherTop } from "./useAPI.js";
import { getWeatherBottom } from "./useAPI.js";

const main = document.querySelector(".main");
export const cityInput = document.querySelector(".inputBlock__input");
const cross = document.querySelector(".inputBlock__cross");
const selected = document.querySelector(".inputBlock__selected");
const searchBtn = document.querySelector(".inputBlock__btn");
const outTop = document.querySelector(".outputBlock__top");
const outBottom = document.querySelector(".outputBlock__bottom");

function onRequestTop(data) {
  const temperature = Math.round(data.main.temp - 273.15);
  const temperatureFeels = Math.round(data.main.feels_like - 273.15);
  const cityName = data.name;
  const countryName = data.sys.country;
  const weatherIcon = data.weather[0].icon;
  const weatherDescr = data.weather[0].description;

  selected.innerHTML = `Selected: ${cityName}, ${countryName}`;

  outTop.innerHTML = `
    <div class="outputBlock__start">
      <p class="outputBlock__temp">${temperature}°C</p>
      <p class="outputBlock__feels">Feels like ${temperatureFeels}°C</p>
    </div>
    <div class="outputBlock__mid">
      <p class="outputBlock__city">${cityName}</p>
      <p>${weatherDescr}</p>
    </div>
    <div class="outputBlock__end">
      <img class="outputBlock__img" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon">
    </div>
  `;
}

function onRequestBottom(data) {
  let totalDayOfWeek = [];
  let totalformattedDate = [];
  let totalIcon = [];
  let totalDescr = [];
  let totalTempMin = [];
  let totalTempMax = [];

  for (let i = 0; i < data.list.length; i++) {
    const item = data.list[i];

    // отримуємо дату з Unix timestamp
    const date = new Date(item.dt * 1000);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("uk-UA");

    // формуємо масиви ВСІХ даних виходячи з "унікальності" рядка "дата"
    if (!totalDayOfWeek.includes(dayOfWeek)) {
      totalDayOfWeek.push(dayOfWeek);
      totalformattedDate.push(formattedDate);
      totalIcon.push(item.weather[0].icon);
      totalDescr.push(item.weather[0].description);
      totalTempMin.push(Math.round(item.main.temp_min - 273.15));
      totalTempMax.push(Math.round(item.main.temp_max - 273.15));
    }
  }
  // console.log(totalDayOfWeek);
  // console.log(totalformattedDate);
  // console.log(totalIcon);
  // console.log(totalDescr);
  // console.log(totalTempMin);
  // console.log(totalTempMax);

  // формуємо верстку (хоча це можна було зробити і в попередньому циклі :) )
  outBottom.innerHTML = "";
  for (let i = 0; i < totalDayOfWeek.length; i++) {
    outBottom.innerHTML += `
      <div class="outputBlock__days Day${i + 1}:${totalDayOfWeek[i]}">
        <div class="outputBlock__days-wrap">
          <p>${totalDayOfWeek[i]}</p>
          <p>${totalformattedDate[i]}</p>
        </div>
        <img class="outputBlock__img" src="http://openweathermap.org/img/w/${
          totalIcon[i]
        }.png" alt="weather icon">
        <p>${totalDescr[i]}</p>
        <div class="outputBlock__temper-wrap">
          <p>min: ${totalTempMin[i]}°C</p>
          <p>max: ${totalTempMax[i]}°C</p>
        </div>
      </div>
    `;
  }
}

// перший старт - Київ
document.addEventListener("DOMContentLoaded", async () => {
  const resTop = await getWeatherTop("kyiv");
  const resBottom = await getWeatherBottom("kyiv");
  onRequestTop(resTop.data);
  onRequestBottom(resBottom.data);
  // console.log("first start - top");
  // console.log(resTop.data);
  // console.log("first start - bottom");
  // console.log(resBottom.data);
});

// пошук
searchBtn.addEventListener("click", async () => {
  const resTop = await getWeatherTop(cityInput.value);
  const resBottom = await getWeatherBottom(cityInput.value);
  onRequestTop(resTop.data);
  onRequestBottom(resBottom.data);
  // console.log("search - top");
  // console.log(resTop.data);
  // console.log("search - bottom");
  // console.log(resBottom.data);
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

// помилка в інпуті
export function onError() {
  cityInput.value = "ERROR";
  cityInput.style.fontWeight = "bold";
  cityInput.style.backgroundColor = "red";
  setTimeout(() => {
    cityInput.style.removeProperty("background-color");
    cityInput.value = "";
  }, 1000);
}

// чистим інпут хрестиком
cross.addEventListener("click", () => {
  cityInput.value = "";
});
