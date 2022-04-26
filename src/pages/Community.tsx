import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import siteUrl from 'routes/url';

export default function Community() {
  const navigate = useNavigate();
  const rootMatch = useMatch(siteUrl.community.root);

  useEffect(() => {
    if (rootMatch) navigate('list');
  }, [rootMatch, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
