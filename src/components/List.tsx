import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostsByCategory } from 'modules/community/communitySelector';
import Category from './Category';
import Post from './Post';

export default function List() {
  const posts = useSelector(selectPostsByCategory);

  return (
    <div>
      <Category />
      {posts.map(post => (
        <Post key={post.pk} post={post} />
      ))}
    </div>
  );
}
