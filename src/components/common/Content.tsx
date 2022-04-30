import React from 'react';
import classnames from 'classnames';
import LinkifyText from './LinkifyText';

interface ContentProps {
  text: string;
  className?: string;
  size?: string;
  linkify?: boolean;
}

export default function Content({
  text,
  className,
  size = '14px',
  linkify = false,
}: ContentProps) {
  const classes = classnames(`text-gray05 whitespace-pre-line`, className);

  return (
    <p className={classes} style={{ fontSize: size }}>
      {linkify ? <LinkifyText text={text} /> : text}
    </p>
  );
}
