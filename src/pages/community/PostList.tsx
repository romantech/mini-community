import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectCurrentCategoryId,
  selectHasMore,
  selectLastPosition,
  selectPostsByCategory,
} from 'modules/community/community.selector';
import Category from 'components/community/Category';
import { useAppDispatch } from 'modules/store';
import {
  changeCategory,
  setLastPosition,
  setNextPage,
} from 'modules/community/community.slice';
import { KR_COMMUNITY, KR_COMPOSE_WITH_EMOJI } from 'lib/constants';
import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';
import siteUrl from 'routes/siteUrl';
import Post from 'components/community/Post';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

export default function PostList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const posts = useSelector(selectPostsByCategory);
  const lastPosition = useSelector(selectLastPosition);
  const categories = useSelector(selectCategories);
  const categoryId = useSelector(selectCurrentCategoryId);
  const hasMore = useSelector(selectHasMore);

  const loaderRef = useIntersectionObserver<HTMLDivElement>({
    callback: () => {
      if (posts.length % 10 === 0 && hasMore) dispatch(setNextPage());
    },
    unObserve: true,
  });

  useEffect(() => {
    if (lastPosition) window.scrollTo(0, lastPosition);
    else window.history.scrollRestoration = 'manual'; // 새로고침 시 이전 스크롤 복구 안함
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
        currentId={categoryId}
        onClick={id => dispatch(changeCategory(id))}
      />
      <section>
        {posts.map((post, i) => (
          <div key={post.id}>
            <Post post={post} isLast={posts.length - 1 === i} />
            {posts.length - 1 === i && (
              <div className="w-full h-0.5 invisible" ref={loaderRef} />
            )}
          </div>
        ))}
      </section>
      <Button
        text={KR_COMPOSE_WITH_EMOJI}
        onClick={composeBtnHandler}
        className="fixed bottom-4 right-4"
        rounded
        shadow
      />
    </>
  );
}
