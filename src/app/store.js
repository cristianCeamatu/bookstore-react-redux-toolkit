import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/books/booksSlice';

export default configureStore({
  reducer: {
    books: bookReducer,
  },
});
