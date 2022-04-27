import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  text?: string;
  to?: any;
}

export default function BackButton({ text, to = -1 }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button className="flex" type="button" onClick={() => navigate(to)}>
      <img className="w-6" src="/assets/back.svg" alt="back" />
      {text && (
        <span className="font-medium font-sm text-gray-400 ml-3">{text}</span>
      )}
    </button>
  );
}
