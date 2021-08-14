let now = new Date();

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
  let farenhite = (todayTemp * 9) / 5 + 32;
  todayTemp.innerHTML = farenhite;
}

function buttonPress() {
  let unitButton = document.querySelector("#units");
  unitButton.addEventListener("click", changeUnits);
}

function showWeather(response) {
  document.querySelector(".cityTitle").innerHTML = response.data.name;
  document.querySelector(".todayTempDeg").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;
  document.querySelector("#des").innerHTML = response.data.weather[0].main;
  document.querySelector("#hum").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}kmph`;
  buttonPress();
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

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchSubmit);

api("Athens");

function findLocation(position) {
  let apiKey = "df6d18abaf72cab62d301f297c267d93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function changeToCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}
let currentLoca = document.querySelector("#current-loca");
currentLoca.addEventListener("click", changeToCurrent);
