type ChessboardNotationProps = {
  rowIndex: number;
  columnIndex: number;
  rows: number;
};

export default function ChessboardNotation({
  rowIndex,
  columnIndex,
  rows,
}: ChessboardNotationProps) {
  return (
    <>
      {columnIndex === 0 && (
        <span className="chessboard__notation chessboard__notation--row">
          {rows - rowIndex}
        </span>
      )}

      {rowIndex === rows - 1 && (
        <span className="chessboard__notation chessboard__notation--column">
          {String.fromCharCode(97 + columnIndex).toUpperCase()}
        </span>
      )}
    </>
  );
}
