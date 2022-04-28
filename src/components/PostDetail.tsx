import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectPost } from 'modules/community/communitySelector';
import { getRandomKey } from 'lib/utils';
import UserInfo from './UserInfo';
import BackButton from './BackButton';
import siteUrl from '../routes/url';
import LinkifyText from './LinkifyText';

export default function PostDetail() {
  const post = useSelector(selectPost);
  const loading = useSelector(selectLoading);

  return (
    <div>
      <header className="h-14 flex items-center p-6">
        <BackButton text="글 목록으로" to={siteUrl.community.list} />
      </header>
      {post && (
        <div className="flex flex-col gap-2">
          <section className="flex flex-col gap-3 px-6 py-2">
            <UserInfo post={post} />
            <h2 className="font-bold text-black mt-1">{post.title}</h2>
            <p className="text-gray05 text-sm whitespace-pre-line">
              <LinkifyText text={post.content} />
            </p>
          </section>
          {Array.isArray(post.imageUrl) && (
            <section className="flex flex-col gap-2">
              {post.imageUrl.map(url => (
                <div
                  className="w-full aspect-[5/4] bg-gray-200"
                  key={getRandomKey()}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={url}
                    alt="thumbnail"
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
