import { tournaments } from '../data/tournaments';
import TournamentCard from '../components/TournamentCard';
import styles from './Campeonatos.module.css';

export default function Campeonatos() {
  const order = { live: 0, open: 1, finished: 2 };
  const sorted = [...tournaments].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">Campeonatos</p>
      <h1 className={styles.title}>Todos os torneios</h1>
      <div className={styles.grid}>
        {sorted.map((t) => (
          <TournamentCard key={t.id} tournament={t} />
        ))}
      </div>
    </div>
  );
}
