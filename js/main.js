'use strict';
console.log('Starting up');


$('document').ready(initPage);


function initPage() {
    var projs = loadFromStorage('projs');
    renderPortItems(projs);
}


function renderPortItems(items) {
    var strHTML = '';
    items.forEach(function(item) {
        strHTML += `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderPortItemModal('${item.id}')">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${item.id}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${item.name}</h4>
            <p class="text-muted">${item.title}</p>
          </div>
        </div>`
    });
    $('#portfolio div.row:nth-child(2)').html(strHTML);
}


function renderPortItemModal(portItemId) {
    var item = getProjById(portItemId);
    var strHTML = `
                <h2>${item.name}</h2>
                <p class="item-intro text-muted">${item.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${portItemId}-full.jpg" alt="">
                <p>${item.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${getDate(item.publishedAt)}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project
                </button>
                <a class="btn btn-primary" href="projs/${portItemId}/index.html" target="q">Check it out</a>`

    $('#portfolioModal .modal-body').html(strHTML);
}


function sendUserMsg() {
    var msgSubj = $('.msg-subj').val();
    var msgBody = $('.msg-body').val();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=kareenb89@gmail.com&su=${msgSubj}&body=${msgBody}`, '_blank');
    
    $('.user-email').val('');
    var msgSubj = $('.msg-subj').val('');
    var msgBody = $('.msg-body').val('');
    openCanvas();
}