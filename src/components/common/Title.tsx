import React from 'react';
import classnames from 'classnames';

interface TitleProps {
  text: string;
  size?: string;
  hover?: boolean;
  className?: string;
  truncate?: boolean; // 1줄만 표시되도록
}

export default function Title({
  text,
  className,
  size = '1rem',
  hover = false,
  truncate = true,
}: TitleProps) {
  const classes = classnames('font-bold text-black', className, {
    truncate,
    'hover:text-gray-500 transition duration-300': hover,
  });

  return (
    <h2 className={classes} style={{ fontSize: size }}>
      {text}
    </h2>
  );
}
