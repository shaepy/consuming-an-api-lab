const metricToggle = document.querySelector('#unitToggle');
const windKph = document.querySelector('#windKph');
const windMph = document.querySelector('#windMph');
const tempC = document.querySelector('#tempC');
const tempF = document.querySelector('#tempF');

const metric = [tempC, windKph];
const imperial = [tempF, windMph];

metricToggle.checked = false;

metricToggle.addEventListener('change', () => {
    if (metricToggle.checked) {
        metric.forEach(m => m.classList.remove('hidden'));
        imperial.forEach(i => i.classList.add('hidden'));
    } else {
        metric.forEach(m => m.classList.add('hidden'));
        imperial.forEach(i => i.classList.remove('hidden'));
    }
});