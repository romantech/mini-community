import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectPost } from 'modules/community/communitySelector';
import siteUrl from 'routes/url';
import { getRandomKey } from 'lib/utils';
import { KR_BACK_TO_LIST } from 'lib/constants';
import UserInfo from 'components/UserInfo';
import BackButton from 'components/BackButton';
import Image from 'components/Image';
import Title from 'components/Title';
import Content from 'components/Content';
import InteractiveStat from 'components/InteractiveStat';
import { clearSelectedPost } from 'modules/community/communitySlice';
import { useAppDispatch } from 'modules/store';

export default function PostDetail() {
  const dispatch = useAppDispatch();

  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedPost());
      // 1번 포스트 열람 -> 리스트 -> 2번 포스트를 열람할 때
      // 2번 포스트 정보를 불러오기 전 1번 포스트가 잠깐 보이므로 selectedPost 상태 비우기
    };
  }, [dispatch]);

  return (
    <>
      <header className="h-14 p-6">
        <BackButton text={KR_BACK_TO_LIST} to={siteUrl.community.list} />
      </header>
      {post && (
        <article className="flex-col-gap4">
          <section className="flex-col-gap4 px-7 pt-3 leading-6">
            <UserInfo post={post} />
            <div className="flex-col-gap2">
              <Title text={post.title} truncate={false} size="17px" />
              <Content text={post.content} linkify size="15px" />
            </div>
          </section>
          {Array.isArray(post.imageUrl) && (
            <section className="flex-col-gap2">
              {post.imageUrl.map(url => (
                <Image key={getRandomKey()} url={url} ratio="content" />
              ))}
            </section>
          )}
          <InteractiveStat
            className="px-7 mb-3"
            post={post}
            loading={loading}
          />
        </article>
      )}
    </>
  );
}
