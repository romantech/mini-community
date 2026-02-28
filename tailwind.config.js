import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    screens: {
      // @media (max-width: 639px) { ... }
      // Max-width breakpoints 참고 : https://tailwindcss.com/docs/screens#max-width-breakpoints
      mobile: { max: '639px' },
    },
    colors: {
      gray00: '#F8F8F8',
      gray02: '#E8E8E8',
      gray04: '#B4B4B4',
      gray05: '#7A7A7A',
      black: '#222222',
      primary01: '#2C7FFF',
      primary02: '#DBE9FF',
      'primary01-hover': '#418bff',
    },
    fontFamily: {
      // 기본 테마의 fontFamily.sans 속성 변경(regular 굵기). font-sans 클래스로 사용
      sans: ['Noto Sans KR', ...fontFamily.sans],
      // fontFamily.heading 속성 추가(bold 굵기). font-heading 클래스로 사용
      // Noto Sans 는 Bold 서체에 대한 font-family 이름이 없으므로 주석 처리(font-weight 로 조절)
      // heading: ['Noto Sans KR', ...fontFamily.sans],
    },
    aspectRatio: {
      thumb: '77 / 40',
      content: '5 / 4',
    },
  },
};
