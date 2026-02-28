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

export const getProfileBgColor = (url: string) => {
  const colorKeys = Object.entries(bgColors) as Entries<typeof bgColors>;
  const matched = colorKeys.reduce((result, [name, color]) => {
    const regex = new RegExp(`${name}`, 'i');
    if (!result && url.match(regex)) return color;
    return result;
  }, '');
  return matched || getRandomColor();
};

export const getElapsedTime = (date?: TDateISO | null) => {
  const now = Date.now();
  const commentDate = date ? new Date(date).getTime() : NaN;

  // date가 없거나(undef/null) 파싱 불가하면 안전하게 0으로 처리
  if (!date || Number.isNaN(commentDate)) {
    return {
      elapsedMSec: 0,
      elapsedSec: 0,
      elapsedMin: 0,
      elapsedHour: 0,
    };
  }

  const elapsedMSec = now - commentDate;

  const elapsedSec = elapsedMSec / 1000; // "초" 단위 경과 시간
  const elapsedMin = elapsedMSec / 1000 / 60; // "분" 단위 경과 시간
  const elapsedHour = elapsedMSec / 1000 / 60 / 60; // "시간" 단위 경과 시간

  return { elapsedMSec, elapsedSec, elapsedMin, elapsedHour };
};

export const getRenderDate = (date?: TDateISO | null) => {
  if (!date) return ''; // 작성일이 없으면 빈 문자열(= UI에서 날짜 숨김)

  const { elapsedSec, elapsedMin, elapsedHour } = getElapsedTime(date);

  if (elapsedSec < 60) return KR_MOMENT_AGO;
  if (elapsedMin < 60) return `${Math.floor(elapsedMin)}${KR_MINUTE_AGO}`;
  if (elapsedHour < 24) return `${Math.floor(elapsedHour)}${KR_HOUR_AGO}`;

  return date.slice(2, 10); // YY-MM-DD
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
