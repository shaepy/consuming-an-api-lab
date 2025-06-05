const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require("path");
const countryCodes = require("country-codes-list");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// global weatherData
let weatherData = {};
let forecastData = {};
let tempC, windKph;

// pass the countryCodes to index
const countriesObject = countryCodes.all()

app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`)});

app.get('/weather', (req, res) => {
    res.render('index', { countriesObject })
});

app.post('/weather', async (req, res) => {
    let { 'zip-code' : zipCode, country } = req.body
    if (!country) country = 'United States of America'
    const countryCode = await getCountryCode(country)
    weatherData = await openWeatherReq(zipCode, countryCode)
    forecastData = await openForecastReq(weatherData.coord.lon, weatherData.coord.lat)
    convertForecastDates()
    convertToMetric()
    convertSunlightTimes()
    res.redirect('weather/show')
});

app.get('/weather/show', (req, res) => {
    res.render('weather/show', { weatherData, tempC, windKph, forecastData })
});

const openWeatherReq = async (zip, code) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&units=imperial&appid=${process.env.API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch weather data')
    return await response.json()
};

const openForecastReq = async(lon, lat) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch forecast data')
    return await response.json()
}

const convertToMetric = () => {
    const tempF = weatherData.main.temp
    tempC = parseFloat(((tempF - 32) * 5/9).toFixed(2))
    const windMph = weatherData.wind.speed
    windKph = parseFloat((windMph * 1.60934).toFixed(2))

    forecastData.list.forEach(d => {
        const fcTempC = parseFloat(((d.main.temp - 32) * 5/9).toFixed(2))
        d.main.celsius = fcTempC
        const fcWindKph = parseFloat((d.wind.speed * 1.60934).toFixed(2))
        d.wind.kph = fcWindKph
    })
};

const convertSunlightTimes = () => {
    const unixToTime = (unixTime) => {
        const date = new Date((unixTime * 1000))
        const time = date.toLocaleTimeString(undefined, { hour12: true })
        return time
    };
    weatherData.sys.sunrise = unixToTime(weatherData.sys.sunrise)
    weatherData.sys.sunset = unixToTime(weatherData.sys.sunset)
};

const convertForecastDates = () => {
    const unixToDate = (unixTime) => {
        let date = new Date((unixTime * 1000))
        date = date.toLocaleString(undefined, { 
            hour12: true,
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        date = date.replace(',','')
        return date
    };
    forecastData.list.forEach(unixDt => {unixDt.dt = unixToDate(unixDt.dt)});
};

const getCountryCode = async (country) => {
    const foundCountry = await countriesObject.find(c => c.countryNameEn === country)
    return foundCountry.countryCode
};

// TODO-ST Next Steps
// - CSS to make UI friendlier
// // - Allow imperial to metric conversion
// // - Allow country selection during inputs
// // sunrise & sunset
// FIX 5-day forecast should also take in metric conversions