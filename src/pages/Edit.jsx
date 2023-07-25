import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  const mode = searchParams.get('mode');

  return <div>EDIT</div>;
}
