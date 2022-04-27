/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'modules/store';
import { setLastPosition } from 'modules/community/communitySlice';
import UserInfo from './UserInfo';
import PostStat from './PostStat';

export default function Post({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  const clickHandler = () => dispatch(setLastPosition(window.scrollY));
  const linkProps = { to: `../post/${post.pk}`, onClick: clickHandler };

  return (
    <div className="border p-6 flex flex-col gap-4">
      <UserInfo post={post} />
      <Link {...linkProps}>
        <h2 className="font-bold truncate text-black hover:text-gray-500">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray05 text-sm line-clamp-2 -mt-3">{post.content}</p>
      {post.imageUrl && (
        <Link {...linkProps}>
          <div className="h-[160px] rounded overflow-hidden bg-gray-200">
            <img
              className="w-full max-h-full object-cover"
              src={post.imageUrl}
              alt="thumbnail"
            />
          </div>
        </Link>
      )}
      <PostStat
        viewCount={post.viewCount}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
      />
    </div>
  );
}
