import React from 'react';
import classnames from 'classnames';
import LinkifyText from './LinkifyText';

interface ContentProps {
  text: string;
  line?: number;
  classProps?: string;
  size?: string;
  linkify?: boolean;
}

export default function Content({
  text,
  line,
  classProps,
  size = '14px',
  linkify = false,
}: ContentProps) {
  const classes = classnames('text-gray05', classProps, {
    [`line-clamp-${line}`]: line,
  });
  return (
    <p className={classes} style={{ fontSize: size }}>
      {linkify ? <LinkifyText text={text} /> : text}
    </p>
  );
}
