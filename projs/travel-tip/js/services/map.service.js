
var map;
var markers = [];

// function initMap(lat = 32.0749831, lng = 34.9120554) {
function initMap() {
    // console.log('InitMap');
    return _connectGoogleApi()
    .then(() => {
        // console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                // center: { lat, lng },
                zoom: 15
            })
        // console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    markers.push(marker);
    return marker;
}

function removeMarker() {
    markers.forEach((marker) => {
        marker.setMap(null);
    });
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg';
    // const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

function centerMap(coords) {
    map.setCenter(coords);
}

function showUserLoc(coords) {
    removeMarker();
    addMarker(coords);
    centerMap(coords);
}

export default {
    initMap,
    addMarker,
    showUserLoc
}

