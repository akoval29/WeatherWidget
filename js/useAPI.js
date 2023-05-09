import { onError } from "./script.js";
import { cityInput } from "./script.js";

const apiKey = "8018cfbdc94ba8e035065ccbf8eec87c";

// top block
let lastCity1 = null; // уникнути повторних запитів на сервер 1/3
export async function getWeatherTop(city) {
  if (!city || (lastCity1 && lastCity1 === city)) {
    return;
  } // уникнути пустих і повторних запитів на сервер 2/3
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    lastCity1 = city; // уникнути повторних запитів на сервер 3/3
    cityInput.value = "";
    return response;
  } catch (error) {
    onError();
    console.error(error);
    throw error;
  }
}

// bottom block
let lastCity2 = null; // уникнути повторних запитів на сервер 1/3
export async function getWeatherBottom(city) {
  if (!city || (lastCity2 && lastCity2 === city)) {
    return;
  } // уникнути пустих і повторних запитів на сервер 2/3
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    lastCity2 = city; // уникнути повторних запитів на сервер 3/3
    cityInput.value = "";
    return response;
  } catch (error) {
    onError();
    console.error(error);
    throw error;
  }
}
