export const getRandomColor = () => {
  const colors = ['#FFD784', '#FFC7CC', '#B2E9E3'] as const;
  const randomNum = Math.floor(Math.random() * 3);
  return colors[randomNum];
};

export const getFormatDate = (date: string) => {
  const [yyyy, mm, dd] = date.split('T')[0].split('-');
  return `${yyyy.slice(0, 2)}-${mm}-${dd}`;
};

export const getElapsedTime = (date: string) => {
  const now = new Date().getTime();
  const commentDate = new Date(date).getTime();
  const elapsedMSec = now - commentDate;

  // "초" 단위 경과 시간
  const elapsedSec = elapsedMSec / 1000;
  // "분" 단위 경과 시간
  const elapsedMin = elapsedMSec / 1000 / 60;
  // "시간" 단위 경과 시간
  const elapsedHour = elapsedMSec / 1000 / 60 / 60;

  return {
    elapsedMSec,
    elapsedSec,
    elapsedMin,
    elapsedHour,
  };
};

export const getRenderDate = (date: string) => {
  const { elapsedSec, elapsedMin, elapsedHour } = getElapsedTime(date);

  if (elapsedSec <= 59) {
    return '방금 전';
  }
  if (elapsedMin <= 59) {
    return `${Math.floor(elapsedMin)}분전 게시`;
  }
  if (elapsedHour <= 23) {
    return `${Math.floor(elapsedHour)}시간전 게시`;
  }

  return getFormatDate(date);
};
