import React from 'react';
import classnames from 'classnames';

interface ContentImageProps {
  url: string;
  classNames?: string;
  aspectRatio?: AspectRatio;
  rounded?: boolean;
}

export default function Image({
  url,
  classNames,
  aspectRatio = 'thumb',
  rounded = false,
}: ContentImageProps) {
  return (
    <div
      className={classnames('w-full bg-gray-200', classNames, {
        'rounded overflow-hidden': rounded,
        [`aspect-${aspectRatio}`]: true,
      })}
    >
      <img className="w-full h-full object-cover" src={url} alt="post" />
    </div>
  );
}
