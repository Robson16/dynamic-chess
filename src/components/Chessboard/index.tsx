import './styles.scss';

import { useState } from 'react';

import type { PieceData, PlayerColor } from '@/types/game';
import {
  getDesignerMoves,
  getDeveloperMoves,
  getProductOwnerMoves,
  ValidMove,
} from '@/utils/movementLogic';

import ChessboardNotation from './Notation';
import Piece from './Piece';

export type BoardDimensions = {
  columns: number;
  rows: number;
};

type ChessboardProps = BoardDimensions & {
  pieces: PieceData[];
  currentTurn: PlayerColor;
  winner: PlayerColor | null;
  onMovePiece: (
    movedPiece: PieceData,
    targetX: number,
    targetY: number,
  ) => void;
};

export default function Chessboard({
  columns,
  rows,
  pieces,
  currentTurn,
  winner,
  onMovePiece,
}: ChessboardProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceData>();
  const [validMoves, setValidMoves] = useState<ValidMove[]>([]);

  const filterSelectedPieceMoves = (
    moves: ValidMove[],
    selected: PieceData,
    allPieces: PieceData[],
  ) => {
    return moves.filter((move) => {
      const occupant = allPieces.find(
        (piece) => piece.x === move.x && piece.y === move.y,
      );

      if (!occupant) return true;

      if (selected.type === 'developer') {
        return false;
      }

      return occupant.color !== selected.color;
    });
  };

  const handlePieceClick = (piece: PieceData) => {
    if (winner) {
      setSelectedPiece(undefined);
      setValidMoves([]);
      return;
    }

    if (piece.color !== currentTurn) return;

    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(undefined);
      setValidMoves([]);
      return;
    }

    setSelectedPiece(piece);

    let moves: ValidMove[];

    switch (piece.type) {
      case 'product_owner':
        moves = getProductOwnerMoves(piece, columns, rows);
        setValidMoves(filterSelectedPieceMoves(moves, piece, pieces));
        break;
      case 'developer':
        moves = getDeveloperMoves(piece, columns, rows);
        setValidMoves(filterSelectedPieceMoves(moves, piece, pieces));
        break;
      case 'designer':
        moves = getDesignerMoves(piece, columns, rows);
        setValidMoves(filterSelectedPieceMoves(moves, piece, pieces));
        break;
    }
  };

  const handleCellClick = (targetX: number, targetY: number) => {
    if (winner) return;
    if (!selectedPiece) return;

    const isValidTarget = validMoves.some(
      (move) => move.x === targetX && move.y === targetY,
    );

    if (isValidTarget) {
      onMovePiece(selectedPiece, targetX, targetY);
      setSelectedPiece(undefined);
      setValidMoves([]);
    }
  };

  const boardRows = Array.from({ length: rows }, (_, row) => {
    const cells = Array.from({ length: columns }, (_, column) => {
      const isLight = (column + row) % 2 === 0;

      const isMoveValid = validMoves.some(
        (move) => move.x === column && move.y === row,
      );

      return (
        <div
          key={`${column}-${row}`}
          data-column={column}
          data-row={row}
          className={`chessboard__cell ${isLight ? 'chessboard__cell--light' : 'chessboard__cell--dark'}`}
          onClick={() => handleCellClick(column, row)}
        >
          <ChessboardNotation rowIndex={row} columnIndex={column} rows={rows} />

          {isMoveValid && <span className="chessboard__valid-move" />}

          {pieces
            .filter((piece) => piece.x === column && piece.y === row)
            .map((piece) => (
              <Piece
                key={piece.id}
                color={piece.color}
                type={piece.type}
                isSelected={selectedPiece?.id === piece.id}
                onClick={() => handlePieceClick(piece)}
              />
            ))}
        </div>
      );
    });

    return (
      <div key={`row-${row}`} className="chessboard__row">
        {cells}
      </div>
    );
  });

  return (
    <div className="chessboard-wrapper">
      <div className="chessboard__turn" aria-live="polite">
        <span className="chessboard__turn-label">Turn:</span>
        <span
          className={`chessboard__turn-player chessboard__turn-player--${currentTurn}`}
        >
          {currentTurn === 'white' ? 'White' : 'Black'}
        </span>
      </div>

      <div
        className="chessboard"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {boardRows}
      </div>
    </div>
  );
}
