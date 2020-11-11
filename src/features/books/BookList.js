import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Book from './Book';
import { getBooks } from './booksSlice';

const BookList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  let bookItems = [...useSelector((state) => state.books.books)];
  const filter = useSelector((state) => state.books.filter);
  const loadingBooks = useSelector((state) => state.books.loaders.loadingBooks);
  const loadingBooksError = useSelector(
    (state) => state.books.errors.loadingBooks
  );

  if (filter) {
    bookItems = bookItems.filter((book) => book.category === filter);
  }

  bookItems = bookItems
    .sort(
      (bookA, bookB) => new Date(bookB.created_at) - new Date(bookA.created_at)
    )
    .map((book) => <Book key={book.id} book={book} />);

  if (loadingBooks)
    return (
      <div className="alert alert-info my-4 d-block text-center">
        {' '}
        Loading books from Heroku(sometimes he is sleeping)
      </div>
    );

  if (loadingBooksError)
    return (
      <div className="alert alert-danger my-4 d-block text-center">
        Error: {loadingBooksError}
      </div>
    );
  return (
    <section className="book-list py-4 border-bottom">{bookItems}</section>
  );
};

export default BookList;
