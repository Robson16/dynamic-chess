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
      const capturedIds = new Set<string>();

      if (movedPiece.type === 'developer') {
        const stepX = Math.sign(targetX - movedPiece.x);
        const stepY = Math.sign(targetY - movedPiece.y);

        let currentX = movedPiece.x + stepX;
        let currentY = movedPiece.y + stepY;

        while (currentX !== targetX || currentY !== targetY) {
          const pieceOnPath = prevPieces.find(
            (piece) =>
              piece.x === currentX &&
              piece.y === currentY &&
              piece.color !== movedPiece.color,
          );

          if (pieceOnPath) {
            capturedIds.add(pieceOnPath.id);
          }

          currentX += stepX;
          currentY += stepY;
        }
      }

      return prevPieces
        .filter((piece) => {
          if (piece.id === movedPiece.id) return true;

          if (piece.x === targetX && piece.y === targetY) return false;

          if (capturedIds.has(piece.id)) return false;

          return true;
        })
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
