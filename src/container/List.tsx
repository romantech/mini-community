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
import { KR_COMMUNITY } from '../lib/constants';

export default function List() {
  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);

  const categoryList = useSelector(selectCategories);
  const currentCategory = useSelector(selectCurrentCategory);

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
        categoryList={categoryList}
        currentCategory={currentCategory}
        clickHandler={cpk => dispatch(changeCategory(cpk))}
      />
      <section>
        {posts.map((post, i) => (
          <Post key={post.id} post={post} isLast={posts.length - 1 === i} />
        ))}
      </section>
    </>
  );
}
