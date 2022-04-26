// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray02: '#E8E8E8',
        gray05: '#7A7A7A',
        primary01: '#2C7FFF',
      },
      fontFamily: {
        // 기본 테마의 fontFamily.sans 속성 변경(regular 굵기). font-sans 클래스로 사용
        sans: ['Noto Sans KR', ...fontFamily.sans],
        // fontFamily.heading 속성 추가(bold 굵기). font-heading 클래스로 사용
        heading: ['Noto Sans KR', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
