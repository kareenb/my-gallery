'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    gQuestsTree = loadFromStorage('quests');
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
    
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }

    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.gameStart').hide();
    renderQuest();
    $('.gameQuest').show();
}

function renderQuest() {
    $('.gameQuest h2').html(gCurrQuest.txt);
}

function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
            $('.gameQuest').hide();
            $('.restartGame').show();
        } else {
            alert('I dont know...teach me!')
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        gPrevQuest = gCurrQuest;
        gLastRes = res;
        gCurrQuest = gPrevQuest[res]
        
        renderQuest();
    }
}

function addGuess() {
    var newQuestTxt = $('#newQuest').val();
    var newQuest = createQuest(newQuestTxt);
    var newQuestRes = $('#newGuess').val();
    
    gPrevQuest[gLastRes] = newQuest;
    newQuest.yes = createQuest(newQuestRes);
    newQuest.no = gCurrQuest;

    saveToStorage('quests', gQuestsTree);
    
    $('#newQuest').val('');
    $('#newGuess').val('');
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    $('.restartGame').hide();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}