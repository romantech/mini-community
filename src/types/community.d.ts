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
type CategoryPk = 0 | 1 | 2 | 3 | 4 | 5 | 999; // 0 전체, 999 인기글

interface Category {
  categoryPk: CategoryPk;
  categoryCode: CategoryCode;
  categoryName: CategoryName;
}

interface Post extends Omit<Category, 'categoryCode'> {
  pk: number;
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

interface NewPost {
  category: Category;
  title: string;
  content: string;
  images?: File[];
  writtenAt: string;
}
