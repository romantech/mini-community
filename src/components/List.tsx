import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostsByCategory } from '../modules/community/communitySelector';
import { changeCategory } from '../modules/community/communitySlice';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const dispatch = useDispatch();
  console.log(posts);

  return (
    <div>
      <ul>
        <li>
          <Link to="../post/1" state={{ id: 1, name: 'test1' }}>
            포스트1
          </Link>
        </li>
      </ul>
      <button type="button" onClick={() => dispatch(changeCategory(1))}>
        카테고리 변경
      </button>
    </div>
  );
}
