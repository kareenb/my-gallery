'use strict';
console.log('utils');


function getTimeStamp() {
    return Date.now();
}


function getDate(timestamp) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    var date = new Date(timestamp);
    var fullDate = months[date.getMonth()] + ' ' + date.getFullYear();
    return fullDate;
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}