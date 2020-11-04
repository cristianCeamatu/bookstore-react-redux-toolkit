import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addCommentAsync, removeCommentAsync } from './booksSlice';

const Comments = ({ comments, bookId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const handleAddComment = () => {
    dispatch(addCommentAsync({ text, bookId }));
    setText('');
  };

  const commentItems =
    comments &&
    comments.map((comment) => (
      <article
        className="comment px-2 py-0 border rounded bg-light shadow-sm mb-2 d-flex align-items-center justify-content-between"
        key={comment.id}
      >
        {comment.text}
        <button
          type="button"
          className="btn text-danger"
          onClick={() => dispatch(removeCommentAsync(comment))}
        >
          X
        </button>
      </article>
    ));

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
          Add comment
        </button>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  bookId: PropTypes.number.isRequired,
};
export default Comments;
