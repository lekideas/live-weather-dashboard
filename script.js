// Example JavaScript to fetch weather data
const apiKey = 'cb6b79a035a1e366242f9fe1ae57f4fa'; // Replace with your actual API key
const urls = {
    Canberra: `https://api.openweathermap.org/data/2.5/weather?q=Canberra&appid=${apiKey}&units=metric`,
    Edinburgh: `https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=${apiKey}&units=metric`
};

// Function to update DOM with weather data
function displayWeather(data, elementPrefix) {
    document.getElementById(`${elementPrefix}-temp`).textContent = data.main.temp;
    document.getElementById(`${elementPrefix}-conditions`).textContent = data.weather[0].main; // or .description for more detail
}

// Function to determine better party location
function determineBetterPartyLocation(canberraWeather, edinburghWeather) {
    // Simple logic based on temperature and clear skies; customize as needed
    let verdict = '';
    if (canberraWeather.main.temp > edinburghWeather.main.temp && canberraWeather.weather[0].main === "Clear") {
        verdict = 'Canberra';
    } else if (edinburghWeather.main.temp > canberraWeather.main.temp && edinburghWeather.weather[0].main === "Clear") {
        verdict = 'Edinburgh';
    } else {
        verdict = 'Neither'; // or some logic to decide ties or unclear conditions
    }
    document.getElementById("better-party-location").textContent = verdict;
}

// Fetch weather data for both cities and update the DOM
Object.keys(urls).forEach(city => {
    fetch(urls[city])
        .then(response => response.json())
        .then(data => {
            displayWeather(data, city);
            if(city === "Edinburgh") {
                // After getting both cities' data, determine the better party location
                determineBetterPartyLocation(
                    JSON.parse(localStorage.getItem('Canberra')),
                    JSON.parse(localStorage.getItem('Edinburgh'))
                );
            } else {
                // Store Canberra weather data temporarily until Edinburgh's data is fetched
                localStorage.setItem('Canberra', JSON.stringify(data));
            }
        });
});

// Note: This is a simple implementation. Consider handling errors and edge cases.
