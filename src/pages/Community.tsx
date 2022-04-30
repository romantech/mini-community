/* eslint-disable @typescript-eslint/naming-convention,react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import siteUrl from 'routes/url';
import {
  getCategories,
  getPosts,
  getPostsById,
} from 'modules/community/communityThunk';
import { useAppDispatch } from 'modules/store';
import Loading from 'components/common/Loading';
import { useSelector } from 'react-redux';
import { selectLoading } from 'modules/community/communitySelector';

export default function Community() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { key } = useLocation(); // location.key : 라우트가 변경될 때마다 생성되는 고유한 식별 키

  const rootMatch = useMatch(siteUrl.community.root);
  const { post_id } = useParams(); // 포스트 상세보기로 진입했을 때

  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!post_id) {
      dispatch(getPosts()); // 전체 포스트 목록 GET
      dispatch(getCategories()); // 카테고리 목록 GET
    } else {
      dispatch(getPostsById({ id: Number(post_id) })); // 선택한 포스트 정보 GET
    }
  }, [post_id, key]); // location.key 추가해서 라우트 변경시마다 fetch

  useEffect(() => {
    if (rootMatch) navigate(siteUrl.community.list);
  }, [rootMatch]);

  return (
    // 아이폰12 Pro 기준 width
    <div className="max-w-[390px] my-0 mx-auto">
      <Loading loading={loading} delay={100} />
      <Outlet />
    </div>
  );
}
