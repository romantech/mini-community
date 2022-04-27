import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectLastPosition,
  selectPostsByCategory,
} from 'modules/community/communitySelector';
import Category from './Category';
import Post from './Post';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);

  useEffect(() => {
    if (lastPosition) window.scrollTo(0, lastPosition);
  }, [lastPosition]);

  return (
    <div>
      <Category />
      {posts.map((post, i) => (
        <Post key={post.pk} post={post} isLast={posts.length - 1 === i} />
      ))}
    </div>
  );
}
