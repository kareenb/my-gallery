'use strict'

var gNumsMin = 1;
var gNumsMax = 16;
var gNums;
var gOrderedNums = resetNums();


function chooseLevel(numsMax) {
    gNumsMax = numsMax;
    gNums = getNumsArr(gNumsMin, numsMax);
    renderBoard(gNums);
    gOrderedNums = resetNums();
}

function getNumsArr(min, max) {
    var nums = [];
    for (var i = min; i <= max; i++) {
        nums.push(i);
    }
    return nums;
}

function shuffle(arr) {
    var j, x;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function resetNums() {
    gNums = getNumsArr(gNumsMin, gNumsMax);
    return gNums;
}

function renderBoard(nums) {
    var elBoardTable = document.querySelector('.board-tbl');
    var htmlStr = '';
    var shuffledNums = shuffle(nums);
    for (var i = 0; i < gNumsMax ** 0.5; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gNumsMax ** 0.5; j++) {
            var num = shuffledNums.pop();
            htmlStr += '<td onclick="cellClicked(' + num + ', this)">' + num + '</td>';
        }
        htmlStr += '</tr>';
    }
    elBoardTable.innerHTML = htmlStr;
}

function cellClicked(clickedNum, elCell) {
    if (elCell.classList.contains('clicked')) return;
    if (clickedNum === gOrderedNums[0]) {
        elCell.classList.remove('wrong');
        elCell.classList.add('clicked');
        gOrderedNums.shift();
    } else elCell.classList.add('wrong');
}

function secondCounter() {
    var timer = 0;
    timer++
}

function startTimer() {
    var timerId = setInterval(secondCounter, 1000)
    var elTimer = document.querySelector('.time h4')
    var elTime = document.querySelector('.time')
    elTimer.innerText += timer;
    elTime.style.display = 'block';
}