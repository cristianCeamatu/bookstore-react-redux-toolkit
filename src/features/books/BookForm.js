import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addBook } from './booksSlice';

const BookForm = () => {
  const dispatch = useDispatch();
  const categories = [
    'Action',
    'Biography',
    'History',
    'Horror',
    'Kids',
    'Learning',
    'Sci-Fi',
  ];

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    percent: '0',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(book));
    setBook({
      percent: '0',
      author: '',
      title: '',
      category: '',
    });
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const addingBookLoader = useSelector(
    (state) => state.books.loaders.addingBookLoader
  );
  const addingBookLoaderError = useSelector(
    (state) => state.books.errors.addingBookLoader
  );

  const categoriesOptions = categories.map((category) => (
    <option key={category}>{category}</option>
  ));

  const { title, category, author } = book;
  return (
    <section className="add-book-form form-group bg-white w-100 px-2 py-4 shadow-sm mb-0">
      <form
        className="d-flex align-items-stretch align-items-md-center flex-wrap flex-column flex-md-row justify-content-center w-100 py-3 px-2"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-0">
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder="Book title"
            minLength="3"
            maxLength="40"
            required
            onChange={handleChange}
            value={title}
          />
        </div>

        <div className="form-group mb-0 mx-md-2">
          <input
            type="text"
            className="form-control"
            name="author"
            id="author"
            placeholder="Book author"
            minLength="3"
            maxLength="40"
            required
            onChange={handleChange}
            value={author}
          />
        </div>

        <div className="form-group mb-0 w-md-25">
          <select
            className="form-control"
            id="category"
            name="category"
            onChange={handleChange}
            value={category}
            required
          >
            <option value="" disabled>
              Category
            </option>
            {categoriesOptions}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-info px-5 text-uppercase ml-md-2 mt-2 mt-lg-0"
          disabled={addingBookLoader}
        >
          {addingBookLoader ? 'Adding book...' : 'Add book'}
        </button>
      </form>
      {addingBookLoaderError && (
        <div class="alert alert-danger text-center mx-auto w-75">
          {addingBookLoaderError}
        </div>
      )}
    </section>
  );
};

export default BookForm;
