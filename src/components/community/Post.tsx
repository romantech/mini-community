/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'modules/store';
import { setLastPosition } from 'modules/community/community.slice';
import StaticStat from 'components/community/StaticStat';
import Image from 'components/common/Image';
import Title from 'components/common/Title';
import Content from 'components/common/Content';
import UserInfo from 'components/community/UserInfo';

interface PostProps {
  post: Post;
  isLast: boolean;
}

export default function Post({ post, isLast }: PostProps) {
  const dispatch = useAppDispatch();
  const clickHandler = () => dispatch(setLastPosition(window.scrollY));
  const linkProps = { to: `../post/${post.id}`, onClick: clickHandler };

  let src;
  if (post?.imageUrl?.length) {
    src = Array.isArray(post.imageUrl) ? post.imageUrl[0] : post.imageUrl;
  }

  return (
    <>
      <article className="p-6 flex-col-gap4">
        <UserInfo post={post} />
        <section>
          <Link {...linkProps}>
            <Title text={post.title} hover className="mb-1.5" />
          </Link>
          <Content text={post.content} className="line-clamp-2" />
        </section>
        {src && (
          <Link {...linkProps}>
            <Image src={src} rounded className="aspect-thumb" />
          </Link>
        )}
        <StaticStat post={post} />
      </article>
      {/* 구분선 */}
      {!isLast && <div className="w-full h-1.5 bg-gray02/50" />}
    </>
  );
}
