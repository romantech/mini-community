import React from 'react';
import { useLocation } from 'react-router-dom';
import UserInfo from './UserInfo';

export default function Post({ post }: { post: Post }) {
  const { state } = useLocation();

  return (
    <div className="border p-6 flex flex-col gap-4">
      <UserInfo post={post} />
      <div>{post.title}</div>
    </div>
  );
}
