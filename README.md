# 모바일 미니 커뮤니티

![screenshot](https://user-images.githubusercontent.com/8604840/167301166-d16351bb-b6fa-492f-a1c5-c53f1f8927fa.png)
> _글 조회/작성, 조회수 카운트, 좋아요 인터렉션을 할 수 있는 모바일 미니 커뮤니티입니다_
- Live Demo : https://mini-community.vercel.app/
- 작업 기간 : 5일 (리팩토링 / 배포 작업 기간 제외)

## 사용 스택

- React(CRA) + Typescript
- Redux Toolkit(RTK)
- Tailwind CSS + Classnames
- JSON Server
- ESLint + Airbnb Rules

## 구현 기능

- 글쓰기 (이미지 업로드 가능)
- 좋아요 인터렉션 및 조회수 카운트/표시
- 글 목록 무한 스크롤
- Linkify (자동 링크 적용)
- 마지막 스크롤 위치 기억
- 등...

## 프로젝트 목적

- Redux Toolkit(RTK) 실습 및 활용 : 글/카테고리 목록 조회(API 요청) 등 주요 로직 모두 리덕스 slice에서 관리
