import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: VoidHandler;
  disable?: boolean;
  width?: string;
  height?: string;
  shadow?: boolean;
  rounded?: boolean;
}

export default function Button({
  text = '확인',
  className,
  onClick = () => {},
  disable = false,
  width = '100px',
  height = '52px',
  shadow = true,
  rounded = true,
}: ButtonProps) {
  const classes = classnames(
    'bg-primary01 text-white flex-center font-bold outline-none transition',
    className,
    { 'rounded-lg': rounded },
    { 'shadow-2xl': shadow },
    { 'bg-gray-300': disable },
    { 'hover:bg-primary01-hover': !disable },
  );
  return (
    <button
      onClick={() => onClick()}
      type="button"
      disabled={disable}
      className={classes}
      style={{ width, height }}
    >
      {text}
    </button>
  );
}
