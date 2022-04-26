import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostsByCategory } from 'modules/community/communitySelector';
import Category from './Category';

export default function List() {
  const posts = useSelector(selectPostsByCategory);

  return (
    <div>
      <Category />
    </div>
  );
}
