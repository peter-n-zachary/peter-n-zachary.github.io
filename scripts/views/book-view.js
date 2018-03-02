'use strict';

var app = app || {};

(function (module) {
  let bookView = {};
  bookView.initIndexPage = () => {
    console.log('initindexpage triggered')
    // let template = Handlebars.compile($('#book-template').text());
    $('.container').hide();
    $('.book-item').empty();
    $('.book-view').show();
    $('.stats').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#total-list').hide();
    $('#totalBooks').text('Number of Total Books: ' + app.Book.all.length);
  }

  bookView.singleBookDisplay = (ctx) => {
    console.log(ctx);
    $('.container').hide();
    $('.singlebook-item').empty();
    $('.single-view').show();
    let template = Handlebars.compile($('#singlebook-template').text());
    $('#singlebook-list').append(template(ctx));

  }

  bookView.newBookEntryForm = function () {
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
      app.Book.insertRecord(book);
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

  // bookView.handleDelete = event => {
  //   event.preventDefault();
  //   console.log(event);
  //   let id = $('#delete-yes').attr('book_id');
  //   module.Book.deleteBook(id);
  // };

  bookView.initDeleteBook = (ctx) => {
    console.log('init delete book');
    $('.container').hide();
    let template = Handlebars.compile($('#delete-book-template').text());
    $('.delete').show();
    $('.delete-book-item').empty();
    $('.delete').append(template(ctx));
    $('#delete').attr('book_id', ctx.book_id);
    $('#delete-btn').on('click', function(event){
      event.preventDefault();
      let id = $('#delete').attr('book_id');
      app.Book.deleteBook(id);

    });
    $('#cancel-btn').on('click', function(event){
      event.preventDefault();
      app.Book.cancel();
    });

    $('#update-btn').on('click', function (event) {
      event.preventDefault();
      app.Book.cancel();
    });

  };


  module.bookView = bookView;

})(app);

//Document.ready()
// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })
//when page is reloaded / refreshed, redirect to index
// $(function() {
//   if (performance.navigation.type === 1) {
//     page('/');
//   }
// })

