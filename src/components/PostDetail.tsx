import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectPost } from 'modules/community/communitySelector';

export default function PostDetail() {
  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);

  return <div>포스트 상세</div>;
}
