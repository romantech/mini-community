export const MIDDLE_DOT = '·';

export const KR_CONFIRM_LEAVE_MSG = '⚠️ 글쓰기를 취소하시겠습니까?';
export const KR_CONFIRM_DELETE = '삭제하시겠습니까?';
export const KR_COMPLETE_COMPOSE = '글쓰기를 완료했습니다';

export const KR_COMMUNITY = '커뮤니티';
export const KR_NEWPOST_EMJ = '글쓰기 ✍️';
export const KR_NEWPOST = '글쓰기';
export const KR_COMPLETE = '완료';
export const KR_BACK_TO_LIST = '글 목록으로';
export const KR_TITLE_HOLDER = '제목을 작성해주세요';
export const KR_CONTENT_HOLDER =
  '내용을 작성해주세요.\n\n◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!\n◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.\n◎ 광고글 금지. 서비스 이용이 제한됩니다.';

export const KR_RETRY_LATER = '잠시 후 다시 시도해주세요';
export const KR_NOT_FOUND = '페이지를 찾을 수 없어요';
export const KR_MOVE_PAGE_AFTER_SEC = '초 후 리스트로 이동합니다';
export const KR_MAX_FILE_ALERT = (max: number) =>
  `최대 ${max}개만 첨부할 수 있습니다`;
export const KR_MAX_MB_SIZE_ALERT = (max: number) =>
  `파일당 최대 ${max}MB 까지만 업로드할 수 있습니다`;

export const KR_MOMENT_AGO = '방금 전';
export const KR_MINUTE_AGO = '분 전';
export const KR_HOUR_AGO = '시간 전';

export const KR_FILE_TYPE_IMG = '사진';

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
