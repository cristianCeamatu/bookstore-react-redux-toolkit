import React from 'react';

import { useDispatch } from 'react-redux';
import { changeFilter } from './booksSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const categories = [
    'All',
    'Action',
    'Biography',
    'History',
    'Horror',
    'Kids',
    'Learning',
    'Sci-Fi',
  ];
  const categoriesOptions = categories.map((category) => (
    <option key={category} value={category === 'All' ? '' : category}>
      {category}
    </option>
  ));

  return (
    <div className="filter form-group bg-white w-100 px-2 py-4 shadow-sm mb-0">
      <label
        htmlFor="category"
        className="d-flex align-items-center justify-content-center mb-0"
      >
        Filter by category
        <select
          className="form-control ml-3 w-50"
          id="category"
          name="category"
          onChange={(e) => dispatch(changeFilter(e.target.value))}
        >
          {categoriesOptions}
        </select>
      </label>
    </div>
  );
};

export default CategoryFilter;
