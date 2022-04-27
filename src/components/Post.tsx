import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'modules/store';
import { setLastPosition } from 'modules/community/communitySlice';
import UserInfo from './UserInfo';

export default function Post({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  return (
    <div className="border p-6 flex flex-col gap-4">
      <UserInfo post={post} />
      <Link
        to={`../post/${post.pk}`}
        onClick={() => dispatch(setLastPosition(window.scrollY))}
      >
        <h2>{post.title}</h2>
      </Link>
    </div>
  );
}
