import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

interface LoadingProps {
  loading: boolean;
  delay: number;
}

function Loading({ loading, delay = 0 }: LoadingProps) {
  const [delayLoading, setDelayLoading] = useState(loading);

  useEffect(() => {
    // 로딩 깜박임 방지를 위해 delay 이후에만 로딩 화면 표시
    const timer = setTimeout(() => setDelayLoading(loading), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div
      className={
        delayLoading
          ? 'fixed inset-0 w-full h-full bg-black/20 z-50 flex-center'
          : 'hidden'
      }
    >
      <Spinner />
    </div>
  );
}

export default Loading;
