'use client';
import './styles.scss';

import { CheckIcon, WarningIcon, XIcon } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import type { BoardDimensions } from '@/components/Chessboard';
type STATUS = 'idle' | 'playing' | 'error';

type BoardFormProps = {
  onBoardChange: (dimensions: BoardDimensions | null) => void;
};

export default function BoardForm({ onBoardChange }: BoardFormProps) {
  const MIN_DIMENSION = 6;
  const MAX_DIMENSION = 12;

  const [axleX, setAxleX] = useState(6);
  const [axleY, setAxleY] = useState(6);
  const [status, setStatus] = useState<STATUS>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAxleXChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAxleX(parseInt(event.target.value, 10));

    setStatus('idle');
    setErrorMessage('');
    onBoardChange(null);
  };

  const handleAxleYChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAxleY(parseInt(event.target.value, 10));

    setStatus('idle');
    setErrorMessage('');
    onBoardChange(null);
  };

  const handleStartPlay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      axleX < MIN_DIMENSION ||
      axleX > MAX_DIMENSION ||
      axleY < MIN_DIMENSION ||
      axleY > MAX_DIMENSION
    ) {
      setStatus('error');
      setErrorMessage(
        `Please use values between ${MIN_DIMENSION} and ${MAX_DIMENSION}.`,
      );
      onBoardChange(null);
      return;
    }

    setStatus('playing');
    setErrorMessage('');
    onBoardChange({ columns: axleX, rows: axleY });
  };

  return (
    <>
      <form className="boardForm__config" onSubmit={handleStartPlay}>
        <div className="boardForm__inputGroup">
          <span>Scale</span>

          <label htmlFor="axleX">X:</label>
          <input
            type="number"
            id="axleX"
            name="axleX"
            step="1"
            value={axleX}
            onChange={handleAxleXChange}
          />

          <label htmlFor="axleY">Y:</label>
          <input
            type="number"
            id="axleY"
            name="axleY"
            step="1"
            value={axleY}
            onChange={handleAxleYChange}
          />

          <div className="boardForm__statusIcon">
            {status === 'error' ? <XIcon size={25} /> : <CheckIcon size={25} />}
          </div>
        </div>

        <button type="submit">Play</button>
      </form>

      {status === 'error' && (
        <span className="boardForm__errorMessage">
          <WarningIcon size={16} />
          {errorMessage}
        </span>
      )}
    </>
  );
}
