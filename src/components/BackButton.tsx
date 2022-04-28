import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from 'assets/back.svg';

interface BackButtonProps {
  text?: string;
  to?: any;
}

export default function BackButton({ text, to = -1 }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className="flex hover:text-primary01"
      type="button"
      onClick={() => navigate(to)}
    >
      <BackIcon className="hover:fill-primary01 transition" />
      {text && (
        <span className="font-medium font-sm text-gray-400 ml-2 leading-[22px]">
          {text}
        </span>
      )}
    </button>
  );
}
