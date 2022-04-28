import React from 'react';
import classnames from 'classnames';

interface ContentImageProps {
  url: string;
  className?: string;
  rounded?: boolean;
}

export default function Image({
  url,
  className,
  rounded = false,
}: ContentImageProps) {
  const classes = classnames(`w-full bg-gray-200`, className, {
    'rounded overflow-hidden': rounded,
  });

  return (
    <div className={classes}>
      <img className="w-full h-full object-cover" src={url} alt="post" />
    </div>
  );
}
