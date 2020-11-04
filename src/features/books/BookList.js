import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Book from './Book';
import { getBooks } from './booksSlice';

const BookList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  let bookItems = [...useSelector((state) => state.books.books)];
  const filter = useSelector((state) => state.books.filter);

  if (filter) {
    bookItems = bookItems.filter((book) => book.category === filter);
  }

  bookItems = bookItems
    .sort(
      (bookA, bookB) => new Date(bookB.created_at) - new Date(bookA.created_at)
    )
    .map((book) => <Book key={book.id} book={book} />);

  return (
    <section className="book-list py-4 border-bottom">{bookItems}</section>
  );
};

export default BookList;
