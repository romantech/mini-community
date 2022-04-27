/* eslint-disable @typescript-eslint/naming-convention,react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import siteUrl from 'routes/url';
import {
  getCategories,
  getPostByPk,
  getPosts,
} from 'modules/community/communityThunk';
import { useSelector } from 'react-redux';
import {
  selectHasCategories,
  selectHasPostList,
} from 'modules/community/communitySelector';
import { useAppDispatch } from 'modules/store';

export default function Community() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rootMatch = useMatch(siteUrl.community.root);
  const { post_pk } = useParams(); // 포스트 상세보기로 진입했을 때

  const hasCategories = useSelector(selectHasCategories);
  const hasPostList = useSelector(selectHasPostList);

  useEffect(() => {
    if (!post_pk) {
      if (!hasPostList) dispatch(getPosts()); // 리스트
      if (!hasCategories) dispatch(getCategories()); // 카테고리
    } else {
      dispatch(getPostByPk(Number(post_pk))); // 포스트 상세
    }
  }, [post_pk]);

  useEffect(() => {
    if (rootMatch) navigate(siteUrl.community.list);
  }, [rootMatch]);

  return (
    <div className="max-w-[390px] my-0 mx-auto">
      <Outlet />
    </div>
  );
}
