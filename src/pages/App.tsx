import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes/routes';

export default function App() {
  const elements = useRoutes(routes());

  return <main className="min-h-screen">{elements}</main>;
}
