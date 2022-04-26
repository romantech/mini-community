import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from 'routes/routes';

export default function App() {
  const elements = useRoutes(routes);

  return <main className="w-screen h-screen">{elements}</main>;
}
