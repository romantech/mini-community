/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'modules/store';
import { setLastPosition } from 'modules/community/communitySlice';
import UserInfo from './UserInfo';
import Stat from './Stat';
import Image from './Image';

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
      <div className="p-6 flex flex-col gap-4">
        {/* 유저 정보 */}
        <UserInfo post={post} />

        {/* 제목 */}
        <Link {...linkProps}>
          <h2 className="font-bold truncate text-black hover:text-gray-500">
            {post.title}
          </h2>
        </Link>

        {/* 본문 */}
        <p className="text-gray05 text-sm line-clamp-2 -mt-3">{post.content}</p>

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
      </div>

      {/* 구분선 */}
      {!isLast && <div className="w-full h-1.5 bg-gray02" />}
    </>
  );
}
