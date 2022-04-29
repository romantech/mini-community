import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from 'assets/back.svg';
import classnames from 'classnames';

interface BackButtonProps {
  text?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: any;
}

export default function BackButton({
  text,
  className,
  to = -1,
}: BackButtonProps) {
  const navigate = useNavigate();
  const classes = classnames('flex hover:text-primary01', className);

  return (
    <button className={classes} type="button" onClick={() => navigate(to)}>
      <BackIcon className="hover:fill-primary01 transition" />
      {text && (
        <span className="font-medium font-sm text-gray-400 ml-2 leading-[22px]">
          {text}
        </span>
      )}
    </button>
  );
}
