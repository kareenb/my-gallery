// console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'


document.querySelector('.btn-user-loc').addEventListener('click', renderLoc);
// document.querySelector('.btn-inserted-loc').addEventListener('click', renderInsertedLoc);
document.querySelector('.btn-copy-loc').addEventListener('click', copyLoc);
    

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
                locService.getAddress({ lat: 32.0749831, lng: 34.9120554 })
                    .then((addressByCoords) => {renderAddressName(addressByCoords)})
            }
        ).catch(console.warn);

    locService.getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords);
            return pos.coords;
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


function renderLoc() {
    locService.getPosition()
        .then(userPos => {
            // console.log(userPos)
            let userCoords = { lat: userPos.coords.latitude, lng: userPos.coords.longitude };
            mapService.showUserLoc(userCoords);
            locService.getAddress(userCoords)
                .then((addressByCoords) => renderAddressName(addressByCoords));
            weatherService.getWeather(userCoords)
                .then((weatherInfo) => {
                    // console.log (weatherInfo);
                    renderWeather(weatherInfo);
                });            
        });
}


function renderAddressName(address) {
    document.querySelector('.curr-loc').innerHTML = `Location: ${address}`;
}


function renderWeather(weatherInfo) {
    document.querySelector('.weather img').src = `http://openweathermap.org/img/w/${weatherInfo.weatherIcon}.png`;
    document.querySelector('.weather img').alt = `${weatherInfo.weatherCondition} weather condition`;
    document.querySelector('.weather h4').innerText = `${weatherInfo.city}, ${weatherInfo.country}`;
    document.querySelector('.weather h5').innerText = weatherInfo.weatherCondition;
    document.querySelector('.weather p').innerHTML = `<span>${weatherInfo.currTemp}&#8451;</span> temprature from ${weatherInfo.minTemp} to ${weatherInfo.maxTemp}&#8451;, wind ${weatherInfo.wind} m/s`;
}

// function renderInsertedLoc() {
//     let elUserInsertedLoc = document.querySelector('.user-inserted-loc').value;
//     console.log(elUserInsertedLoc.join('+'))
//     // let addressPrm = fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg')
// }

function copyLoc() {
    let elCopiedAddress = document.querySelector('.copy-loc')
    // elCopiedAddress.value = `kareenb.github.io/my-gallery/projs/travel-tip/index.html?lat=${}&lng=${}`;
    elCopiedAddress.value = "my txt"
    elCopiedAddress.select();
    document.execCommand('copy');
}