export const KR_COMMUNITY = '커뮤니티';
export const KR_NEWPOST_EMJ = '글쓰기 ✍️';
export const KR_NEWPOST = '글쓰기';
export const KR_COMPLETE = '완료';
export const KR_BACK_TO_LIST = '글 목록으로';
export const KR_TITLE_HOLDER = '제목을 작성해주세요';
export const MIDDLE_DOT = '·';

export type ColorKey = keyof typeof colorsByFileName;
export type ColorValue = ValueOf<typeof colorsByFileName>;
export type ColorEntries = Array<[ColorKey, ColorValue]>;
// noinspection SpellCheckingInspection
export const colorsByFileName = {
  fox: '#FFC7CC',
  chick: '#FFD784',
  ailien: '#B2E9E3',
  purple: '#E1BCEA',
} as const;
