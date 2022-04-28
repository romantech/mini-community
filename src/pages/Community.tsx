/* eslint-disable @typescript-eslint/naming-convention,react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import siteUrl from 'routes/url';
import {
  getCategories,
  getPosts,
  getPostsById,
} from 'modules/community/communityThunk';
import { useAppDispatch } from 'modules/store';

export default function Community() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rootMatch = useMatch(siteUrl.community.root);
  const { post_id } = useParams(); // 포스트 상세보기로 진입했을 때

  useEffect(() => {
    if (!post_id) {
      dispatch(getPosts()); // 전체 포스트 목록 GET
      dispatch(getCategories()); // 카테고리 목록 GET
    } else {
      dispatch(getPostsById({ id: Number(post_id) })); // 선택한 포스트 정보 GET
    }
  }, [post_id]);

  useEffect(() => {
    if (rootMatch) navigate(siteUrl.community.list);
  }, [rootMatch]);

  return (
    <div className="max-w-[390px] my-0 mx-auto">
      <Outlet />
    </div>
  );
}
