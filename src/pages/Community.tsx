import React, { useCallback, useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import siteUrl from 'routes/siteUrl';
import {
  getCategories,
  getPostById,
  getPosts,
} from 'modules/community/community.thunk';
import { useAppDispatch } from 'modules/store';
import Loading from 'components/common/Loading';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectMorePage,
  selectPageNum,
} from 'modules/community/community.selector';

export default function Community() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { post_id } = useParams(); // 포스트 상세보기로 진입했을 때

  const rootMatch = useMatch(siteUrl.community.root);
  const listMatch = useMatch(siteUrl.community.list);
  const composeMatch = useMatch(siteUrl.community.post.new);

  const loading = useSelector(selectLoading);
  const morePage = useSelector(selectMorePage);
  const page = useSelector(selectPageNum);

  /*
   * location.key 는 라우트가 변경될 때마다 생성되는 고유한 식별 키 ex) { key } = useLocation()
   * 라우트가 변경될 때마다 fetch 하고 싶으면 useEffect 종속성 배열에 location.key 를 추가하면 됨
   * reference: https://stackoverflow.com/a/68848204/3730665
   * */

  const fetchByRoute = useCallback(() => {
    if (listMatch && page === 1) {
      dispatch(getPosts({ page })); // 첫번째 페이지 포스트 목록 GET
      dispatch(getCategories()); // 카테고리 목록 GET
    } else if (composeMatch) {
      dispatch(getCategories());
    } else if (post_id) {
      dispatch(getPostById({ id: Number(post_id) })); // 선택한 포스트 정보 GET
    }
  }, [dispatch, listMatch, composeMatch, post_id, page]);

  const fetchPostsByPage = useCallback(() => {
    if (page !== 1 && morePage) dispatch(getPosts({ page })); // 2번째 페이지~
  }, [dispatch, page, morePage]);

  useEffect(() => {
    fetchPostsByPage();
  }, [fetchPostsByPage]);

  useEffect(() => {
    fetchByRoute();
  }, [fetchByRoute]);

  useEffect(() => {
    if (rootMatch) navigate(siteUrl.community.list);
  }, [navigate, rootMatch]);

  return (
    // 아이폰12 Pro 기준 width
    <div className="max-w-[390px] my-0 mx-auto">
      <Loading loading={loading} delay={300} />
      <Outlet />
    </div>
  );
}
