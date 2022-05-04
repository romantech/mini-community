import React from 'react';
import { Navigate } from 'react-router-dom';
import Community from 'pages/Community';
import PostList from 'pages/community/PostList';
import Compose from 'pages/community/Compose';
import PostDetail from 'pages/community/PostDetail';
import NotFound from 'components/common/NotFound';
import siteUrl from './siteUrl';

const routes = (/* 필요시 Props 추가 */) => [
  {
    path: siteUrl.root,
    element: <Navigate to={siteUrl.community.list} />,
  },
  {
    path: siteUrl.community.root,
    element: <Community />,
    children: [
      { path: siteUrl.community.list, element: <PostList /> },
      { path: siteUrl.community.post.post_id, element: <PostDetail /> },
      { path: siteUrl.community.post.new, element: <Compose /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
