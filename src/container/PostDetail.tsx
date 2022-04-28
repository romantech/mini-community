import React from 'react';
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

export default function PostDetail() {
  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);
  const flexCol = 'flex flex-col gap-2';

  return (
    <>
      <header className="h-14 p-6">
        <BackButton text={KR_BACK_TO_LIST} to={siteUrl.community.list} />
      </header>
      {post && (
        <article className={flexCol}>
          <section className="flex flex-col gap-4 px-7 pt-3 pb-2 leading-6">
            <UserInfo post={post} />
            <div className={flexCol}>
              <Title text={post.title} truncate={false} size="17px" />
              <Content text={post.content} linkify size="15px" />
            </div>
          </section>
          {Array.isArray(post.imageUrl) && (
            <section className={flexCol}>
              {post.imageUrl.map(url => (
                <Image key={getRandomKey()} url={url} aspectRatio="content" /> // tailWind 커스텀
              ))}
            </section>
          )}
        </article>
      )}
    </>
  );
}
