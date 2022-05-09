import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectPost,
} from 'modules/community/community.selector';
import siteUrl from 'routes/siteUrl';
import { getRandomKey } from 'lib/utils';
import { KR_BACK_TO_LIST } from 'lib/constants';
import UserInfo from 'components/community/UserInfo';
import Back from 'components/common/Back';
import Image from 'components/common/Image';
import Title from 'components/common/Title';
import Content from 'components/common/Content';
import InteractiveStat from 'components/community/InteractiveStat';
import { useAppDispatch } from 'modules/store';
import NotFound from 'components/common/NotFound';
import { patchPostData } from 'modules/community/community.thunk';
import { clearSelectedPost } from 'modules/community/community.slice';
import useMounted from 'hooks/useMounted';

export default function PostDetail() {
  const dispatch = useAppDispatch();

  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);

  const mounted = useMounted();
  const showNotFound = !loading && mounted;

  useEffect(() => {
    if (post) {
      dispatch(patchPostData({ id: post.id, viewCount: post.viewCount + 1 }));
    }
  }, [dispatch, post]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedPost());
      // 1번 포스트 열람 -> 리스트 -> 2번 포스트를 열람할 때
      // 2번 포스트 정보를 불러오기 전 1번 포스트가 잠깐 보이므로 selectedPost 상태 비우기
    };
  }, [dispatch]);

  let imageList;
  if (post?.imageUrl?.length) {
    imageList = Array.isArray(post.imageUrl) ? post.imageUrl : [post.imageUrl];
  }

  return (
    <>
      <header className="h-14 p-6">
        <Back text={KR_BACK_TO_LIST} to={siteUrl.community.list} />
      </header>
      {post ? (
        <article className="flex-col-gap4">
          <section className="flex-col-gap4 px-7 pt-3 leading-6">
            <UserInfo post={post} />
            <div className="flex-col-gap2">
              <Title text={post.title} truncate={false} size="17px" />
              <Content text={post.content} linkify size="15px" />
            </div>
          </section>
          <section className="flex-col-gap2">
            {imageList?.map((url, i) => (
              <Image key={getRandomKey(i)} src={url} />
            ))}
          </section>
          <InteractiveStat
            className="px-7 mb-3"
            post={post}
            loading={loading}
          />
        </article>
      ) : (
        showNotFound && <NotFound className="-mt-14" />
      )}
    </>
  );
}
