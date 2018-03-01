'use strict';
var app = app || {};
const __API_URL__ = 'http://localhost:3000';
// const __API_URL__ = 'https://zs-pk-booklist.herokuapp.com';


(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  function Book(rawBookObj) {
    // author, title, isbn, image_url, description
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);

  }

  Book.all = [];

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());

    return template(this);
  };

  // Book.prototype.singleToHtml = function () {
  //   let template = Handlebars.compile($('#single-book-list-template').text());

  //   return template(this);
  // };

  Book.loadAll = rows => {
    console.log('loadall triggered')
    // sort((a, b) => b.title - a.title)
    Book.all = rows.map(book => new Book(book));

  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  };

  Book.fetchOne = (ctx, callback) => {
    console.log(ctx);
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(array => new Book(array[0]))
      // .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);
  };

  Book.prototype.insertRecord = function(callback) {
    // author, title, isbn, image_url, description
    $.post('/books', {author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(console.log)
      .then(callback);
  };

  module.Book = Book;
})(app);

