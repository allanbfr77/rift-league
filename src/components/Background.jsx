import { league } from '../data/league';
import styles from './Background.module.css';

/**
 * Fundo fixo do site (atrás de todo o conteúdo).
 * Alterna entre imagem e vídeo conforme `league.background.type`.
 * Configuração central em src/data/league.js.
 */
export default function Background() {
  const bg = league.background;
  if (!bg) return null;

  const overlay = bg.overlay ?? 0.7;

  return (
    <div className={styles.bg} aria-hidden="true">
      {bg.type === 'video' ? (
        <video
          className={styles.media}
          src={bg.video}
          poster={bg.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img className={styles.media} src={bg.image} alt="" />
      )}
      <div
        className={styles.overlay}
        style={{ background: `rgba(0, 0, 0, ${overlay})` }}
      />
    </div>
  );
}
