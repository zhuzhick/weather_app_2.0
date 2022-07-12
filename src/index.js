let apiWeather = "4cd562128c73941b178c72243d5dc1c8";
let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";

// Display current Date
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
let currentHours = now.getHours();
let currentMin = now.getMinutes();
let day = document.querySelector(".currentDay");
let date = document.querySelector(".currentDate");
let time = document.querySelector(".currentTime");

day.innerHTML = `${currentDay}`;
date.innerHTML = `${currentMonth} ${currentDate}, ${currentYear}`;
time.innerHTML = `${currentHours}:${currentMin}`;


// Search city and display forecast
let btnSearch = document.querySelector("#btnSearchCity");


function search(event) {
	event.preventDefault();
	let content = document.querySelector("#searchFormInput");
	let userRequest = content.value.toLowerCase();
	let userCityRequest =
		userRequest.charAt(0).toUpperCase() + userRequest.slice(1);

	weatherForecast(userCityRequest);
}

function weatherForecast(city) {
	let userCityDisplay = document.querySelector(".userCity");
	userCityDisplay.innerHTML = `${city}`;

	function displayWeather(response) {
		let temp_C = Math.round(response.data.main.temp);
		let currentTemp = document.querySelector(".currentTemp");
		currentTemp.innerHTML = `${temp_C}°C`;
	}

	axios
		.get(`${urlWeather}${city}&units=metric&appid=${apiWeather}`)
		.then(displayWeather);
}


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

convert_btn.addEventListener("click", convert);

btnSearch.addEventListener("click", search);
