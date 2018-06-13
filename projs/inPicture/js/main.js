'use strict';

var gQuests = createQuests();

var gCurrQuestIdx = 0;

var gCanAnswer = true;

function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx];
    var elQuest = document.querySelector('.quest');
    var strHTML = '';

    strHTML = '<img src="img/' + currQuest.id + '.jpg" />';
    strHTML += '<div class="options">';
    for (var i = 0; i < currQuest.opts.length; i++) {
        strHTML += '<button onclick="checkAnswer(' + i + ', this)">' + currQuest.opts[i] + '</button>';
    }
    elQuest.innerHTML = strHTML + '</div>';
}


function checkAnswer(optIdx, elBtn) {
    if (!gCanAnswer) return;
    var currQuest = gQuests[gCurrQuestIdx];
    if (optIdx === currQuest.correctOptIndex) {
        elBtn.style.backgroundColor = 'rgba(12, 238, 31, 0.7)';
        gCanAnswer = false;
        gCurrQuestIdx++;
        setTimeout(function () {
            if (gCurrQuestIdx < gQuests.length) {
                renderQuest();
            } else toggleGameDisplay(true);
            gCanAnswer = true;
        }, 2000);
    } else {
        elBtn.style.backgroundColor = 'rgba(238, 76, 12, 0.7)';
        setTimeout(function () {
            elBtn.style.backgroundColor = '';
        }, 1500);
    }
}


function toggleGameDisplay(isGameOver) {
    var elUserMsg = document.querySelector('.game-over');
    elUserMsg.classList[isGameOver ? 'remove' : 'add']('hidden');
    var elQuest = document.querySelector('.quest');
    elQuest.classList[isGameOver ? 'add' : 'remove']('hidden');
}

function initGame() {
    gCurrQuestIdx = 0;
    toggleGameDisplay()
    renderQuest();
}

function createQuests() {
    return [
        {
            id: 1,
            opts: ['The boy is eating a burger', 'The boy is smelling a flower'],
            correctOptIndex: 1
        },
        {
            id: 2,
            opts: ['The dog is eating dogfood', 'The dog is chasing a ball'],
            correctOptIndex: 0
        },
        {
            id: 3,
            opts: ['The girl is playing chess', 'The girl is watching TV'],
            correctOptIndex: 0
        }
    ];
}

