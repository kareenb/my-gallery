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

    revealGenie();
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
            toggleGenieRightModal();
            $('.gameQuest').hide();
            $('.restartGame').show();
        } else {
            toggleGenieWrongModal();
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
    toggleGenieWrongModal();
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
    if (!document.querySelector('.genie-right').classList.contains('no-display')) toggleGenieRightModal();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function revealGenie() {
    $('.genie').addClass('visible');
}

function toggleGenieRightModal() {
    $('.genie').toggleClass('no-display');
    $('.genie-right').toggleClass('no-display');
}

function toggleGenieWrongModal() {
    $('.genie').toggleClass('no-display');
    $('.genie-wrong').toggleClass('no-display');
}