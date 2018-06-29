var locs = [{ lat: 11.22, lng: 22.11 }]

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
    const API_KEY = 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg';
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${API_KEY}`)
        .then((addressData) => {
            return addressData.json()
                .then((jsonAddressData) => {
                    console.log('address', jsonAddressData)
                    return jsonAddressData.results[0].formatted_address;
                });
        });
}


export default {
    getLocs,
    getPosition,
    getAddress
}