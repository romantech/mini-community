import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectPost } from 'modules/community/communitySelector';
import UserInfo from './UserInfo';
import BackButton from './BackButton';
import siteUrl from '../routes/url';

export default function PostDetail() {
  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);

  return (
    <div>
      <header className="h-14 flex items-center">
        <BackButton text="글 목록으로" to={siteUrl.community.list} />
      </header>
      {post && (
        <section className="p-6">
          <UserInfo post={post} />
        </section>
      )}
    </div>
  );
}
