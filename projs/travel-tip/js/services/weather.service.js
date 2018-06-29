function getWeather(coords) {
    const W_KEY = '3e5fd72d3965dc3ccc6fba905bf066ea';
    try {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&APPID=${W_KEY}`)
            .then((weatherData) => {
                return weatherData.json()
                    .then((jsonWeatherData) => {
                        return {
                            weatherIcon: jsonWeatherData.weather[0].icon,
                            city: jsonWeatherData.name,
                            country: jsonWeatherData.sys.country,
                            weatherCondition: jsonWeatherData.weather[0].description,
                            currTemp: Math.round(jsonWeatherData.main.temp),
                            minTemp: Math.round(jsonWeatherData.main.temp_min),
                            maxTemp: Math.round(jsonWeatherData.main.temp_max),
                            wind: (jsonWeatherData.wind.speed).toFixed(1)
                        }
                    });
            });
    } catch (error) {
        getWeather();
    }
}

export default {
    getWeather
}