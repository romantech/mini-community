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
import { KR_COMMUNITY } from 'lib/constants';
import Post from './Post';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);

  const categories = useSelector(selectCategories);
  const currentId = useSelector(selectCurrentCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastPosition) window.scrollTo(0, lastPosition);
  }, [lastPosition]);

  return (
    <>
      <header className="text-xl font-bold ml-6 pt-9 text-black">
        {KR_COMMUNITY}
      </header>
      <Category
        categories={categories}
        currentId={currentId}
        onClick={id => dispatch(changeCategory(id))}
      />
      <section>
        {posts.map((post, i) => (
          <Post key={post.id} post={post} isLast={posts.length - 1 === i} />
        ))}
      </section>
    </>
  );
}
