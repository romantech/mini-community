type CategoryId = 888 | 999 | 1 | 2 | 3 | 4 | 5; // 888 전체, 999 인기글
type CategoryCode =
  | 'ALL'
  | 'POPULAR'
  | 'TECH'
  | 'FREE'
  | 'QNA'
  | 'NEWS'
  | 'TIP';
type CategoryName =
  | '전체'
  | '⭐ 인기글'
  | '테크'
  | '자유글'
  | '질문/답변'
  | '뉴스'
  | '노하우';

interface Category {
  categoryId: CategoryId; // categoryPk -> categoryId 로 변경
  categoryCode: CategoryCode;
  categoryName: CategoryName;
}

interface Post extends Omit<Category, 'categoryCode'> {
  id: number; // JSON Server 에서 post/1 형태로 조회할 때 id 필드 필요해서 pk -> id 로 변경
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  imageUrl: string | string[] | null;
  writtenAt: TDateISO;
  writerNickName: string;
  writerProfileUrl: string | null;
}

interface NewPost extends Post {
  // writtenAt 속성은 완료 버튼 누르는 시점
  imageUrl: string[] | null;
  writtenAt: TDateISO | null;
}

type Draft = Partial<NewPost>;
