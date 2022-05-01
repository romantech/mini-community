import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from 'assets/404.png';
import { KR_MOVE_PAGE_AFTER_SEC, KR_NOT_FOUND } from 'lib/constants';
import Image from 'components/common/Image';
import classnames from 'classnames';
import siteUrl from '../../routes/siteUrl';

interface NotFoundProps {
  backSec?: number;
  className?: string;
}

export default function NotFound({ className, backSec = 5 }: NotFoundProps) {
  const [seconds, setSeconds] = useState(backSec);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setSeconds(sec => sec - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) navigate(siteUrl.community.list);
  }, [navigate, seconds]);

  const classes = classnames(
    'max-w-[390px] min-h-screen mx-auto flex-col-gap2 items-center justify-center p-5 font-bold text-center text-xl text-gray-600',
    className,
  );

  return (
    <div className={classes}>
      <Image
        src={NotFoundImg}
        alt="Not found page"
        className="bg-transparent w-[300px] h-[300px]"
      />
      <section>
        <p>{KR_NOT_FOUND}</p>
        <p>{`${seconds}${KR_MOVE_PAGE_AFTER_SEC}`}</p>
      </section>
    </div>
  );
}
