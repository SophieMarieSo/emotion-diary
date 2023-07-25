import React from 'react';
import { useParams } from 'react-router-dom';

export default function Diary() {
  const { id } = useParams();

  return <div>DIARY</div>;
}
