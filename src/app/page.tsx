import BoardGame from '@/components/BoardGame';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <BoardGame />
      <footer className={styles.footer}>All Rights Reserved.</footer>
    </div>
  );
}
