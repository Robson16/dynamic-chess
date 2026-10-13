import './styles.scss';

import { StarIcon } from '@phosphor-icons/react';

import { PlayerColor } from '@/types/game';

type WinnerSignProps = {
  player: PlayerColor;
  onResetGame: () => void;
};

export default function WinnerSign({ player, onResetGame }: WinnerSignProps) {
  return (
    <div className="winner-sign">
      <header className="winner-sign__header">
        <span className="winner-sign__icon">
          <StarIcon size={32} weight="fill" />
        </span>
        <span className="winner-sign__text">{player} pieces won!</span>
      </header>
      <footer className="winner-sign__footer">
        <button className="winner-sign__btn-reset" onClick={onResetGame}>
          Start new match
        </button>
      </footer>
    </div>
  );
}
