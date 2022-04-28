import React from 'react';
import { getRandomColor, getRenderDate } from 'lib/utils';
import { MIDDLE_DOT } from 'lib/constants';

interface PostInfoProps {
  post: Post | PostDetail;
}

export default function UserInfo({ post }: PostInfoProps) {
  const { writerNickName, writerProfileUrl, writtenAt, categoryName } = post;
  const formatDate = getRenderDate(writtenAt);
  const profileBgColor = getRandomColor();

  return (
    <section className="flex gap-2">
      <div
        className="w-8 h-8 rounded-full grid place-content-center"
        style={{ backgroundColor: profileBgColor }}
      >
        <img className="w-6" src={writerProfileUrl} alt="user profile" />
      </div>
      <div className="text-xs">
        <div className="font-bold mb-0.5 text-black">{writerNickName}</div>
        <div className="text-gray04 font-medium">
          <span>{categoryName}</span>
          <span className="font-black mx-1">{MIDDLE_DOT}</span>
          <span>{formatDate}</span>
        </div>
      </div>
    </section>
  );
}
