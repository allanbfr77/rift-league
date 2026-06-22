import { useRef, useEffect, useState } from 'react';

/**
 * Anima um número de 0 até `to` quando entra na viewport.
 * Mantém prefixo/sufixo (ex.: "R$ ", "+", "mil") e agrupamento de milhar.
 * Respeita prefers-reduced-motion (mostra o valor final direto).
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  group = false,
  duration = 1400,
}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(to);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const text = group ? val.toLocaleString('pt-BR') : String(val);
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
