'use strict';

var app = app || {};

(function (module) {
  let bookView = {};
  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-item').empty();
    $('.book-view').show();
    $('.stats').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-list').hide();
    $('#totalBooks').text('Number of Total Books: ' + app.Book.all.length);
  }

  bookView.singleBookDisplay = (ctx) => {
    $('.container').hide();
    $('.singlebook-item').empty();
    $('.single-view').show();
    let template = Handlebars.compile($('#singlebook-template').text());
    $('#singlebook-list').append(template(ctx));

  }

  bookView.newBook = function () {
    $('.container').hide();
    $('.new-book').show();
    $('#new-book-form').on('submit', function (event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }
      app.Book.create(book);
    })
  }

  bookView.handleUpdateForm = event => {
    event.preventDefault();
    let book = new app.Book({
      book_id: $('#new-book-form').attr('book_id'),
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-url').val(),
      description: $('#book-description').val()
    });
    module.Book.updateBook(book);
  };

  bookView.initDeleteBook = (ctx) => {
    $('.container').hide();
    let template = Handlebars.compile($('#delete-book-template').text());
    $('.delete').show();
    $('.delete-book-item').empty();
    $('.delete').append(template(ctx));
    $('#delete-btn').on('click', function(event){
      event.preventDefault();
      app.Book.deleteBook(ctx.book_id);

    });
    $('#cancel-btn').on('click', function(event){
      event.preventDefault();
      app.Book.cancel();
    });

  };

  bookView.initUpdateBook = (ctx) => {
    $('.container').hide();
    let template = Handlebars.compile($('#update-book-template').text());
    $('.update').show();
    $('.update-book-item').empty();
    $('.update').append(template(ctx));

    $('#update-btn').on('click', function(event){
      event.preventDefault();
      let book = {
        book_id: ctx.book_id,
        title: $('#update-title').val() || ctx.title,
        author: $('#update-author').val() || ctx.author,
        isbn: $('#update-isbn').val() || ctx.isbn,
        image_url: $('#update-image_url').val() || ctx.image_url,
        description: $('#update-description').val() || ctx.description
      };
      app.Book.updateBook(book);

    });
    $('#cancel-btn').on('click', function(event){
      event.preventDefault();
      app.Book.cancel();
    });

  };


  module.bookView = bookView;

})(app);
