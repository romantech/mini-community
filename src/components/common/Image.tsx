import React from 'react';
import classnames from 'classnames';

interface ContentImageProps {
  src: string;
  className?: string;
  alt?: string;
  rounded?: boolean;
}

export default function Image({
  src,
  className,
  alt = 'post',
  rounded = false,
}: ContentImageProps) {
  const classes = classnames(`w-full h-full bg-gray-200`, className, {
    'rounded overflow-hidden': rounded,
  });

  return (
    <div className={classes}>
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
  );
}
