import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(
    'https://bookstore-backend-rails.herokuapp.com/books/'
  );
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async () => {
  const response = await axios.post(
    'https://bookstore-backend-rails.herokuapp.com/books/',
    data
  );

  return response.data;
});

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    filter: '',
    loaders: {},
    errors: {},
  },
  reducers: {
    // addBook: (state, action) => {
    //   state.books.push(action.payload);
    // },
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
          book.percent = action.payload.percent;
          book.current_chapter = action.payload.current_chapter;
          return book;
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
  extraReducers: {
    [getBooks.pending]: (state) => {
      state.loaders.loadingBooks = true;
      state.errors.loadingBooks = false;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.loaders.loadingBooks = false;
      state.errors.loadingBooks = false;
    },
    [getBooks.rejected]: (state, action) => {
      state.errors.loadingBooks = action.error.message;
      state.loaders.loadingBooks = false;
    },
    [addBook.pending]: (state) => {
      state.loaders.addingBookLoader = true;
      state.errors.addingBookLoader = false;
    },
    [addBook.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.loaders.addingBookLoader = false;
      state.errors.addingBookLoader = false;
    },
    [addBook.rejected]: (state, action) => {
      state.errors.addingBookLoader = action.error.message;
      state.loaders.addingBookLoader = false;
    },
  },
});

export const {
  fetchError,
  // addBook,
  removeBook,
  changeFilter,
  addComment,
  removeComment,
  updateBook,
} = booksSlice.actions;

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
