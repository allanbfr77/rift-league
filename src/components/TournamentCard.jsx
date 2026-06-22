import { Link } from 'react-router-dom';
import { Trophy, Users } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, formatPrize } from '../lib/format';
import styles from './TournamentCard.module.css';

export default function TournamentCard({ tournament }) {
  const t = tournament;
  const spotsLabel = t.spots
    ? `${t.spots.filled}/${t.spots.total}`
    : t.round
      ? `${t.round.total} quedas`
      : null;

  return (
    <Link to={`/torneio/${t.id}`} className={`card ${styles.card}`}>
      <div className={styles.top}>
        <StatusBadge status={t.status} />
        <span className={styles.format}><Users size={12} /> {t.format}</span>
      </div>
      <h3 className={styles.name}>{t.name}</h3>
      <p className={styles.date}>{formatDate(t.startsAt)}</p>
      <div className={styles.meta}>
        <span><Trophy size={14} /> {formatPrize(t.prize)}</span>
        {spotsLabel && (
          <span><Users size={14} /> {spotsLabel}</span>
        )}
      </div>
    </Link>
  );
}
