import React from 'react';
import { getRandomKey } from 'lib/utils';

export default function LinkifyText({ text }: { text?: string | null }) {
  const regex = /(https?:\/\/\S+)/g; // http 및 https 만 구분 가능
  if (!text) return null;

  return (
    <>
      {text.split(regex).map((part, index) =>
        index % 2 === 0 ? (
          part
        ) : (
          <a
            key={getRandomKey(index)}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            {part}
          </a>
        ),
      )}
    </>
  );
}
