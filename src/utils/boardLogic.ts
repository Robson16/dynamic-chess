import { v4 as uuid } from 'uuid';

import type { PieceData } from '@/types/game';

export function generateInitialPieces(columns: number, rows: number) {
  const pieces: PieceData[] = [];

  // White Pieces

  pieces.push({
    id: uuid(),
    color: 'white',
    type: 'product_owner',
    x: 0,
    y: rows - 1,
  });

  pieces.push({
    id: uuid(),
    color: 'white',
    type: 'developer',
    x: 1,
    y: rows - 1,
  });

  pieces.push({
    id: uuid(),
    color: 'white',
    type: 'designer',
    x: 2,
    y: rows - 1,
  });

  // Black Pieces

  pieces.push({
    id: uuid(),
    color: 'black',
    type: 'product_owner',
    x: columns - 1,
    y: 0,
  });

  pieces.push({
    id: uuid(),
    color: 'black',
    type: 'developer',
    x: columns - 2,
    y: 0,
  });

  pieces.push({
    id: uuid(),
    color: 'black',
    type: 'designer',
    x: columns - 3,
    y: 0,
  });

  return pieces;
}
