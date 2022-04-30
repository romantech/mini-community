import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from 'assets/404.png';
import { KR_MOVE_PAGE_AFTER_SEC, KR_NOT_FOUND } from 'lib/constants';
import siteUrl from 'routes/url';

export default function NotFound({ backSec = 5 }: { backSec?: number }) {
  const [seconds, setSeconds] = useState(backSec);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setSeconds(sec => sec - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) navigate(siteUrl.community.list);
  }, [navigate, seconds]);

  return (
    <div className="max-w-[390px] mx-auto flex flex-col-gap2 flex-center mt-20 p-5 font-bold text-xl">
      <img src={NotFoundImg} alt="Not found page" className="max-w-full" />
      <p>{KR_NOT_FOUND}</p>
      <p>{`${seconds}${KR_MOVE_PAGE_AFTER_SEC}`}</p>
    </div>
  );
}
