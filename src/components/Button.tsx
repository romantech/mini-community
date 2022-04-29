import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: VoidHandler;
  width?: string;
  height?: string;
  shadow?: boolean;
  rounded?: boolean;
}

export default function Button({
  text = '확인',
  className,
  onClick = () => {},
  width = '100px',
  height = '52px',
  shadow = true,
  rounded = true,
}: ButtonProps) {
  const classes = classnames(
    'bg-primary01 hover:bg-primary01-hover text-white flex-center font-bold outline-none transition',
    className,
    { 'rounded-lg': rounded },
    { 'shadow-2xl': shadow },
  );
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className={classes}
      style={{ width, height }}
    >
      {text}
    </button>
  );
}
