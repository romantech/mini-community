import React from 'react';
import classnames from 'classnames';

interface TitleProps {
  text: string;
  hover?: boolean;
  classNames?: string;
  truncate?: boolean;
}

export default function Title({
  text,
  classNames,
  hover = false,
  truncate = true,
}: TitleProps) {
  const classes = classnames('font-bold text-black', classNames, {
    truncate: truncate === true,
    'hover:text-gray-500': hover,
  });

  return <h2 className={classes}>{text}</h2>;
}
