import Image from 'next/image';

import type { PieceType, PlayerColor } from '@/types/game';

type PieceProps = {
  type: PieceType;
  color: PlayerColor;
};

const images: Record<PieceType, Record<PlayerColor, string>> = {
  developer: {
    white: '/developer-white.png',
    black: '/developer-black.png',
  },
  designer: {
    white: '/designer-white.png',
    black: '/designer-black.png',
  },
  product_owner: {
    white: '/product_owner-white.png',
    black: '/product_owner-black.png',
  },
};

export default function Piece({ type, color }: PieceProps) {
  return (
    <Image
      src={images[type][color]}
      alt={`${type} ${color}`}
      width={54}
      height={54}
      className="chessboard__piece"
    />
  );
}
