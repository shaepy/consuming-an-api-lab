const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// troubleshoot
app.set('view cache', false);

// global weatherData
let weatherData = {};

app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`)});

app.get('/weather', (req, res) => {
    res.render('index')
});

// TODO-ST: Validation for zip code before passing

app.post('/weather', async (req, res) => {
    const { zipCode } = req.body
    weatherData = await openWeatherReq(zipCode)
    res.redirect('weather/show')
});

app.get('/weather/show', (req, res) => {
    res.render('weather/show', { weatherData })
});

const openWeatherReq = async (zip) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${process.env.API_KEY}`)
    return await response.json()
};
