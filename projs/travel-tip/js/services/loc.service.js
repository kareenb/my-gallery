const API_KEY = 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg';

function getCurrPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

function getAddress(coords) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${API_KEY}`)
        .then((addressData) => {
            return addressData.json()
                .then((jsonAddressData) => {
                    return jsonAddressData.results[0].formatted_address;
                });
        });
}

function getLocationByAddress(address) {
    address = (address.split(' ')).join('+');
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then((locationData) => {
            return locationData.json()
                .then((jsonLocationData) => {
                    return jsonLocationData.results[0].geometry.location;
                });
        });
}

export default {
    getCurrPosition,
    getAddress,
    getLocationByAddress
}