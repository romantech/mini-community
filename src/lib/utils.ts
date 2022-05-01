import {
  bgColors,
  KR_HOUR_AGO,
  KR_MINUTE_AGO,
  KR_MOMENT_AGO,
} from './constants';

export const getRandomKey = (id?: string | number) => {
  const randomNum = Math.random().toString(36).slice(2, 12);
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
    if (!result && url?.includes(name.toLowerCase())) return color;
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

  if (elapsedSec <= 59) return KR_MOMENT_AGO;
  if (elapsedMin <= 59) return `${Math.floor(elapsedMin)}${KR_MINUTE_AGO}`;
  if (elapsedHour <= 23) return `${Math.floor(elapsedHour)}${KR_HOUR_AGO}`;

  return getFormatDate(date);
};
