import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const booksSlice = createSlice({
  name: 'books',
  initialState: { books: [], filter: '' },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
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

export default booksSlice.reducer;
