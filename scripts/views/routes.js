'use strict';

// page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/viewDetail/:id', ctx => app.Book.fetchOne(ctx, app.bookView.singleBookDisplay));
page('/books/new', app.bookView.newBookEntryForm);

page();