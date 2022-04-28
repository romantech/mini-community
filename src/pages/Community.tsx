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
      dispatch(getPosts()); // 리스트
      dispatch(getCategories()); // 카테고리
    } else {
      dispatch(getPostsById({ id: Number(post_id) })); // 포스트 상세
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
