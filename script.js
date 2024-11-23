const API_KEY = "2194b9f68034d5f773ae21ff9d5f0f8a"; // OpenWeatherMap API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // Base URL for weather API

// Function to get weather based on the city entered
async function getWeather() {
    const city = document.getElementById("city").value; // Get city name from input field
    const weatherInfoDiv = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
    const weatherDataElement = document.getElementById("weather-data");

    // Clear previous error and weather info
    errorMessage.textContent = "";
    weatherInfoDiv.style.display = "none";

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Weather emoji mapping based on description
        const weatherEmojis = {
            "clear sky": "☀️",           // Clear sky
            "few clouds": "🌤️",          // Few clouds
            "scattered clouds": "☁️",    // Scattered clouds
            "broken clouds": "🌥️",      // Broken clouds
            "shower rain": "🌧️",        // Shower rain
            "rain": "🌦️",               // Rain
            "thunderstorm": "🌩️",       // Thunderstorm
            "snow": "❄️",                // Snow
            "mist": "🌫️",               // Mist
            "drizzle": "🌦️",            // Drizzle
            "haze": "🌫️",               // Haze
            "dust": "🌪️",               // Dust
            "fog": "🌫️",                // Fog
            "sand": "🏜️",               // Sand
            "ash": "🌋",                 // Ash
            "squall": "🌬️",             // Squall
            "tornado": "🌪️",            // Tornado
            "smoke": "🌫️"               // Smoke
        };
        

        // Check if the API response is successful
        if (response.ok) {
            weatherInfoDiv.style.display = "block";
            const description = data.weather[0].description.toLowerCase();
            const emoji = weatherEmojis[description] || "🌈"; // Default emoji if no match

            weatherDataElement.innerHTML = `
                <strong>City:</strong> ${data.name} <br>
                <strong>Temperature:</strong> ${data.main.temp}°C <br>
                <strong>Description:</strong> ${emoji} ${data.weather[0].description} <br>
                <strong>Humidity:</strong> ${data.main.humidity}% <br>
                <strong>Wind Speed:</strong> ${data.wind.speed} m/s
            `;
        } else {
            errorMessage.textContent = `${data.message}`;
        }
    } catch (error) {
        errorMessage.textContent = `Failed to fetch weather data: ${error.message}`;
    }
}
