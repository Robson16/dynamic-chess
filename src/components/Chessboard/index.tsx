import './styles.scss';

import { generateInitialPieces } from '@/utils/boardLogic';

import ChessboardNotation from './Notation';
import Piece from './Piece';

export type BoardDimensions = {
  columns: number;
  rows: number;
};

export default function Chessboard({ columns, rows }: BoardDimensions) {
  const pieces = generateInitialPieces(columns, rows);

  const boardRows = Array.from({ length: rows }, (_, row) => {
    const cells = Array.from({ length: columns }, (_, column) => {
      const isLight = (column + row) % 2 === 0;

      return (
        <div
          key={`${column}-${row}`}
          data-column={column}
          data-row={row}
          className={`chessboard__cell ${isLight ? 'chessboard__cell--light' : 'chessboard__cell--dark'}`}
        >
          <ChessboardNotation rowIndex={row} columnIndex={column} rows={rows} />
          {pieces
            .filter((piece) => piece.x === column && piece.y === row)
            .map((piece) => (
              <Piece key={piece.id} color={piece.color} type={piece.type} />
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
    <div
      className="chessboard"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {boardRows}
    </div>
  );
}
