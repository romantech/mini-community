import React from 'react';
import { KR_COMPLETE, KR_NEWPOST } from 'lib/constants';
import BackButton from 'components/BackButton';
import Button from 'components/Button';

export default function Compose() {
  const completeHandler = () => {};

  return (
    <div className="flex flex-col border-b">
      <header className="h-14 flex justify-between items-center text-sm p-2">
        <BackButton className="p-4" />
        <h2 className="font-bold">{KR_NEWPOST}</h2>
        <Button
          text={KR_COMPLETE}
          width="64px"
          height="36px"
          onClick={completeHandler}
        />
      </header>
    </div>
  );
}
