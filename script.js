// Example JavaScript to fetch weather data
const apiKey = 'cb6b79a035a1e366242f9fe1ae57f4fa'; // Replace with your actual API key
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Canberra&appid=${apiKey}&units=metric`;
const oneYearAgo = Math.floor(Date.now() / 1000) - (365 * 24 * 60 * 60); // Unix time for one year ago
const lat = '-35.2835';  // Latitude for Canberra
const lon = '149.1281';  // Longitude for Canberra
const historicalWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${oneYearAgo}&appid=${apiKey}&units=metric`;

// Function to update DOM with current weather data
function displayCurrentWeather(data) {
    document.getElementById("current-temp").textContent = data.main.temp;
    document.getElementById("current-conditions").textContent = data.weather[0].description;
}

// Function to update DOM with historical weather data
function displayHistoricalWeather(data) {
    // Assuming you want the temperature and conditions from the first data point of that day
    const historicalData = data.hourly[0];
    document.getElementById("historical-temp").textContent = historicalData.temp;
    document.getElementById("historical-conditions").textContent = historicalData.weather[0].description;
}

// Fetch current weather
fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data); // Update the DOM with current weather
    });

// Fetch historical weather
fetch(historicalWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayHistoricalWeather(data); // Update the DOM with historical weather
    });

// Note: This is a simple implementation. Consider handling errors and edge cases.
