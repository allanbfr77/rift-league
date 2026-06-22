import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { league } from '../data/league';
import styles from './Nav.module.css';

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/campeonatos', label: 'Campeonatos' },
  { to: '/campeoes', label: 'Campeões' },
  { to: '/resultados', label: 'Resultados' },
  { to: '/regras', label: 'Regras' },
  { to: '/sobre', label: 'Sobre' },
];

const MENU_TRANSITION_MS = 380;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  // fecha o menu ao trocar de página
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // monta/desmonta com animação
  useEffect(() => {
    if (open) {
      setMenuMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuShown(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setMenuShown(false);
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!menuShown && menuMounted) {
      const timeout = setTimeout(() => setMenuMounted(false), MENU_TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [menuShown, menuMounted]);

  // trava scroll e fecha com Escape
  useEffect(() => {
    if (!menuMounted) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuMounted]);

  return (
    <header className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <BrandMark size={30} title="Rift League" />
          <span className={styles.wm}>
            RIFT<span>&nbsp;LEAGUE</span>
          </span>
        </Link>

        <nav className={styles.links}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href={league.discordUrl} className={styles.discord}>
            <MessageCircle size={16} /> Discord
          </a>
        </nav>

        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.burgerIcons} aria-hidden="true">
            <Menu size={22} className={styles.menuIcon} />
            <X size={22} className={styles.closeIcon} />
          </span>
        </button>
      </div>

      {menuMounted && createPortal(
        <div
          className={`${styles.mobileOverlay} ${menuShown ? styles.mobileOverlayVisible : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <button
            type="button"
            className={styles.overlayDismiss}
            aria-label="Fechar menu"
            onClick={closeMenu}
          />
          <nav className={styles.mobileNav}>
            <div className={styles.mobileNavInner}>
              {LINKS.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  style={{ '--i': i }}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.mobileLink} ${styles.mobileActive}`
                      : styles.mobileLink
                  }
                  onClick={closeMenu}
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={league.discordUrl}
                className={styles.mobileDiscord}
                style={{ '--i': LINKS.length }}
                onClick={closeMenu}
              >
                <MessageCircle size={18} /> Entrar no Discord
              </a>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </header>
  );
}
