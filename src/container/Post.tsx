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
  const linkProps = { to: `../post/${post.pk}`, onClick: clickHandler };

  return (
    <>
      <article className="p-6 flex flex-col gap-4">
        {/* 유저 정보 */}
        <UserInfo post={post} />
        <section>
          <Link {...linkProps}>
            <Title text={post.title} hover classProps="mb-1.5" />
          </Link>
          <Content text={post.content} line={2} />
        </section>
        {/* 이미지 */}
        {post.imageUrl && (
          <Link {...linkProps}>
            <Image url={post.imageUrl} rounded />
          </Link>
        )}
        {/* 읽기전용 소셜 데이터 */}
        <Stat
          viewCount={post.viewCount}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
        />
      </article>
      {/* 구분선 */}
      {!isLast && <div className="w-full h-1.5 bg-gray02" />}
    </>
  );
}
