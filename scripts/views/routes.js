'use strict';
// if(window.location.pathname !== '/') {
//   page.base('/booklist-client');
// }

// page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/viewDetail/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.singleBookDisplay));
page('/books/new', app.bookView.newBook);
page('/delete/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDeleteBook));
page('/update/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateBook));

page();