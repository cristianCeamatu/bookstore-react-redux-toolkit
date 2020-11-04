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
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  if (filter) {
    bookItems = bookItems.filter((book) => book.category === filter);
  }

  bookItems = bookItems
    .sort(
      (bookA, bookB) => new Date(bookB.created_at) - new Date(bookA.created_at)
    )
    .map((book) => <Book key={book.id} book={book} />);

  return (
    (status === 'loadingBooks' && (
      <div className="alert alert-info my-4 d-block">
        {' '}
        Loading books from Heroku(sometimes he is sleeping)
      </div>
    )) ||
    (status === 'failedLoadingBooks' && (
      <div className="alert alert-danger my-4 d-block">Error: {error}</div>
    )) || (
      <section className="book-list py-4 border-bottom">{bookItems}</section>
    )
  );
};

export default BookList;
