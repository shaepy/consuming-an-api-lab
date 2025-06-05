const unitToggle = document.querySelector('#unitToggle');
const imperialUnits = document.querySelectorAll('.imperial');
const metricUnits = document.querySelectorAll('.metric');

unitToggle.checked = false;

unitToggle.addEventListener('change', () => {
    if (unitToggle.checked) {
        metricUnits.forEach(m => m.classList.remove('hidden'));
        imperialUnits.forEach(i => i.classList.add('hidden'));
    } else {
        metricUnits.forEach(m => m.classList.add('hidden'));
        imperialUnits.forEach(i => i.classList.remove('hidden'));
    }
});