var map;
var markers = [];

function initMap() {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), { zoom: 15 });
        });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Chosen Location'
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
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
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