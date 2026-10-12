export type PlayerColor = 'black' | 'white';

export type PieceType = 'developer' | 'designer' | 'product_owner';

export interface Piece {
  id: string;
  type: PieceType;
  color: PlayerColor;
  x: number;
  y: number;
}
