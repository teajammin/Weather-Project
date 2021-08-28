let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let dateTitle = document.querySelector("#date");
dateTitle.innerHTML = `${day} ${month} ${date}, ${hour}:${minutes}, ${year}`;

function changeUnits() {
  let todayTemp = document.querySelector(".todayTempDeg");
  let farenhite = Math.round((temp * 9) / 5 + 32);
  todayTemp.innerHTML = `${farenhite}º F`;
}

function buttonPress() {
  let unitButton = document.querySelector("#units");
  unitButton.addEventListener("click", changeUnits);
}

function desBack() {
  let back = document.querySelector("#container");
  let des = document.querySelector("#des");
  if (des === "Clouds") {
    back.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeClouds.jpeg"
    );
  }
  if (des === "Clear") {
    back.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeClear.jpeg"
    );
  }
  if (des === "Rain") {
    back.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeRain.jpeg"
    );
  } else if (des === "Snow") {
    back.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeSnow.jpeg"
    );
  }
}

let temp = null;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastDay = response.data.daily;

  let forecast = document.querySelector("#futureWeather");

  let forecastHTML = `<div class="row futureStats">`;

  forecastDay.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="futureStatsDate">${formatDate(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="futureStatsTemperature">
                  <span class="futureStatsTemperatureMax"> ${Math.round(
                    forecastDay.temp.max
                  )}º </span>
                  <span class="futureStatsTemperatureMin"> ${Math.round(
                    forecastDay.temp.min
                  )}º </span>
                </div>
          </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showWeather(response) {
  let icon = document.querySelector("#icon");
  let iconData = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  icon.setAttribute("src", iconData);

  document.querySelector(".cityTitle").innerHTML = response.data.name;
  document.querySelector(".todayTempDeg").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;
  temp = Math.round(response.data.main.temp);
  document.querySelector("#hum").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  let des = document.querySelector("#des");
  des.innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}kmph`;
  buttonPress();
  desBack();
  findLocation(response.data.coord);
}

function api(city) {
  let apiKey = "df6d18abaf72cab62d301f297c267d93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  console.log(event);
  let city = document.querySelector("#search-form-input").value;
  api(city);
}

function findLocation(coordinates) {
  console.log(coordinates);
  let apiKey = "df6d18abaf72cab62d301f297c267d93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeToCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLoca = document.querySelector("#current-loca");
currentLoca.addEventListener("click", changeToCurrent);

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchSubmit);

api("Athens");
