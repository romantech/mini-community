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
  }, [delay, loading]);

  return (
    <div
      className={
        delayLoading
          ? 'fixed inset-0 min-w-full min-h-full z-50 flex-center backdrop-blur-sm'
          : 'hidden'
      }
    >
      <Spinner />
    </div>
  );
}

export default Loading;
