import { useState } from 'react';
import RiftMark from './RiftMark';
import { league } from '../data/league';

/**
 * Símbolo da marca.
 * Usa a imagem em `league.logo` (ex.: /logo.png).
 * Se não houver imagem configurada — ou o arquivo falhar ao carregar —
 * cai no símbolo SVG padrão (RiftMark).
 */
export default function BrandMark({ size = 32, title }) {
  const [failed, setFailed] = useState(false);

  if (league.logo && !failed) {
    return (
      <img
        src={league.logo}
        alt={title || ''}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{ display: 'block', objectFit: 'contain' }}
      />
    );
  }

  return <RiftMark size={size} title={title} />;
}
