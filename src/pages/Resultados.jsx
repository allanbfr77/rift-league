import { Link } from 'react-router-dom';
import { Trophy, Users, Crosshair, ChevronRight } from 'lucide-react';
import { getFinishedTournaments } from '../data/tournaments';
import { formatDate, formatPrize, formatPrizeAmount } from '../lib/format';
import styles from './Resultados.module.css';

export default function Resultados() {
  const finished = getFinishedTournaments();

  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">Resultados</p>
      <h1 className={styles.title}>Histórico de resultados</h1>
      <p className={styles.sub}>
        Torneios encerrados com classificação final e premiações pagas.
      </p>

      {finished.length === 0 ? (
        <p className={styles.empty}>Nenhum resultado publicado ainda.</p>
      ) : (
        <div className={styles.list}>
          {finished.map((t) => (
            <article className={`card ${styles.result}`} key={t.id}>
              <header className={styles.head}>
                <div>
                  <Link
                    to={`/torneio/${t.id}`}
                    state={{ from: '/resultados', fromLabel: 'Resultados' }}
                    className={styles.name}
                  >
                    {t.name}
                  </Link>
                  <p className={styles.date}>{formatDate(t.startsAt)}</p>
                </div>
                <span className={styles.prizeTotal}>
                  <Trophy size={14} /> {formatPrize(t.prize)}
                </span>
              </header>

              <div className={styles.tags}>
                <span><Users size={13} /> {t.format}</span>
                <span><Crosshair size={13} /> {t.mode}</span>
                {t.round && <span>{t.round.total} quedas</span>}
              </div>

              {t.roundWinners ? (
                <ResultRoundWinners
                  winners={t.roundWinners}
                  perWin={t.prize.perWin}
                  currency={t.prize.currency}
                />
              ) : (
                <ResultStandings
                  rows={t.standings}
                  currency={t.prize.currency}
                />
              )}

              <Link
                to={`/torneio/${t.id}`}
                state={{ from: '/resultados', fromLabel: 'Resultados' }}
                className={styles.link}
              >
                Ver resultado completo <ChevronRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultStandings({ rows, currency = 'brl' }) {
  return (
    <ol className={styles.standings}>
      {rows.map((r) => (
        <li className={styles.row} key={r.rank}>
          <span className={styles.rank}>{r.rank}º</span>
          <span className={styles.team}>{r.team}</span>
          {r.prize != null && (
            <span className={styles.amount}>
              {formatPrizeAmount(r.prize, r.currency ?? currency)}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ResultRoundWinners({ winners, perWin, currency }) {
  return (
    <ol className={styles.standings}>
      {winners.map((w) => (
        <li className={styles.row} key={w.round}>
          <span className={styles.rank}>#{w.round}</span>
          <span className={styles.team}>{w.player}</span>
          {perWin && (
            <span className={styles.amount}>
              {formatPrizeAmount(perWin, currency)}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
