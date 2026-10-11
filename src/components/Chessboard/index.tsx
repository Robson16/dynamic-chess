import './styles.scss';

export type BoardDimensions = {
  columns: number;
  rows: number;
};

export default function Chessboard({ columns, rows }: BoardDimensions) {
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
          {column === 0 && (
            <span className="chessboard__notation chessboard__notation--row">
              {rows - row}
            </span>
          )}

          {row === rows - 1 && (
            <span className="chessboard__notation chessboard__notation--column">
              {String.fromCharCode(97 + column).toUpperCase()}
            </span>
          )}
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
