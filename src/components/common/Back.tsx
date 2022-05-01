import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from 'assets/icons/back.svg';
import classnames from 'classnames';

interface BackButtonProps {
  text?: string;
  className?: string;
  confirmMsg?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: any;
}

export default function Back({
  text,
  className,
  confirmMsg,
  to = -1,
}: BackButtonProps) {
  const navigate = useNavigate();
  const classes = classnames(
    'flex text-gray-400 hover:text-primary01 hover:fill-primary01 transition',
    className,
  );

  const clickHandler = () => {
    let res = true;
    // eslint-disable-next-line no-alert
    if (confirmMsg) res = window.confirm(confirmMsg);
    if (res) navigate(to);
  };

  return (
    <button className={classes} type="button" onClick={clickHandler}>
      <BackIcon />
      {text && (
        <span className="font-medium font-sm ml-2 leading-[22px]">{text}</span>
      )}
    </button>
  );
}
