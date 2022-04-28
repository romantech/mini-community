import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectCurrentCategory,
  selectLastPosition,
  selectPostsByCategory,
} from 'modules/community/communitySelector';
import Category from 'components/Category';
import { useAppDispatch } from 'modules/store';
import { changeCategory } from 'modules/community/communitySlice';
import Post from './Post';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);

  const list = useSelector(selectCategories);
  const current = useSelector(selectCurrentCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastPosition) window.scrollTo(0, lastPosition);
  }, [lastPosition]);

  return (
    <div>
      <Category
        list={list}
        current={current}
        clickHandler={cpk => dispatch(changeCategory(cpk))}
      />
      {posts.map((post, i) => (
        <Post key={post.pk} post={post} isLast={posts.length - 1 === i} />
      ))}
    </div>
  );
}
