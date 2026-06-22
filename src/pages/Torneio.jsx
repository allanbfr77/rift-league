import { useParams } from 'react-router-dom';
import {
  Calendar, Clock, Users, Crosshair, PlayCircle, Trophy, Medal,
  Check, Network, ListOrdered, Twitch,
} from 'lucide-react';
import Countdown from '../components/Countdown';
import StatusBadge from '../components/StatusBadge';
import BackButton from '../components/BackButton';
import { getTournament } from '../data/tournaments';
import { formatDate, formatTime, formatPrize, formatPrizeAmount } from '../lib/format';
import styles from './Torneio.module.css';

export default function Torneio() {
  const { id } = useParams();
  const t = getTournament(id);

  if (!t) {
    return (
      <div className={`container ${styles.notFound}`}>
        <header className={styles.topBar}>
          <BackButton />
        </header>
        <h1>Torneio não encontrado</h1>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.topBar}>
        <StatusBadge status={t.status} />
        <BackButton />
      </header>
      <h1 className={styles.name}>{t.name}</h1>
      <Meta t={t} />

      {t.status === 'open' && <OpenState t={t} />}
      {t.status === 'live' && <LiveState t={t} />}
      {t.status === 'finished' && <FinishedState t={t} />}
    </div>
  );
}

function Meta({ t }) {
  return (
    <div className={styles.meta}>
      {t.status === 'finished' ? (
        <span><Calendar size={15} /> Realizado em {formatDate(t.startsAt)}</span>
      ) : (
        <>
          <span><Calendar size={15} /> {formatDate(t.startsAt)}</span>
          <span><Clock size={15} /> {formatTime(t.startsAt)} (BRT)</span>
        </>
      )}
      <span><Users size={15} /> {t.format}</span>
      <span><Crosshair size={15} /> {t.mode}</span>
      {t.status === 'live' && t.round && (
        <span><PlayCircle size={15} /> Partida {t.round.current} de {t.round.total}</span>
      )}
      {t.status === 'finished' && t.round && (
        <span><PlayCircle size={15} /> {t.round.total} quedas</span>
      )}
    </div>
  );
}

/* ---------------- OPEN ---------------- */
function OpenState({ t }) {
  const pct = Math.round((t.spots.filled / t.spots.total) * 100);
  return (
    <>
      <div className={`card ${styles.signup}`}>
        <Countdown target={t.startsAt} />
        <div className={styles.spotsRow}>
          <span>Vagas preenchidas</span>
          <span className={styles.spotsNum}>{t.spots.filled} / {t.spots.total}</span>
        </div>
        <div className={styles.bar}><div className={styles.barFill} style={{ width: `${pct}%` }} /></div>
        <button className={`btn-action ${styles.fullBtn}`}>Inscrever-se — grátis</button>
      </div>

      <div className={styles.infoGrid}>
        <Info label="Premiação" value={formatPrize(t.prize)} />
        <Info label="Formato" value={t.format} />
        <Info label="Vagas" value={t.spots.total} />
        <Info label="Check-in" value={t.checkIn} />
      </div>

      <div className={styles.cols}>
        <div>
          <p className="eyebrow">Premiação</p>
          <PrizeList prize={t.prize} />
        </div>
        <div>
          <p className="eyebrow">Regras do torneio</p>
          <RuleList rules={t.rules} />
        </div>
      </div>

      <div className={styles.section}>
        <p className="eyebrow">Chaveamento</p>
        <div className={styles.bracket}>
          <Network size={30} className={styles.bracketIcon} />
          <p className={styles.bracketTitle}>Chaveamento disponível após o fim das inscrições</p>
          <p className={styles.bracketSub}>Embed do Challonge / Toornament aparece aqui</p>
        </div>
      </div>
    </>
  );
}

/* ---------------- LIVE ---------------- */
function LiveState({ t }) {
  return (
    <>
      <div className={`card ${styles.streamRow}`}>
        <div className={styles.streamInfo}>
          <Twitch size={22} className={styles.twitch} />
          <div>
            <p className={styles.streamTitle}>Transmissão oficial</p>
            {t.stream && (
              <p className={styles.streamSub}>
                {(t.stream.viewers / 1000).toFixed(1)} mil assistindo agora
              </p>
            )}
          </div>
        </div>
        <a href={t.stream?.url || '#'} className="btn-action">Assistir</a>
      </div>

      <div className={styles.standHead}>
        <p className="eyebrow" style={{ margin: 0 }}>Classificação ao vivo</p>
        <span className={styles.liveNote}>atualiza a cada partida</span>
      </div>
      <StandingsLive rows={t.standings} />
      <p className={styles.more}>+ classificação completa</p>
    </>
  );
}

