import { ArrowRight } from 'lucide-react';
import styles from './Sobre.module.css';

const TEAM = ['@REGISᵀᶦᵏᵗᵒᵏ', '@ΞX Lakaah ッ', '@isa'];

export default function Sobre() {
  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">Sobre</p>
      <h1 className={styles.title}>Agora somos Rift League</h1>
      <p className={styles.lead}>Iniciamos um novo capítulo da nossa história.</p>

      <article className={`card ${styles.article}`}>
        <p>
          Após muito planejamento e visando uma identidade ainda mais forte para o futuro,
          anunciamos oficialmente a mudança de nome da nossa organização.
        </p>

        <div className={styles.rebrand}>
          <span className={styles.oldName}>Liga Brasileira de Fortnite</span>
          <ArrowRight size={18} className={styles.arrow} aria-hidden="true" />
          <span className={styles.newName}>Rift League</span>
        </div>

        <p>
          Essa mudança representa evolução, novos objetivos e a construção de uma marca
          ainda maior dentro do cenário competitivo. Apesar do novo nome, nossa essência,
          dedicação e compromisso com a comunidade continuam os mesmos.
        </p>

        <p>
          Queremos agradecer a todos que fizeram parte da nossa trajetória até aqui.
          O apoio de cada um foi fundamental para chegarmos nesse momento.
        </p>

        <p>
          Estamos preparados para essa nova fase, mais fortes, mais unidos e prontos
          para o futuro.
        </p>

        <footer className={styles.signoff}>
          <p>Obrigado por fazer parte da nossa história.</p>
          <p className={styles.teamLabel}>Atenciosamente,</p>
          <p className={styles.teamName}>Equipe Rift League</p>
          <ul className={styles.members}>
            {TEAM.map((handle) => (
              <li key={handle}>{handle}</li>
            ))}
          </ul>
        </footer>
      </article>
    </div>
  );
}
