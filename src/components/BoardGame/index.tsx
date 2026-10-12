'use client';

import { useState } from 'react';

import BoardForm from '@/components/BoardForm';
import Chessboard, { type BoardDimensions } from '@/components/Chessboard';
import { INITIAL_BOARD_DIMENSIONS } from '@/constants/board';
import type { PieceData } from '@/types/game';
import { generateInitialPieces } from '@/utils/boardLogic';

export default function BoardGame() {
  const [dimensions, setDimensions] = useState<BoardDimensions>(
    INITIAL_BOARD_DIMENSIONS,
  );
  const [pieces, setPieces] = useState<PieceData[]>(() =>
    generateInitialPieces(
      INITIAL_BOARD_DIMENSIONS.columns,
      INITIAL_BOARD_DIMENSIONS.rows,
    ),
  );

  const handleBoardChange = (nextDimensions: BoardDimensions) => {
    setDimensions(nextDimensions);
    setPieces(
      generateInitialPieces(nextDimensions.columns, nextDimensions.rows),
    );
  };

  return (
    <>
      {dimensions && (
        <Chessboard
          columns={dimensions.columns}
          rows={dimensions.rows}
          pieces={pieces}
        />
      )}
      <BoardForm onBoardChange={handleBoardChange} />
    </>
  );
}
