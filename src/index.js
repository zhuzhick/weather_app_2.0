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
// Display current Date
function currentTime() {
	let now = new Date();
	let currentHours = now.getHours();
	let currentMin = now.getMinutes();
	if (currentHours < 10) {
		currentHours = `0${currentHours}`;
	}

	if (currentMin < 10) {
		currentMin = `0${currentMin}`;
	}
	let time = document.querySelector("#currentTime");
	time.innerHTML = `${currentHours}:${currentMin}`;
}
//Get forecast by geolocation
function getLocation() {
	let header = document.querySelector("#userCity");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showForecastByPosition);
	} else {
		header.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showForecastByPosition(position) {
	let apiWeather = "4cd562128c73941b178c72243d5dc1c8";
	let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiWeather}&units=metric`;
	axios.get(urlWeather).then(displayWeather);
}

// Search city
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

function inputSearch(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		let userCitySearch = document.querySelector("#searchFormInput");
		searchForecast(userCitySearch.value);
	}
}

// Get coordinates of the city
function getWeekForecast(coordinates) {
	let apiWeather = "b752ae3b34252d24a46c6d87e0914205";
	let urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiWeather}&units=metric`;
	axios.get(urlWeather).then(displayWeekForecast);
}

//Display forecast
function displayWeather(response) {
	let currentTemp = document.querySelector("#currentTemp");
	let currentDesc = document.querySelector("#currentWeatherDesc");
	let currentWindSpeed = document.querySelector("#currentWindData");
	let currentHumidity = document.querySelector("#currentHumidityData");

	let userCityDisplay = document.querySelector("#userCity");
	let hideElement = document.querySelectorAll(".hide");
	hideElement.forEach(function (element) {
		element.classList.remove("hide");
	});
	temperatureCesius = Math.round(response.data.main.temp);
	let wind = Math.round(response.data.wind.speed);
	let description = response.data.weather[0].description;
	let humidity = response.data.main.humidity;
	let ico = response.data.weather[0].main.toLowerCase();
	userCityDisplay.innerHTML = response.data.name;
	currentTemp.innerHTML = `${temperatureCesius}°C`;
	currentDesc.innerHTML =
		description.charAt(0).toUpperCase() + description.slice(1);
	currentWindSpeed.innerHTML = `: ${wind} km/h`;
	currentHumidity.innerHTML = `: ${humidity} %`;

	getWeekForecast(response.data.coord);
	beautifyDay(ico);
}

//Display the week forecast

function displayWeekForecast(response) {
	let weekForecastData = response.data.daily;
	let forecastWeek = document.querySelector("#weekForecastOutput");

	let forecastWeekHTML = "";
	weekForecastData.forEach(function (dayForecast, index) {
		if (index < 6) {
			forecastWeekHTML =
				forecastWeekHTML +
				`
			<div class="row dayForecastOutput">
				<div class="col-md-3">
					<h3 class="dayForecastHeaderDay">${formatDay(dayForecast.dt)}</h3>
				</div>
				<div class="col-md-1 dayForecastIco">
					<i class="fa-solid fa-temperature-half"></i>
				</div>
				<div class="col-md-2">
					<p class="dayForecastOutput">${Math.round(dayForecast.temp.day)} C°</p>
				</div>
				<div class="col-md-1 dayForecastIco">
					<i class="fa-solid fa-wind"></i>
				</div>
				<div class="col-md-2">
					<p class="dayForecastOutput">${Math.round(dayForecast.wind_speed)} km/h</p>
				</div>
				<div class="col-md-3 dayIco">
					<i class="fa-solid ${beautifyWeek(dayForecast.weather[0].main)}"></i>	
				</div>
			</div>
	`;
		}
	});

	forecastWeek.innerHTML = forecastWeekHTML;
}

//Format the name of day for the week forecast

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return days[day];
}

// Current day forecast styling
function beautifyDay(desc) {
	let descVocablury = {
		clear: {
			classIco: "fa-sun",
			bgcColor: "#ffff40",
		},
		clouds: {
			classIco: "fa-cloud",
			bgcColor: "#BA55D3",
		},
		drizzle: {
			classIco: "fa-cloud-sun-rain",
			bgcColor: "#87CEFA",
		},
		thunderstorm: {
			classIco: "fa-cloud-bolt",
			bgcColor: "#7FFFD4",
		},
		rain: {
			classIco: "fa-cloud-sun-rain",
			bgcColor: "#AFEEEE",
		},
		snow: {
			classIco: "fa-snowflake",
			bgcColor: "#F0F8FF",
		},
		mist: {
			classIco: "fa-smog",
			bgcColor: "#B0C4DE",
		},
	};

	if (Object.keys(descVocablury).includes(desc)) {
		let weatherApp = document.querySelector("#weatherApp");
		let weatherIco = document.querySelector("#weatherIco");
		weatherIco.removeAttribute("class");
		weatherApp.style = `background-color: ${descVocablury[desc].bgcColor}`;
		weatherIco.classList.add("fa-solid");
		weatherIco.classList.add(descVocablury[desc].classIco);
	}
}

//Styling week forecast
function beautifyWeek(desc) {
	let descVocablury = {
		Clear: {
			classIco: "fa-sun",
		},
		Clouds: {
			classIco: "fa-cloud",
		},
		Drizzle: {
			classIco: "fa-cloud-sun-rain",
		},
		Thunderstorm: {
			classIco: "fa-cloud-bolt",
		},
		Rain: {
			classIco: "fa-cloud-sun-rain",
		},
		Snow: {
			classIco: "fa-snowflake",
		},
		Mist: {
			classIco: "fa-smog",
		},
	};

	if (Object.keys(descVocablury).includes(desc)) {
		let icoClass = descVocablury[desc].classIco;
		return icoClass;
	}
}

//Activate buttons
let btnSearch = document.querySelector("#btnSearchCity");
btnSearch.addEventListener("click", userSearch);

let inputField = document.querySelector("#searchFormInput");
inputField.addEventListener("keypress", inputSearch);

let btnLocation = document.querySelector("#btnLocation");
btnLocation.addEventListener("click", getLocation);

currenDate();
currentTime();
