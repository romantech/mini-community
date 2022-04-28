import React from 'react';
import { Link } from 'react-router-dom';
import { getRandomKey } from 'lib/utils';

export default function LinkifyText({ text }: { text: string }) {
  const regex = /(https?:\/\/\S+)/g; // http 및 https 만 구분 가능

  return (
    <>
      {text.split(regex).map((part, index) =>
        index % 2 === 0 ? (
          part
        ) : (
          <Link
            key={getRandomKey()}
            to={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            {part}
          </Link>
        ),
      )}
    </>
  );
}
