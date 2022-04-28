import React from 'react';
import classnames from 'classnames';

interface ContentImageProps {
  url: string;
  className?: string;
  aspectRatio?: AspectRatio;
  rounded?: boolean;
}

export default function Image({
  url,
  className,
  aspectRatio = 'thumb',
  rounded = false,
}: ContentImageProps) {
  return (
    <div
      className={classnames('w-full bg-gray-200', className, {
        'rounded overflow-hidden': rounded,
        [`aspect-${aspectRatio}`]: true,
      })}
    >
      <img className="w-full h-full object-cover" src={url} alt="post" />
    </div>
  );
}
