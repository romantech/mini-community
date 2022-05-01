import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectCurrentCategoryId,
  selectLastPosition,
  selectPostsByCategory,
} from 'modules/community/community.selector';
import Category from 'components/community/Category';
import { useAppDispatch } from 'modules/store';
import {
  changeCategory,
  setLastPosition,
} from 'modules/community/community.slice';
import { KR_COMMUNITY, KR_NEWPOST_EMJ } from 'lib/constants';
import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';
import siteUrl from 'routes/siteUrl';
import Post from 'components/community/Post';

export default function PostList() {
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
        onClick={composeBtnHandler}
        className="fixed bottom-4 right-4"
        rounded
        shadow
      />
    </>
  );
}
