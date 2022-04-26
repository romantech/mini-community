import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import siteUrl from 'routes/url';
import { useAppDispatch } from 'modules/store';
import { getPosts } from 'modules/community/communityThunk';

export default function Community() {
  const navigate = useNavigate();
  const rootMatch = useMatch(siteUrl.community.root);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
    if (rootMatch) navigate('list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
