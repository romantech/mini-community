import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectPostsByCategory,
} from 'modules/community/communitySelector';
import { changeCategory } from 'modules/community/communitySlice';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {categories.map(({ categoryPk, categoryName }) => (
          <button
            className="mr-2"
            key={categoryPk}
            type="button"
            onClick={() => dispatch(changeCategory(categoryPk))}
          >
            {categoryName}
          </button>
        ))}
      </ul>
      <ul>
        {posts.map(({ pk, viewCount }) => (
          <li key={pk}>{`${pk} | ${viewCount}`}</li>
        ))}
      </ul>
    </div>
  );
}
