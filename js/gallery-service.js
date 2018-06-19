'use strict';
console.log('gallery-service');

var gProjs = [
                {
                    id: 'todos',
                    name: 'Todo\'s',
                    title: 'Fill your list and clear it too!',
                    desc: 'A web app to help you organize your to-do list; Add tasks, mark the ones you\'ve done, filter and sort them.',
                    url: 'projs/todos',
                    publishedAt: getTimeStamp(),
                    // labels: ['']
                },

                {
                    id: 'minesweeper',
                    name: 'Minesweeper',
                    title: 'Watch your step...',
                    desc: 'Play the classic Windows game in three levels of difficulty.',
                    url: 'projs/minesweeper',
                    publishedAt: getTimeStamp(),
                    // labels: ['Matrix']
                },

                {
                    id: 'touchNums',
                    name: 'Touch the Numbers',
                    title: 'How fast can you count to 16?',
                    desc: 'Find consecutive numbers as fast as possible and enjoy three levels of difficulty.',
                    url: 'projs/touchNums',
                    publishedAt: getTimeStamp(),
                    // labels: ['Matrix']
                },

                {
                    id: 'inPicture',
                    name: 'What\'s in the Picture?',
                    title: 'It\'s one or the other',
                    desc: 'Pick one of two possible answers to describe the picture accurately.',
                    url: 'projs/inPicture',
                    publishedAt: getTimeStamp(),
                    // labels: ['']
                },

                {
                    id: 'guessMe',
                    name: 'Guess Me',
                    title: 'lorem ipsum dolor',
                    desc: 'lorem ipsum dolor.',
                    url: 'projs/guessMe',
                    publishedAt: getTimeStamp(),
                    // labels: ['']
                },

                {
                    id: 'psdToHtml',
                    name: 'PSD to HTML',
                    title: 'Pixel Perfect',
                    desc: 'lorem ipsum dolor.',
                    url: 'projs/psdToHtml',
                    publishedAt: getTimeStamp(),
                    // labels: ['']
                }
];


saveToStorage('projs', gProjs);


function getProjById(projId) {
    var foundProj = gProjs.find(function (proj) {
        return proj.id === projId;
    });
    return foundProj;
}