/* ---------------- FINISHED ---------------- */
function FinishedState({ t }) {
  const champPrize = t.champion?.prizeLabel
    ?? (t.prize.distribution
      ? formatPrizeAmount(
          t.prize.distribution.find((d) => d.place === 1)?.amount,
          t.prize.currency,
        )
      : null);

  return (
    <>
      {t.champion && (
        <div className={styles.champion}>
          <Trophy size={42} className={styles.champTrophy} />
          <div className={styles.champBody}>
            <p className={styles.champKicker}>{t.champion.kicker ?? 'Campeões'}</p>
            <p className={styles.champTeam}>{t.champion.team}</p>
            <p className={styles.champStats}>
              {t.champion.players
                ?? `${t.champion.points} pts · ${t.champion.wins} vitórias`}
            </p>
          </div>
          {champPrize && (
            <div className={styles.champPrizeBox}>
              <p className={styles.champPrize}>{champPrize}</p>
              <p className={styles.paid}><Check size={13} /> pago</p>
            </div>
          )}
        </div>
      )}

      {t.roundWinners && (
        <>
          <p className="eyebrow">Vencedores por queda</p>
          <RoundWinnersList winners={t.roundWinners} perWin={t.prize.perWin} currency={t.prize.currency} />
        </>
      )}

      <p className="eyebrow">{t.roundWinners ? 'Premiação acumulada' : 'Classificação final'}</p>
      <StandingsFinal rows={t.standings} defaultCurrency={t.prize.currency} />

      <div className={styles.finalBtns}>
        <button className="btn-ghost"><PlayCircle size={16} /> Assistir replay</button>
        <button className="btn-ghost"><ListOrdered size={16} /> Classificação completa</button>
      </div>
    </>
  );
}

/* ---------------- shared bits ---------------- */
function Info({ label, value }) {
  return (
    <div className={`card ${styles.info}`}>
      <p className={styles.infoLabel}>{label}</p>
      <p className={styles.infoValue}>{value}</p>
    </div>
  );
}

function PrizeList({ prize }) {
  const place = ['', '1º lugar', '2º lugar', '3º lugar'];
  return (
    <div className={styles.prizeList}>
      {prize.distribution.map((d) => (
        <div className={`card ${styles.prizeRow}`} key={d.place}>
          <span className={styles.prizePlace}>
            {d.place === 1 ? <Trophy size={15} className={styles.gold} /> : <Medal size={15} className={styles.silver} />}
            {place[d.place]}
          </span>
          <span className={d.place === 1 ? styles.prizeWin : styles.prizeAmt}>
            {formatPrizeAmount(d.amount, prize.currency)}
          </span>
        </div>
      ))}
    </div>
  );
}

function RuleList({ rules }) {
  return (
    <div>
      {rules.map((r, i) => (
        <div className={styles.rule} key={i}>
          <Check size={16} className={styles.ruleCheck} /> <span>{r}</span>
        </div>
      ))}
    </div>
  );
}

function StandingsLive({ rows }) {
  return (
    <div className={styles.standings}>
      {rows.map((r) => (
        <div className={`${styles.lvRow} ${r.rank === 1 ? styles.leader : ''}`} key={r.rank}>
          <span className={`${styles.rank} ${r.rank === 1 ? styles.rankLeader : ''}`}>{r.rank}</span>
          <div>
            <div className={styles.team}>{r.team}</div>
            <div className={styles.subline}>{r.wins} vitórias · {r.elims} elims</div>
          </div>
          <span className={`${styles.points} ${r.rank === 1 ? styles.pointsLeader : ''}`}>{r.points}</span>
        </div>
      ))}
    </div>
  );
}

function RoundWinnersList({ winners, perWin, currency }) {
  return (
    <div className={styles.standings}>
      {winners.map((w) => (
        <div className={styles.fnRow} key={w.round}>
          <span className={styles.rank}>#{w.round}</span>
          <div className={styles.team}>{w.player}</div>
          {perWin && (
            <span className={styles.prizeAmt}>{formatPrizeAmount(perWin, currency)}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function StandingsFinal({ rows, defaultCurrency = 'brl' }) {
  return (
    <div className={styles.standings}>
      {rows.map((r) => (
        <div className={styles.fnRow} key={r.rank}>
          <span className={`${styles.rank} ${r.rank === 1 ? styles.rankLeader : ''}`}>{r.rank}</span>
          <div className={styles.team}>{r.team}</div>
          {r.prizeLabel ? (
            <span className={r.rank === 1 ? styles.prizeWin : styles.prizeAmt}>{r.prizeLabel}</span>
          ) : r.prize ? (
            <span className={r.rank === 1 ? styles.prizeWin : styles.prizeAmt}>
              {formatPrizeAmount(r.prize, r.currency ?? defaultCurrency)}
            </span>
          ) : (
            <span className={styles.pointsMuted}>{r.points} pts</span>
          )}
        </div>
      ))}
    </div>
  );
}
