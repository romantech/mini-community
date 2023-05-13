import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes/routes';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const elements = useRoutes(routes());

  return (
    <>
      <Analytics />
      <main className="min-h-screen">{elements}</main>
    </>
  );
}
