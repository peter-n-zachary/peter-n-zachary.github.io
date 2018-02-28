'use strict';

var app = app || {};

(function (module) {
  let bookView = {};
  bookView.initIndexPage = () => {
    // let template = Handlebars.compile($('#book-template').text());
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
    // app.Book.all.forEach(a => $('#book-template').append(a.toHtml()));
    $('#totalBooks').text('Number of Total Books: ' + app.Book.all.length);
  }

  module.bookView = bookView;
})(app);

//Document.ready()
$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
