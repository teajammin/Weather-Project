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
  let todayTemp = document.querySelector(".todayTempDeg");
  let farenhite = Math.round((temp * 9) / 5 + 32);
  todayTemp.innerHTML = `${farenhite}º F`;
}

function buttonPress() {
  let unitButton = document.querySelector("#units");
  unitButton.addEventListener("click", changeUnits);
}

function desBack() {
  if (des === "Clouds") 
  {
    let back = document.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeClouds.jpeg")
  } elseif (des === "Clear") {
    let back = document.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeClear.jpeg")
    } elseif (des === "Clear") {
    let back = document.setAttribute(
      "background",
      "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeRain.jpeg")
    } elseif 
    (des === "Clear") {
    let back = document.setAttribute(
      "background",
    "/Users/theazeitoun/Desktop/Code/VS/SheCodes/SheCodes Plus/Weather-Project/media/pepeSnow.jpeg")
     ;
  });
  
}

let des = null;
let temp = null;

function showWeather(response) {
  document.querySelector("#icon").setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`
    );
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
