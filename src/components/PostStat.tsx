import React from 'react';
import { getStatIconSrc } from '../lib/utils';

interface PostStatProps {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export default function PostStat({
  viewCount,
  likeCount,
  commentCount,
}: PostStatProps) {
  const renderList = [
    { src: getStatIconSrc('view'), count: viewCount },
    {
      src: getStatIconSrc('like'),
      count: likeCount,
    },
    {
      src: getStatIconSrc('comment'),
      count: commentCount,
    },
  ];

  return (
    <section className="flex gap-3.5 text-gray05 text-xs font-medium">
      {renderList.map(({ src, count }) => (
        <div key={src} className="flex gap-1">
          <img className="w-4 inline-block" src={src} alt="post count" />
          <span>{count}</span>
        </div>
      ))}
    </section>
  );
}
