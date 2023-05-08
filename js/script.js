const cityInput = document.querySelector(".inputBlock__input");
const selected = document.querySelector(".inputBlock__selected");
const searchBtn = document.querySelector(".inputBlock__go");

const outTopStart = document.querySelector(".outputBlock__start");
const outTopMid = document.querySelector(".outputBlock__mid");
const outTopEnd = document.querySelector(".outputBlock__end");

const outBottom = document.querySelector(".outputBlock__bottom");

let lastCity = null; // уникнути повторних запитів на сервер 1/3
async function getWeather(requestType, city) {
  const apiKey = "8018cfbdc94ba8e035065ccbf8eec87c";

  if (!city || (lastCity && lastCity === city)) {
    return;
  } // уникнути повторних запитів на сервер 2/3

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/${requestType}?q=${city}&appid=${apiKey}`
    );

    onRequest(response.data);
    lastCity = city; // уникнути повторних запитів на сервер 3/3
    cityInput.value = "";
  } catch (error) {
    onError();
    console.error(error);
    throw error;
  }
}

// перший старт - Київ
document.addEventListener("DOMContentLoaded", () => {
  getWeather("weather", "kyiv");
});

// пошук із значення в інпуті
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  getWeather("weather", city);
});

// помилка
function onError() {
  cityInput.value = "ERROR";
  cityInput.style.fontWeight = "bold";
  cityInput.style.backgroundColor = "red";
  setTimeout(() => {
    cityInput.style.removeProperty("background-color");
    cityInput.value = "";
  }, 1000);
}

function onRequest(data) {
  const temperature = Math.round(data.main.temp - 273.15);
  const temperatureFeels = Math.round(data.main.feels_like - 273.15);
  const cityName = data.name;
  const countryName = data.sys.country;
  const weatherIcon = data.weather[0].icon;
  const weatherDescr = data.weather[0].description;

  console.log(data);

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
