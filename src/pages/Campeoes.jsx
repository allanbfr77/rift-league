import { Link } from 'react-router-dom';
import { Trophy, Users } from 'lucide-react';
import { getAllChampions } from '../data/tournaments';
import { formatBRL, formatDate } from '../lib/format';
import styles from './Campeoes.module.css';

export default function Campeoes() {
  const champions = getAllChampions();

  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">Campeões</p>
      <h1 className={styles.title}>Mural de campeões</h1>
      <p className={styles.sub}>
        Vencedores e destaques de cada campeonato encerrado da Rift League.
      </p>

      {champions.length === 0 ? (
        <p className={styles.empty}>Nenhum campeonato encerrado ainda.</p>
      ) : (
        <div className={styles.grid}>
          {champions.map((c) => (
            <Link
              to={`/torneio/${c.id}`}
              state={{ from: '/campeoes', fromLabel: 'Campeões' }}
              className={`card ${styles.card}`}
              key={c.id}
            >
              <span className={styles.ava}>
                <Trophy size={18} />
              </span>
              <div className={styles.body}>
                <p className={styles.kicker}>{c.kicker ?? 'Campeão'}</p>
                <p className={styles.name}>{c.team}</p>
                {c.players && <p className={styles.players}>{c.players}</p>}
                <p className={styles.tournament}>{c.name}</p>
                <p className={styles.meta}>
                  <span>{formatDate(c.date)}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.format}>
                    <Users size={12} /> {c.format}
                  </span>
                </p>
              </div>
              {(c.prizeLabel ?? c.prize != null) && (
                <span className={styles.prize}>
                  {c.prizeLabel ?? formatBRL(c.prize)}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
