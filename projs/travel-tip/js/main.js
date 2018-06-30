import locService from './services/loc.service.js';
import mapService from './services/map.service.js';
import weatherService from './services/weather.service.js';

var currLoc;
var isLoadedFromUrl = false;

document.querySelector('.btn-user-loc').addEventListener('click', renderUserLoc);
document.querySelector('.btn-inserted-loc').addEventListener('click', renderInsertedAddress);
document.querySelector('.btn-copy-loc').addEventListener('click', copyLoc);

window.onload = () => {
    mapService.initMap().catch(console.warn);
    renderUserLoc();
}

function renderUserLoc() {
    renderLoading();
    locService.getCurrPosition()
        .then(userLoc => {
            let urlCoords = { lat: getParameterByName('lat'), lng: getParameterByName('lng') };
            if (urlCoords.lat && urlCoords.lng && !isLoadedFromUrl) {
                currLoc = urlCoords;
                isLoadedFromUrl = true;
            } else {
                let userCoords = { lat: userLoc.coords.latitude, lng: userLoc.coords.longitude };
                currLoc = userCoords;
            }
            renderLocByCoords(currLoc);
        })
        .catch(err => {
            console.log('error in getting user location', err);
        });
}

function renderInsertedAddress() {
    renderLoading();
    let elUserInsertedAddress = document.querySelector('.user-inserted-loc').value;
    locService.getLocationByAddress(elUserInsertedAddress)
        .then((addressCoords) => {
            currLoc = addressCoords;
            renderLocByCoords(currLoc);
        });
}

function renderLocByCoords(coords) {
    renderLocOnMap(coords);
    renderAddressByLoc(coords);
    renderWeatherByLoc(coords);
}

function renderLocOnMap(coords) {
    mapService.showUserLoc(coords);
}

function renderAddressByLoc(coords) {
    locService.getAddress(coords)
        .then((addressByCoords) => renderAddressName(addressByCoords));
}

function renderAddressName(address) {
    document.querySelector('.curr-loc').innerText = `${address}`;
}

function renderWeatherByLoc(coords) {
    weatherService.getWeather(coords)
        .then((weatherInfo) => renderWeather(weatherInfo));
}

function renderWeather(weatherInfo) {
    document.querySelector('.weather h4:first-of-type').innerHTML = `${weatherInfo.city}, ${weatherInfo.country}`;
    document.querySelector('.weather h4:last-of-type').innerText = weatherInfo.weatherCondition;
    document.querySelector('.weather img').src = `https://openweathermap.org/img/w/${weatherInfo.weatherIcon}.png`;
    document.querySelector('.weather img').alt = `${weatherInfo.weatherCondition} weather condition`;
    document.querySelector('.weather p').innerHTML = `<span>${weatherInfo.currTemp}&#8451;</span> temprature from ${weatherInfo.minTemp} to ${weatherInfo.maxTemp}&#8451;, wind ${weatherInfo.wind} m/s`;
}

function renderLoading() {
    document.querySelector('.curr-loc').innerText = 'Searching the globe...';
}

function copyLoc() {
    let elAddressToCopy = document.querySelector('.copy-loc');
    elAddressToCopy.classList.toggle('hidden');
    elAddressToCopy.value = `kareenb.github.io/my-gallery/projs/travel-tip/index.html?lat=${currLoc.lat}&lng=${currLoc.lng}`;
    elAddressToCopy.select();
    document.execCommand('copy');
    elAddressToCopy.classList.toggle('hidden');
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return +decodeURIComponent(results[2].replace(/\+/g, " "));
}