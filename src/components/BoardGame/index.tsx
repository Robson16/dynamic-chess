'use client';
import { useState } from 'react';

import BoardForm from '@/components/BoardForm';
import Chessboard, { type BoardDimensions } from '@/components/Chessboard';

export default function BoardGame() {
  const [dimensions, setDimensions] = useState<BoardDimensions | null>(null);

  return (
    <>
      {dimensions && <Chessboard {...dimensions} />}
      <BoardForm onBoardChange={setDimensions} />
    </>
  );
}
