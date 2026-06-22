import styles from './PagePlaceholder.module.css';

export default function PagePlaceholder({ eyebrow, title, children }) {
  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.note}>{children}</p>
    </div>
  );
}
