// Example JavaScript to fetch weather data
const apiKey = 'cb6b79a035a1e366242f9fe1ae57f4fa'; // Replace with your API key
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Canberra&appid=${apiKey}`;
const historicalWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid=${apiKey}`;

// Fetch current weather
fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    // Update DOM elements with current weather data
    console.log("Current Weather:", data);
  });

// Fetch historical weather (replace lat, lon, and time with actual values)
fetch(historicalWeatherUrl)
  .then(response => response.json())
  .then(data => {
    // Update DOM elements with historical weather data
    console.log("Historical Weather:", data);
  });

// Note: Actual implementation will require parsing and displaying the data in your HTML
