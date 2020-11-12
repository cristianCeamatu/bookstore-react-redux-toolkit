import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// Store Actions
import {
  addComment,
  removeCommentAsync,
  setUpdatingBookdId,
} from './booksSlice';

const Comments = ({ comments, bookId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const handleAddComment = () => {
    dispatch(setUpdatingBookdId(bookId));
    dispatch(addComment({ text, bookId }));
    setText('');
  };

  const commentItems =
    comments &&
    comments.map((comment) => {
      const createdAt = moment(
        new Date(comment.created_at),
        'YYYYMMDD'
      ).fromNow();

      return (
        <article
          className="comment px-2 py-0 border rounded bg-light shadow-sm mb-2"
          key={comment.id}
        >
          <div className="d-flex align-items-center justify-content-between">
            {comment.text}
            <button
              type="button"
              className="btn text-danger"
              onClick={() => dispatch(removeCommentAsync(comment))}
            >
              X
            </button>
          </div>
          <p className="text-right text-secondary mr-3 font-italic h6">
            {createdAt}
          </p>
        </article>
      );
    });

  const updatingBookId = useSelector((state) => state.books.updatingBookId);
  const loader = useSelector((state) => state.books.loaders.addComment);
  const error = useSelector((state) => state.books.errors.addComment);

  return (
    <div>
      {commentItems}
      <div className="add-comment-container">
        <div className="form-group">
          <input
            type="text"
            minLength="2"
            maxLength="1000"
            required
            name="comment"
            id="comment"
            className="form-control mb-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment text here..."
          />
        </div>
        <button
          type="button"
          className="btn btn-info mx-auto d-block"
          onClick={handleAddComment}
        >
          {loader && updatingBookId === bookId
            ? 'Adding comment...'
            : 'Add comment'}
        </button>
      </div>
      {error && (
        <div className="alert alert-danger text-center mx-auto mt-2 w-75">
          {error}
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  bookId: PropTypes.number.isRequired,
};
export default Comments;
