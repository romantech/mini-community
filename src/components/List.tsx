import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectPostsByCategory,
} from 'modules/community/communitySelector';
import { changeCategory } from 'modules/community/communitySlice';
import Category from './Category';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <div>
      <Category
        categories={categories}
        clickHandler={(categoryPk: CategoryPk) =>
          dispatch(changeCategory(categoryPk))
        }
      />
    </div>
  );
}
