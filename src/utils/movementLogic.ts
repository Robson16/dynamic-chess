import { PieceData } from '@/types/game';

export interface ValidMove {
  x: number;
  y: number;
}

export function getProductOwnerMoves(
  piece: PieceData,
  columns: number,
  rows: number,
): ValidMove[] {
  const validMoves: ValidMove[] = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      if (xOffset === 0 && yOffset === 0) continue;

      let targetX = piece.x + xOffset;
      let targetY = piece.y + yOffset;

      if (targetX >= 0 && targetX < columns && targetY >= 0 && targetY < rows) {
        validMoves.push({ x: targetX, y: targetY });
      }
    }
  }

  return validMoves;
}

export function getDesignerMoves(
  piece: PieceData,
  columns: number,
  rows: number,
): ValidMove[] {
  const validMoves: ValidMove[] = [];

  for (let xOffset = -2; xOffset <= 2; xOffset++) {
    for (let yOffset = -2; yOffset <= 2; yOffset++) {
      if (Math.abs(xOffset) + Math.abs(yOffset) === 3) {
        let targetX = piece.x + xOffset;
        let targetY = piece.y + yOffset;

        if (
          targetX >= 0 &&
          targetX < columns &&
          targetY >= 0 &&
          targetY < rows
        ) {
          validMoves.push({ x: targetX, y: targetY });
        }
      }
    }
  }

  return validMoves;
}

export function getDeveloperMoves(
  piece: PieceData,
  columns: number,
  rows: number,
): ValidMove[] {
  const validMoves: ValidMove[] = [];

  for (let xOffset = -3; xOffset <= 3; xOffset++) {
    for (let yOffset = -3; yOffset <= 3; yOffset++) {
      if (xOffset === 0 && yOffset === 0) continue;

      const isHorizontal = yOffset === 0;
      const isVertical = xOffset === 0;
      const isDiagonal = Math.abs(xOffset) === Math.abs(yOffset);

      if (isHorizontal || isVertical || isDiagonal) {
        let targetX = piece.x + xOffset;
        let targetY = piece.y + yOffset;

        if (
          targetX >= 0 &&
          targetX < columns &&
          targetY >= 0 &&
          targetY < rows
        ) {
          validMoves.push({ x: targetX, y: targetY });
        }
      }
    }
  }

  return validMoves;
}
