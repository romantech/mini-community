type CategoryCode =
  | 'ALL'
  | 'POPULAR'
  | 'PETITION'
  | 'FREE'
  | 'QNA'
  | 'NEWS'
  | 'TIP';
type CategoryName =
  | '전체'
  | '⭐ 인기글'
  | '대선청원'
  | '자유글'
  | '질문/답변'
  | '뉴스'
  | '노하우';
type CategoryId = 1 | 2 | 3 | 4 | 5 | 888 | 999; // 888 전체, 999 인기글

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
  imageUrl: string | null;
  writtenAt: string;
  writerNickName: string;
  writerProfileUrl: string;
}

interface PostDetail extends Post {
  imageUrl: Array<string>;
}

interface NewPost extends Category {
  title: string;
  content: string;
  writtenAt: string; // 작성 완료 버튼을 누르는 시점
  images?: File[];
}
