// Display current Date
function currenDate() {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"Semptember",
		"October",
		"November",
		"December",
	];
	let now = new Date();
	let currentDate = now.getDate();
	let currentMonth = months[now.getMonth()];
	let currentYear = now.getFullYear();
	let currentDay = days[now.getDay()];
	let day = document.querySelector("#currentDay");
	let date = document.querySelector("#currentDate");
	day.innerHTML = `${currentDay}`;
	date.innerHTML = `${currentMonth} ${currentDate}, ${currentYear}`;
}

function currentTime() {
	let now = new Date();
	let currentHours = now.getHours();
	let currentMin = now.getMinutes();
	let time = document.querySelector("#currentTime");
	time.innerHTML = `${currentHours}:${currentMin}`;
}

// Search city and display forecast
function displayWeather(response) {
	let currentTemp = document.querySelector("#currentTemp");
	let currentDesc = document.querySelector("#currentWeatherDesc");
	let currentWindSpeed = document.querySelector("#currentWindData");
	let currentHumidity = document.querySelector("#currentHumidityData");
	let weatherIco = document.querySelector("#weatherIco");
	let userCityDisplay = document.querySelector("#userCity");

	temperatureCesius = Math.round(response.data.main.temp);
	let wind = Math.round(response.data.wind.speed);
	let description = response.data.weather[0].description;
	let humidity = response.data.main.humidity;

	userCityDisplay.innerHTML = response.data.name;
	currentTemp.innerHTML = `${temperatureCesius}°C`;
	currentDesc.innerHTML =
		description.charAt(0).toUpperCase() + description.slice(1);
	currentWindSpeed.innerHTML = `: ${wind} km/h`;
	currentHumidity.innerHTML = `: ${humidity} %`;

	console.log(response.data);
}

function searchForecast(city) {
	let userRequest = city.toLowerCase();
	let apiWeather = "4cd562128c73941b178c72243d5dc1c8";
	let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";

	axios
		.get(`${urlWeather}${userRequest}&units=metric&appid=${apiWeather}`)
		.then(displayWeather);
}

function userSearch(event) {
	event.preventDefault();
	let userCitySearch = document.querySelector("#searchFormInput");
	searchForecast(userCitySearch.value);
}

//Toggle button C° to F°
function convert(event) {
	event.preventDefault();
	let temp = temperatureCesius;
	let tempData = document.querySelector("#currentTemp");
	if (convert_btn.innerHTML === "Convert to F°") {
		let temp_F = Math.round((temp * 9) / 5 + 32);
		tempData.innerHTML = `${temp_F}°F`;
		convert_btn.innerHTML = "Convert to C°";
	} else {
		tempData.innerHTML = `${temperatureCesius}°C`;
		convert_btn.innerHTML = "Convert to F°";
	}
}

let temperatureCesius = null;

let convert_btn = document.querySelector("#degreeToggleBtn");
convert_btn.addEventListener("click", convert);

let btnSearch = document.querySelector("#btnSearchCity");
btnSearch.addEventListener("click", userSearch);

currenDate();
currentTime();

//searchForecast("new york");
