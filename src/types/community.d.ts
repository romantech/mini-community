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
type CategoryId = 0 | 1 | 2 | 3 | 4 | 5 | 999; // 0 전체, 999 인기글

interface Category {
  categoryId: CategoryId;
  categoryCode: CategoryCode;
  categoryName: CategoryName;
}

interface Post extends Omit<Category, 'categoryCode'> {
  id: number; // JSON Server 에서 post/1 형태로 검색할 때 id 필드가 있어야 하므로 pk -> id 로 변경
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

interface NewPost {
  category: Category;
  title: string;
  content: string;
  images?: File[];
  writtenAt: string;
}
