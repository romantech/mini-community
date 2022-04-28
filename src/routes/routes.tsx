import React from 'react';
import { Navigate } from 'react-router-dom';
import List from 'container/List';
import Community from 'pages/Community';
import Compose from 'container/Compose';
import PostDetail from 'container/PostDetail';
import siteUrl from './url';

const routes = [
  {
    path: siteUrl.root,
    element: <Navigate to={siteUrl.community.list} />,
  },
  {
    path: siteUrl.community.root,
    element: <Community />,
    children: [
      { path: siteUrl.community.list, element: <List /> },
      { path: siteUrl.community.post.post_pk, element: <PostDetail /> },
      { path: siteUrl.community.post.new, element: <Compose /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="." />,
  },
];

export default routes;
