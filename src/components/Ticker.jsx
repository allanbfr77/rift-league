import { tournaments, getNextOpen, getRecentChampions } from '../data/tournaments';
import { formatPrize } from '../lib/format';
import styles from './Ticker.module.css';

/**
 * Faixa "ao vivo" que rola no topo — sensação de liga acontecendo agora.
 * Conteúdo vem dos dados (torneio ao vivo, próximo, último campeão).
 * Pausa ao passar o mouse e respeita prefers-reduced-motion.
 */
export default function Ticker() {
  const live = tournaments.find((t) => t.status === 'live');
  const next = getNextOpen();
  const champ = getRecentChampions(1)[0];

  const items = [];
  if (live) items.push({ live: true, text: `Ao vivo agora — ${live.name}` });
  if (next) {
    const spotsText = next.spots
      ? `${next.spots.filled}/${next.spots.total} vagas`
      : next.spotsLabel ?? 'inscrições abertas';
    items.push({ text: `Próximo: ${next.name} · ${spotsText}` });
  }
  if (next) items.push({ text: `Premiação ${formatPrize(next.prize)}` });
  if (champ) items.push({ text: `Último campeão: ${champ.team} — ${champ.name}` });
  items.push({ text: 'Inscrições abertas toda semana' });

  if (items.length === 0) return null;

  // duplica a lista para o loop ser contínuo (translate -50%)
  const loop = [...items, ...items];

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {loop.map((it, i) => (
          <span className={styles.item} key={i}>
            {it.live && <span className={styles.liveDot} />}
            <span className={it.live ? styles.liveText : undefined}>{it.text}</span>
            <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
