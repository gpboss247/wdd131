
// STATIC WEATHER VALUES (Nigeria — Lagos)
// Metric units: °C and km/h

const temperature = 32;   // °C  — hot tropical day
const windSpeed   = 3.5;  // km/h — light breeze


// WIND CHILL CALCULATION — Metric formula
// Environment Canada / NOAA metric formula:
//   WC = 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
//   Where T = temperature in °C, V = wind speed in km/h

function calculateWindChill(temp, wind) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}


// CONDITIONS CHECK:
//   Metric: temp <= 10°C  AND  wind > 4.8 km/h
//   Nigeria is tropical temp is 32°C and wind is 3.5 km/h
//   BOTH conditions fail → display "N/A"

const windChillEl = document.getElementById('wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
    windChillEl.textContent = calculateWindChill(temperature, windSpeed) + '°C';
} else {
    windChillEl.textContent = 'N/A';
}

// FOOTER — current year and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;