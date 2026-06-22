import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

export default function BackButton({ to, label }) {
  const location = useLocation();
  const target = to ?? location.state?.from ?? '/campeonatos';
  const destination = label ?? location.state?.fromLabel ?? 'Campeonatos';

  return (
    <Link
      to={target}
      className={styles.back}
      aria-label={`Voltar para ${destination}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <ArrowLeft size={18} strokeWidth={2.25} />
      </span>
      <span className={styles.label}>Voltar</span>
    </Link>
  );
}
