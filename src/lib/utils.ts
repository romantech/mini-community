import {
  bgColors,
  KR_HOUR_AGO,
  KR_MINUTE_AGO,
  KR_MOMENT_AGO,
} from './constants';

export const getRandomKey = (id?: string | number) => {
  const randomNum = Math.random().toString(36).slice(2);
  return id ? `${id}-${randomNum}` : randomNum;
};

export const getRandomColor = () => {
  const colors = Object.values(bgColors);
  const randomNum = Math.floor(Math.random() * colors.length); // length "미만" 랜덤 숫자
  return colors[randomNum];
};

export const getProfileColor = (url: string) => {
  const colorKeys = Object.entries(bgColors) as Entries<typeof bgColors>;
  const matched = colorKeys.reduce((result, [name, color]) => {
    const regex = new RegExp(`${name}`, 'i');
    if (!result && url.match(regex)) return color;
    return result;
  }, '');
  return matched || getRandomColor();
};

export const getFormatDate = (date: string) => {
  const [yyyy, mm, dd] = date.split('T')[0].split('-');
  return `${yyyy.slice(0, 2)}-${mm}-${dd}`;
};

export const getElapsedTime = (date: string) => {
  const now = new Date().getTime();
  const commentDate = new Date(date).getTime();
  const elapsedMSec = now - commentDate;

  const elapsedSec = elapsedMSec / 1000; // "초" 단위 경과 시간
  const elapsedMin = elapsedMSec / 1000 / 60; // "분" 단위 경과 시간
  const elapsedHour = elapsedMSec / 1000 / 60 / 60; // "시간" 단위 경과 시간

  return { elapsedMSec, elapsedSec, elapsedMin, elapsedHour };
};

export const getRenderDate = (date: string) => {
  const { elapsedSec, elapsedMin, elapsedHour } = getElapsedTime(date);

  if (elapsedSec < 60) return KR_MOMENT_AGO;
  if (elapsedMin < 60) return `${Math.floor(elapsedMin)}${KR_MINUTE_AGO}`;
  if (elapsedHour < 24) return `${Math.floor(elapsedHour)}${KR_HOUR_AGO}`;

  return getFormatDate(date);
};

type OrderPostLatest = (...args: Post[]) => number;
export const orderByLatest: OrderPostLatest = (
  { writtenAt: a },
  { writtenAt: b },
) => {
  // (TS2362) the left-hand side of an arithmetic operation... 에러 때문에
  // getTime() 메서드를 이용해 숫자로 바꾼 후 연산하도록 함(getDate, getTime 등 모두 가능)
  // 참고로 if (a > b) -1 이런식으로 작성하면 에러 안남(간결하게 쓰기 위해 위 방법 사용함)
  return new Date(b).getTime() - new Date(a).getTime();
};
