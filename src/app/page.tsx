"use client"

import { CheckIcon, WarningIcon, XIcon } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.scss';

type STATUS = 'idle' | 'playing' | 'error';

export default function Home() {
  const MIN_DIMENSION = 6;
  const MAX_DIMENSION = 12;

  const [axleX, setAxleX] = useState(6);
  const [axleY, setAxleY] = useState(6);
  const [status, setStatus] = useState<STATUS>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [boardRendered, setBoardRendered] = useState(false);

  const handleAxleXChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAxleX(parseInt(event.target.value, 10));

    setStatus('idle');
    setErrorMessage('');
    setBoardRendered(false);
  };

  const handleAxleYChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAxleY(parseInt(event.target.value, 10));

    setStatus('idle');
    setErrorMessage('');
    setBoardRendered(false);
  };

  const handleStartPlay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (axleX < MIN_DIMENSION || axleX > MAX_DIMENSION || axleY < MIN_DIMENSION || axleY > MAX_DIMENSION) {
      setStatus('error');
      setErrorMessage(`Please use values between ${MIN_DIMENSION} - ${MAX_DIMENSION}.`);
      setBoardRendered(false);
      return;
    }

    setStatus('playing');
    setErrorMessage('');
    setBoardRendered(true);
  };

  const renderChessboard = () => {
    return [...Array(axleY)].map((_, y) => {
      const rowCells = [...Array(axleX)].map((_, x) => {
        const isLight = (x + y) % 2 === 0;

        return (
          <div
            key={`${x}-${y}`}
            className={`${styles.cell} ${isLight ? styles.light : styles.dark}`}
          />
        );
      });

      return (
        <div key={`row-${y}`} className={styles.row}>
          {rowCells}
        </div>
      );
    })

  };

  return (
    <div className={styles.container}>
      {boardRendered && (
        <div className={styles.chessboard} style={{
          gridTemplateColumns: `repeat(${axleX}, 1fr)`
        }}>
          {renderChessboard()}
        </div>
      )}

      <form
        className={styles.gameConfigForm}
        onSubmit={handleStartPlay}
      >
        <div className={styles.inputGroup}>
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

          <div className={styles.inputGroupText}>
            {status === 'error' ? (
              <XIcon size={25} />
            ) : (
              <CheckIcon size={25} />
            )}
          </div>
        </div>

        <button type="submit">Play</button>
      </form>

      {status === 'error' && (
        <span className={styles.errorMessage}>
          <WarningIcon size={16} />
          {errorMessage}
        </span>
      )}

      <footer className={styles.footer}>
        All Rights Reserved.
      </footer>
    </div>
  );
}