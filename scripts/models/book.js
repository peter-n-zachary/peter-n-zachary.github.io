'use strict';
var app = app || {};
// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://zs-pk-booklist.herokuapp.com';


(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  function Book(rawData) {
    // author, title, isbn, image_url, description
    this.author = rawData.author,
    this.title = rawData.title,
    this.isbn = rawData.isbn,
    this.image_url = rawData.image_url,
    this.description = rawData.description
  }

  Book.all = [];

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());
    this.description = marked(this.description);

    return template(this);
  };

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => b.title-a.title).map(book => new Book(book));

  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  };

  Book.numOfBooks = () => Book.all.length.reduce((a, b) => a + b);

  Book.stats = () => {
    return {
      numBooks: Book.numOfBooks()
    }
  };

  Book.prototype.insertRecord = function(callback) {
    // author, title, isbn, image_url, description
    $.post('/books', {author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(console.log)
      .then(callback);
  };

  module.Book = Book;
})(app);

