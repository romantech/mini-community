import React from 'react';
import { getProfileBgColor, getRenderDate } from 'lib/utils';
import { MIDDLE_DOT } from 'lib/constants';
import classnames from 'classnames';

interface UserInfoProps {
  post: Post;
  className?: string;
}

export default function UserInfo({ post, className }: UserInfoProps) {
  const { writerNickName, writerProfileUrl, writtenAt, categoryName } = post;
  const formatDate = getRenderDate(writtenAt);
  const profileBgColor = getProfileBgColor(post.writerProfileUrl || 'fox');

  return (
    <section className={classnames('flex gap-2', className)}>
      <div
        className="w-8 h-8 rounded-full grid place-content-center"
        style={{ backgroundColor: profileBgColor }}
      >
        <img
          className="w-6"
          src={writerProfileUrl || '/images/profile/cow.png'}
          alt="user profile"
        />
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
