import React from 'react';
import { ReactComponent as EyeIcon } from 'assets/eye.svg';
import { ReactComponent as ThumbIcon } from 'assets/thumb.svg';
import { ReactComponent as TalkIcon } from 'assets/talk.svg';

interface StatProps {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export default function Stat({
  viewCount,
  likeCount,
  commentCount,
}: StatProps) {
  const renderList = [
    { icon: <EyeIcon />, count: viewCount, type: 'view' },
    { icon: <ThumbIcon />, count: likeCount, type: 'like' },
    { icon: <TalkIcon />, count: commentCount, type: 'comment' },
  ];

  return (
    <section className="flex gap-3.5">
      {renderList.map(({ type, count, icon }) => (
        <div key={type} className="flex items-center gap-1 fill-gray04">
          {icon}
          <span className="text-gray05 text-xs font-medium">{count}</span>
        </div>
      ))}
    </section>
  );
}
