import { Instagram, Twitch, Youtube } from 'lucide-react';
import BrandMark from './BrandMark';
import TikTokIcon from './TikTokIcon';
import { league } from '../data/league';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <div className={styles.brand}>
            <BrandMark size={26} title="Rift League" />
            <span className={styles.wm}>
              RIFT<span>&nbsp;LEAGUE</span>
            </span>
          </div>
          <p className={styles.disclaimer}>
            Rift League não é afiliada, associada ou endossada pela Epic Games, Inc.
            Fortnite é marca registrada da Epic Games, Inc.
          </p>
        </div>
        <div className={styles.social}>
          <a href={league.social.tiktok} aria-label="TikTok"><TikTokIcon size={18} /></a>
          <a href={league.social.instagram} aria-label="Instagram"><Instagram size={18} /></a>
          <a href={league.social.twitch} aria-label="Twitch"><Twitch size={18} /></a>
          <a href={league.social.youtube} aria-label="YouTube"><Youtube size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
