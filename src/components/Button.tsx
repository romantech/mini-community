import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: VoidHandler;
  disabled?: boolean;
  width?: string;
  height?: string;
  shadow?: boolean;
  rounded?: boolean;
}

export default function Button({
  text = '확인',
  className,
  onClick = () => {},
  disabled = false,
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
    { 'bg-gray-300': disabled },
    { 'hover:bg-primary01-hover': !disabled },
  );
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick()}
      className={classes}
      style={{ width, height }}
    >
      {text}
    </button>
  );
}
