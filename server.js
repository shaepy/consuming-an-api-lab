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

// troubleshoot
app.set('view cache', false);

// global weatherData
let weatherData = {};
let tempC, windKph;

app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`)});

app.get('/weather', (req, res) => {
    res.render('index')
});

app.post('/weather', async (req, res) => {
    const { zipCode, countryCode } = req.body
    // let zipCodeNumber = Number(zipCode)
    weatherData = await openWeatherReq(zipCode, countryCode)
    convertToMetric()
    res.redirect('weather/show')
});

app.get('/weather/show', (req, res) => {
    res.render('weather/show', { weatherData, tempC, windKph })
});

const openWeatherReq = async (zip, country) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=imperial&appid=${process.env.API_KEY}`)
    if (!response.ok) throw new Error('Failed to fetch weather data')
    return await response.json()
};

const convertToMetric = () => {
    const tempF = weatherData.main.temp
    tempC = parseFloat(((tempF - 32) * 5/9).toFixed(2))
    const windMph = weatherData.wind.speed
    windKph = parseFloat((windMph * 1.60934).toFixed(2))
};

// TODO-ST Next Steps
// - CSS to make UI friendlier
// // - Allow imperial to metric conversion
// ! - Allow country selection during inputs
// - sunrise & sunset