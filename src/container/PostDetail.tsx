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

  return (
    <>
      <header className="h-14 flex items-center py-6 px-5">
        <BackButton text={KR_BACK_TO_LIST} to={siteUrl.community.list} />
      </header>
      {post && (
        <article className="flex flex-col gap-2">
          <section className="flex flex-col gap-3 px-7 py-2">
            <UserInfo post={post} />
            <Title text={post.title} truncate={false} size="17px" />
            <Content text={post.content} linkify size="15px" />
          </section>
          {Array.isArray(post.imageUrl) && (
            <section className="flex flex-col gap-2">
              {post.imageUrl.map(url => (
                <Image key={getRandomKey()} url={url} aspectRatio="content" />
              ))}
            </section>
          )}
        </article>
      )}
    </>
  );
}
