import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectCurrentCategoryId,
  selectLastPosition,
  selectPostsByCategory,
} from 'modules/community/communitySelector';
import Category from 'components/Category';
import { useAppDispatch } from 'modules/store';
import {
  changeCategory,
  setLastPosition,
} from 'modules/community/communitySlice';
import { KR_COMMUNITY, KR_NEWPOST_EMJ } from 'lib/constants';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import siteUrl from 'routes/url';
import Post from './Post';

export default function List() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);

  const categories = useSelector(selectCategories);
  const currentId = useSelector(selectCurrentCategoryId);

  useEffect(() => {
    if (lastPosition) window.scrollTo(0, lastPosition);
  }, [lastPosition]);

  const composeBtnHandler = () => {
    dispatch(setLastPosition(window.scrollY));
    navigate(siteUrl.community.post.new);
  };

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
      <Button
        text={KR_NEWPOST_EMJ}
        rounded
        onClick={composeBtnHandler}
        className="fixed bottom-4 right-4"
      />
    </>
  );
}
