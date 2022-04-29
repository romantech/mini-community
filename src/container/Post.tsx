/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'modules/store';
import { setLastPosition } from 'modules/community/communitySlice';
import Stat from 'components/Stat';
import Image from 'components/Image';
import Title from 'components/Title';
import Content from 'components/Content';
import UserInfo from 'components/UserInfo';

interface PostProps {
  post: Post;
  isLast: boolean;
}

export default function Post({ post, isLast }: PostProps) {
  const dispatch = useAppDispatch();
  const clickHandler = () => dispatch(setLastPosition(window.scrollY));
  const linkProps = { to: `../post/${post.id}`, onClick: clickHandler };

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
        {post.imageUrl && (
          <Link {...linkProps}>
            <Image src={post.imageUrl} rounded className="aspect-thumb" />
          </Link>
        )}
        <Stat post={post} />
      </article>
      {/* 구분선 */}
      {!isLast && <div className="w-full h-1.5 bg-gray02" />}
    </>
  );
}
