import React from 'react';
import { Link } from 'react-router-dom';

export default function List() {
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
