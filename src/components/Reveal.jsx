import { useRef, useEffect, useState } from 'react';

/**
 * Revela o conteúdo com fade + leve subida quando ele entra na viewport.
 * Usa IntersectionObserver (uma vez). Respeita prefers-reduced-motion via CSS
 * (as classes .reveal/.is-visible só animam fora de reduced-motion).
 *
 * Uso: <Reveal as="section" className="container" delay={120}>...</Reveal>
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
