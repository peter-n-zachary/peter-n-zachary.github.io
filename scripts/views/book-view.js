'use strict';

var app = app || {};

(function (module) {
  let bookView = {};
  bookView.initIndexPage = () => {
    console.log('initindexpage triggered')
    // let template = Handlebars.compile($('#book-template').text());
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#totalBooks').text('Number of Total Books: ' + app.Book.all.length);
  }

  bookView.singleBookDisplay = (book) => {
    // console.log(book);
    $('.container').hide();
    $('.single-book-view').show();
    let template = Handlebars.compile($('#single-book-list-template').text());
    $('#single-book-template').append(template(book));
  }

  module.bookView = bookView;
})(app);

//Document.ready()
$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
// $('.book-item').click(function() {app.Book.fetchOne(app.bookView.singleBookDisplay)});
