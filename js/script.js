const cityInput = document.querySelector(".inputBlock__input");
const selected = document.querySelector(".inputBlock__selected");
const searchBtn = document.querySelector(".inputBlock__go");

const outTopStart = document.querySelector(".outputBlock__start");
const outTopMid = document.querySelector(".outputBlock__mid");
const outTopEnd = document.querySelector(".outputBlock__end");

const outBottom = document.querySelector(".outputBlock__bottom");

let lastCity = null;
searchBtn.addEventListener("click", async () => {
  const apiKey = "8018cfbdc94ba8e035065ccbf8eec87c";
  const requestType = "weather";
  const city = cityInput.value;

  if (!city) {
    return;
  }

  if (lastCity && lastCity === city) {
    return;
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/${requestType}?q=${city}&appid=${apiKey}`
    );

    onRequest(response.data);
    lastCity = city;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

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
