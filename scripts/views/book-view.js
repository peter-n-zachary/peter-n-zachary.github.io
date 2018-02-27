'use strict';

var app = app || {};

(function (module) {
  let bookView = {};
  bookView.initIndexPage = () => {
    // let template = Handlebars.compile($('#book-template').text());
    app.Book.all.forEach(a => $('#book-template').append(a.toHtml()));
    $('#stats .total-books').text(app.Book.numOfBooks());
  }

  module.bookView = bookView;
})(app);
