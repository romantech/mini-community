import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostsByCategory } from '../modules/community/communitySelector';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
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
    </div>
  );
}
