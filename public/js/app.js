const unitToggle = document.querySelector('#unitToggle');
const tempValue = document.querySelector('#tempValue');
const windValue = document.querySelector('#windValue');
const tempFString = `<%= weatherData.main.temp %>°F`;
const tempCString = `<%= tempC %>°C`;
const mphString = `<%= weatherData.wind.speed %> mph`;
const kphString = `<%= windKph %> kph`;

unitToggle.checked = false;

unitToggle.addEventListener('change', () => {
    if (unitToggle.checked) {
        tempValue.textContent = tempCString
        windValue.textContent = kphString
    } else {
        tempValue.textContent = tempFString
        windValue.textContent = mphString
    }
});