import { clsx } from 'clsx';
import Image from 'next/image';

import type { PieceType, PlayerColor } from '@/types/game';

type PieceProps = {
  type: PieceType;
  color: PlayerColor;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
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

export default function Piece({
  type,
  color,
  isSelected,
  isDisabled,
  onClick,
}: PieceProps) {
  return (
    <button
      disabled={isDisabled}
      className={clsx('chessboard__piece', {
        'chessboard__piece--selected': isSelected,
      })}
      onClick={onClick}
    >
      <Image
        src={images[type][color]}
        alt={`${type} ${color}`}
        width={54}
        height={54}
      />
    </button>
  );
}
