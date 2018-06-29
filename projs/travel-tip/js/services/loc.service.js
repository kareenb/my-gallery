var locs = [{ lat: 11.22, lng: 22.11 }]
const API_KEY = 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg';

function getLocs() {
    return Promise.resolve(locs);
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function getAddress(coords) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${API_KEY}`)
        .then((addressData) => {
            return addressData.json()
                .then((jsonAddressData) => {
                    // console.log('address', jsonAddressData)
                    return jsonAddressData.results[0].formatted_address;
                });
        });
}


function getLocation(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then((locationData) => {
            return locationData.json()
                .then((jsonLocationData) => {
                    console.log(jsonLocationData)
                    return jsonLocationData
                });
        });
}

export default {
    getLocs,
    getPosition,
    getAddress
}