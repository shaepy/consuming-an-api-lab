const metricToggle = document.querySelector('#unitToggle');
const imperialUnits = document.querySelectorAll('.imperial');
const metricUnits = document.querySelectorAll('.metric');

metricToggle.checked = false;

metricToggle.addEventListener('change', () => {
    if (metricToggle.checked) {
        metricUnits.forEach(m => m.classList.remove('hidden'));
        imperialUnits.forEach(i => i.classList.add('hidden'));
    } else {
        metricUnits.forEach(m => m.classList.add('hidden'));
        imperialUnits.forEach(i => i.classList.remove('hidden'));
    }
});