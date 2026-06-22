import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, MessageCircle, ClipboardCheck, Gamepad2, Coins } from 'lucide-react';
import Countdown from '../components/Countdown';
import CountUp from '../components/CountUp';
import Reveal from '../components/Reveal';
import { getNextOpen, getRecentChampions } from '../data/tournaments';
import { league } from '../data/league';
import { formatPrize, formatBRL } from '../lib/format';
import styles from './Home.module.css';

const STAT_ICONS = {
  trophy: Trophy,
  prize: Coins,
  players: Users,
  discord: MessageCircle,
};

export default function Home() {
  const next = getNextOpen();
  const champions = getRecentChampions(3);
  const hasSpots = next?.spots?.total > 0;
  const pct = hasSpots ? Math.round((next.spots.filled / next.spots.total) * 100) : 0;

  // barra de vagas cresce de 0 → pct ao montar
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="page-stack">
      {/* HERO */}
      <section className={`container ${styles.hero}`}>
        <span className={styles.kicker}>
          <span className={styles.kickerDot} aria-hidden="true" />
          Liga independente · Fortnite Zero Build
        </span>
        <h1 className={styles.h1}>
          Torneios de Zero Build,<br />toda semana.
        </h1>
        <p className={styles.sub}>
          Inscrição aberta, premiação real e ranking de campeões. Entre na próxima disputa.
        </p>

        {next && (
          <div className={styles.nextWrap}>
          <div className={`card ${styles.nextCard}`}>
            <div className={styles.nextTop}>
              <div>
                <p className={styles.nextLabel}>Próximo torneio</p>
                <p className={styles.nextName}>{next.name}</p>
              </div>
              <span className={styles.formatPill}>
                <Users size={13} /> {next.format}
              </span>
            </div>

            <Countdown target={next.startsAt} />

            {hasSpots ? (
              <>
                <div className={styles.spotsRow}>
                  <span>{next.spotsLabel ?? 'Vagas preenchidas'}</span>
                  <span className={styles.spotsNum}>
                    {next.spots.filled} / {next.spots.total}
                  </span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${barReady ? pct : 0}%` }} />
                </div>
              </>
            ) : next.spotsLabel ? (
              <p className={styles.spotsLimited}>{next.spotsLabel}</p>
            ) : null}

            <div className={styles.nextFoot}>
              <span className={styles.prize}>
                <Trophy size={15} /> {formatPrize(next.prize)}
                {hasSpots && (
                  <span className={styles.dim}> · {next.spots.filled}/{next.spots.total} vagas</span>
                )}
              </span>
              <Link
                to={`/torneio/${next.id}`}
                state={{ from: '/', fromLabel: 'Início' }}
                className="btn-action"
              >
                SAIBA MAIS
              </Link>
            </div>
          </div>
          </div>
        )}
      </section>

      {/* STATS */}
      <Reveal as="section" className={`container ${styles.stats}`}>
        {league.stats.map((s) => {
          const Icon = STAT_ICONS[s.icon];
          return (
            <div className={`card ${styles.stat}`} key={s.label}>
              {Icon && <Icon className={styles.statIcon} size={18} />}
              <span className={styles.statValue}>
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} group={s.group} />
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          );
        })}
      </Reveal>

      {/* CHAMPIONS */}
      <Reveal as="section" className="container">
        <p className="eyebrow">Campeões recentes</p>
        <div className={styles.champs}>
          {champions.map((c) => (
            <Link
              to={`/torneio/${c.id}`}
              state={{ from: '/', fromLabel: 'Início' }}
              className={`card ${styles.champ}`}
              key={c.id}
            >
              <span className={styles.ava}>
                <Trophy size={16} />
              </span>
              <div className={styles.champInfo}>
                <p className={styles.champName}>{c.team}</p>
                <p className={styles.champMeta}>{c.name}</p>
              </div>
              {(c.prizeLabel ?? c.prize != null) && (
                <span className={styles.champPrize}>
                  {c.prizeLabel ?? formatBRL(c.prize)}
                </span>
              )}
            </Link>
          ))}
        </div>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal as="section" className="container">
        <p className="eyebrow">Como funciona</p>
        <div className={styles.steps}>
          <div className={`card ${styles.step}`}>
            <MessageCircle className={styles.stepIcon} size={22} />
            <p className={styles.stepTitle}>1 · Entre no Discord</p>
            <p className={styles.stepSub}>É onde tudo acontece</p>
          </div>
          <div className={`card ${styles.step}`}>
            <ClipboardCheck className={styles.stepIcon} size={22} />
            <p className={styles.stepTitle}>2 · Inscreva-se</p>
            <p className={styles.stepSub}>Escolha o torneio</p>
          </div>
          <div className={`card ${styles.step}`}>
            <Gamepad2 className={styles.stepIcon} size={22} />
            <p className={styles.stepTitle}>3 · Compita</p>
            <p className={styles.stepSub}>Vença e suba no ranking</p>
          </div>
        </div>
      </Reveal>

      {/* DISCORD */}
      <Reveal as="section" className="container">
        <div className={styles.discord}>
          <p className={styles.discordTitle}>A liga vive no Discord</p>
          <p className={styles.discordSub}>
            Avisos de torneio, resultados e a comunidade toda num lugar só.
          </p>
          <a href={league.discordUrl} className={styles.discordBtn}>
            <MessageCircle size={16} /> Entrar no servidor
          </a>
        </div>
      </Reveal>
    </div>
  );
}
