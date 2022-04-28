import React from 'react';
import classnames from 'classnames';

interface ContentImageProps {
  url: string;
  classNames?: string;
  ratio?: 'content' | 'thumb';
  rounded?: boolean;
}

export default function Image({
  url,
  classNames,
  ratio = 'thumb',
  rounded = false,
}: ContentImageProps) {
  return (
    <div
      className={classnames(`w-full bg-gray-200 ${classNames}`, {
        'rounded overflow-hidden': rounded,
        [`aspect-${ratio}`]: true,
      })}
    >
      <img className="w-full h-full object-cover" src={url} alt="post" />
    </div>
  );
}
