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
	let day = document.querySelector(".currentDay");
	let date = document.querySelector(".currentDate");
	day.innerHTML = `${currentDay}`;
	date.innerHTML = `${currentMonth} ${currentDate}, ${currentYear}`;
}

function currentTime() {
	let now = new Date();
	let currentHours = now.getHours();
	let currentMin = now.getMinutes();
	let time = document.querySelector(".currentTime");
	time.innerHTML = `${currentHours}:${currentMin}`;
}

// Search city and display forecast
let btnSearch = document.querySelector("#btnSearchCity");

function search(event) {
	event.preventDefault();
	let content = document.querySelector("#searchFormInput");
	let userRequest = content.value.toLowerCase();
	let userCityRequest =
		userRequest.charAt(0).toUpperCase() + userRequest.slice(1);
}

function displayWeather(response) {
	//let userCityDisplay = document.querySelector(".userCity");
	let currentTemp = document.querySelector(".currentTemp");
	let currentDesc = document.querySelector("#currentWeatherDesc");
	let currentWindSpeed = document.querySelector("#currentWindData");
	let currentHumidity = document.querySelector("#currentHumidityData");

	let temp_C = Math.round(response.data.main.temp);
	let wind = Math.round(response.data.wind.speed);
	let description = response.data.weather[0].description;
	let humidity = response.data.main.humidity;

	//userCityDisplay.innerHTML = `${city}`;
	currentTemp.innerHTML = `${temp_C}°C`;
	currentDesc.innerHTML =
		description.charAt(0).toUpperCase() + description.slice(1);
	currentWindSpeed.innerHTML = `${wind} km/h`;
	currentHumidity.innerHTML = `${humidity} %`;
}

let apiWeather = "4cd562128c73941b178c72243d5dc1c8";
let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";

axios
	.get(`${urlWeather}paris&units=metric&appid=${apiWeather}`)
	.then(displayWeather);

//Toggle button C° to F°
let convert_btn = document.querySelector("#degreeToggleBtn");

function convert() {
	let temp = document.querySelector(".currentTemp");
	let temp_to_convert = temp.innerHTML;
	let temp_result = parseInt(temp_to_convert.match(/\d+/));
	let temp_f = Math.ceil(temp_result * 1.8 + 32);
	let temp_c = Math.ceil((temp_result - 32) / 1.8);
	if (convert_btn.innerHTML === "Convert to F°") {
		console.log(temp_to_convert);
		temp.innerHTML = `${temp_f}°F`;
		convert_btn.innerHTML = "Convert to C°";
	} else {
		temp.innerHTML = `${temp_c}°C`;
		convert_btn.innerHTML = "Convert to F°";
	}
}

currenDate();
currentTime();

convert_btn.addEventListener("click", convert);

btnSearch.addEventListener("click", search);
