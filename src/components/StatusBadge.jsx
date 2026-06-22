import styles from './StatusBadge.module.css';

const MAP = {
  open: { label: 'Inscrições abertas', tone: 'open' },
  live: { label: 'Ao vivo', tone: 'live' },
  finished: { label: 'Encerrado', tone: 'finished' },
};

export default function StatusBadge({ status }) {
  const info = MAP[status] || MAP.open;
  return (
    <span className={`${styles.badge} ${styles[info.tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {info.label}
    </span>
  );
}
