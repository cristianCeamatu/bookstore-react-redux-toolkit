import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const booksSlice = createSlice({
  name: 'books',
  initialState: { books: [], filter: '' },
  reducers: {
    fetchBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    fetchError: (state, action) => {
      console.log('state :>> ', state);
      console.log('error :>> ', action.payload);
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateBook: (state, action) => {
      state.books = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload;
        }
        return book;
      });
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    },
    addComment: (state, action) => {
      state.books = state.books.map((book) => {
        const newBook = book;
        if (book.id === action.payload.book_id) {
          newBook.comments = [...book.comments, action.payload];
          return newBook;
        }
        return book;
      });
    },
    removeComment: (state, action) => {
      state.books = state.books.map((book) => {
        const newBook = book;

        if (book.id === action.payload.book_id) {
          newBook.comments = book.comments.filter(
            (comment) => comment.id !== action.payload.id
          );
          return newBook;
        }
        return book;
      });
    },
  },
});

export const {
  fetchBooks,
  fetchError,
  addBook,
  removeBook,
  changeFilter,
  addComment,
  removeComment,
  updateBook,
} = booksSlice.actions;

export const getBooks = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://bookstore-backend-rails.herokuapp.com/books/'
    );
    const books = response.data;
    dispatch(fetchBooks(books));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export const addBookAsync = (book) => async (dispatch) => {
  try {
    const data = book;
    const response = await axios.post(
      'https://bookstore-backend-rails.herokuapp.com/books/',
      data
    );
    const payload = response.data;
    dispatch(addBook(payload));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export const updateBookAsync = ({ id, chapter, percentage }) => async (
  dispatch
) => {
  try {
    const data = { current_chapter: chapter, percent: percentage };
    const response = await axios.put(
      `https://bookstore-backend-rails.herokuapp.com/books/${id}`,
      data
    );
    const payload = response.data;
    dispatch(updateBook(payload));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export const removeBookAsync = (book) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://bookstore-backend-rails.herokuapp.com/books/${book.id}`
    );
    const payload = response.data;
    dispatch(removeBook(payload));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export const addCommentAsync = ({ text, bookId }) => async (dispatch) => {
  try {
    const data = { book_id: bookId, text };
    const response = await axios.post(
      'https://bookstore-backend-rails.herokuapp.com/comments/',
      data
    );
    const payload = response.data;
    return dispatch(addComment(payload));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export const removeCommentAsync = (comment) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://bookstore-backend-rails.herokuapp.com/comments/${comment.id}`
    );
    const payload = response.data;
    return dispatch(removeComment(payload));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export default booksSlice.reducer;
