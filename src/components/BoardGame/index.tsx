'use client';

import { useMemo, useState } from 'react';

import BoardForm from '@/components/BoardForm';
import Chessboard, { type BoardDimensions } from '@/components/Chessboard';
import { INITIAL_BOARD_DIMENSIONS } from '@/constants/board';
import type { PieceData, PlayerColor } from '@/types/game';
import { generateInitialPieces } from '@/utils/boardLogic';

import WinnerSign from '../WinnerSign';

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
  const [turn, setTurn] = useState<PlayerColor>('white');

  const winner = useMemo<PlayerColor | null>(() => {
    if (pieces.length === 0) return null;

    const hasWhitePO = pieces.some(
      (piece) => piece.type === 'product_owner' && piece.color === 'white',
    );

    const hasBlackPO = pieces.some(
      (piece) => piece.type === 'product_owner' && piece.color === 'black',
    );

    if (!hasWhitePO) return 'black';
    if (!hasBlackPO) return 'white';

    return null;
  }, [pieces]);

  const handleBoardChange = (nextDimensions: BoardDimensions) => {
    setDimensions(nextDimensions);
    setPieces(
      generateInitialPieces(nextDimensions.columns, nextDimensions.rows),
    );
    setTurn('white');
  };

  const handlePieceMove = (
    movedPiece: PieceData,
    targetX: number,
    targetY: number,
  ) => {
    if (winner) return;

    setPieces((prevPieces) => {
      return prevPieces
        .filter(
          (piece) =>
            !(
              piece.id !== movedPiece.id &&
              piece.x === targetX &&
              piece.y === targetY
            ),
        )
        .map((piece) =>
          piece.id === movedPiece.id
            ? { ...piece, x: targetX, y: targetY }
            : piece,
        );
    });
    setTurn((prevTurn) => (prevTurn === 'white' ? 'black' : 'white'));
  };

  const handleResetGame = () => {
    setDimensions(INITIAL_BOARD_DIMENSIONS);
    setPieces(
      generateInitialPieces(
        INITIAL_BOARD_DIMENSIONS.columns,
        INITIAL_BOARD_DIMENSIONS.rows,
      ),
    );
    setTurn('white');
  };

  if (winner) {
    return <WinnerSign player={winner} onResetGame={handleResetGame} />;
  }

  return (
    <>
      {dimensions && (
        <Chessboard
          columns={dimensions.columns}
          rows={dimensions.rows}
          pieces={pieces}
          currentTurn={turn}
          winner={winner}
          onMovePiece={handlePieceMove}
        />
      )}
      <BoardForm onBoardChange={handleBoardChange} />
    </>
  );
}
