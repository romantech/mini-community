import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  children?: React.ReactElement;
  text?: string;
  className?: string;
  width?: string;
  height?: string;
  shadow?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: VoidHandler;
}

export default function Button({
  children,
  text,
  className,
  width = '100px',
  height = '52px',
  shadow = false,
  rounded = false,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  const classes = classnames(
    'bg-primary01 text-white flex-center font-bold outline-none transition',
    {
      'rounded-lg': rounded,
      'shadow-2xl': shadow,
      'bg-gray-300': disabled,
      'hover:bg-opacity-90': !disabled,
    },
    className,
  );
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick()}
      className={classes}
      style={{ width, height }}
    >
      {children || text}
    </button>
  );
}
