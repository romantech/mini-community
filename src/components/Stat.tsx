import React from 'react';
import { ReactComponent as EyeIcon } from 'assets/eye.svg';
import { ReactComponent as ThumbIcon } from 'assets/thumb-filled.svg';
import { ReactComponent as TalkIcon } from 'assets/talk-filled.svg';

interface StatProps {
  post: Post;
}

export default function Stat({ post }: StatProps) {
  const renderList = [
    { icon: <EyeIcon />, count: post.viewCount, type: 'view' },
    { icon: <ThumbIcon />, count: post.likeCount, type: 'like' },
    { icon: <TalkIcon />, count: post.commentCount, type: 'comment' },
  ];

  return (
    <section className="flex gap-3.5">
      {renderList.map(({ type, count, icon }) => (
        <div key={type} className="flex items-center gap-1 fill-gray04">
          <div>{icon}</div>
          <span className="text-gray05 text-xs font-medium">{count}</span>
        </div>
      ))}
    </section>
  );
}
