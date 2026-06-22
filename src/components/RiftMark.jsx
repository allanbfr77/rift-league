import { useId } from 'react';

// O símbolo da Rift League: um quadrado partido pela "fenda".
export default function RiftMark({ size = 32, variant = 'color', title }) {
  const cid = useId();
  const clip = `rift-${cid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <clipPath id={clip}>
          <rect width="64" height="64" rx="15" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {variant === 'color' && (
          <>
            <rect width="64" height="64" fill="#7b5cff" />
            <polygon points="30,-4 38,-4 12,68 4,68" fill="#100c1d" opacity="0.3" />
            <polygon points="38,-4 52,-4 26,68 12,68" fill="#19e3d6" />
          </>
        )}
        {variant === 'mono-light' && (
          <>
            <rect width="64" height="64" fill="#ffffff" />
            <polygon points="38,-4 52,-4 26,68 12,68" fill="#100c1d" />
          </>
        )}
      </g>
    </svg>
  );
}
