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
    convertToMetric()
    await convertSunlightTime()
    res.redirect('weather/show')
});

app.get('/weather/show', (req, res) => {
    res.render('weather/show', { weatherData, tempC, windKph })
});

const openWeatherReq = async (zip, code) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&units=imperial&appid=${process.env.API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch weather data')
    return await response.json()
};

const convertToMetric = () => {
    const tempF = weatherData.main.temp
    tempC = parseFloat(((tempF - 32) * 5/9).toFixed(2))
    const windMph = weatherData.wind.speed
    windKph = parseFloat((windMph * 1.60934).toFixed(2))
};

const convertUnixToDate = (unixTime) => {
    const date = new Date((unixTime * 1000))
    const time = date.toLocaleTimeString(undefined, { hour12: true })
    return time
};

const convertSunlightTime = () => {
    weatherData.sys.sunrise = convertUnixToDate(weatherData.sys.sunrise)
    weatherData.sys.sunset = convertUnixToDate(weatherData.sys.sunset)
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
// - 5 day forecast (different API)