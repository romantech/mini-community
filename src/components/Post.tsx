import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Post() {
  const { state } = useLocation();

  return <div>Post</div>;
}
