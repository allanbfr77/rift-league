import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

function getDiff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown({ target }) {
  const [t, setT] = useState(() => getDiff(target));

  useEffect(() => {
    const id = setInterval(() => setT(getDiff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    ['dias', t.d],
    ['horas', t.h],
    ['min', t.m],
    ['seg', t.s],
  ];

  return (
    <div className={styles.row}>
      {units.map(([label, value]) => (
        <div className={styles.box} key={label}>
          {/* key={value} remonta só quando o número muda → dispara o "pop" */}
          <span className={styles.num} key={value}>{pad(value)}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
