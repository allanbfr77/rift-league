// Números e links da liga (placeholders — trocar pelos reais).
export const league = {
  name: 'Rift League',
  tagline: 'Fortnite · Zero Build',
  discordUrl: '#',

  // Ícone do logo. Coloque o arquivo em /public (ex.: public/logo.png) e
  // referencie pela raiz. Deixe null/'' para usar o símbolo padrão (SVG).
  logo: '/logo.png',

  // ----------------------------------------------------------------
  // FUNDO DO SITE
  // Para alternar entre imagem e vídeo, mude apenas "type".
  //   type: 'image'  -> usa o arquivo em "image"
  //   type: 'video'  -> usa o arquivo em "video" (com "poster" como fallback)
  // Coloque os arquivos na pasta /public e referencie pela raiz, ex.: '/bg.jpg'.
  // "overlay" (0 a 1) escurece o fundo para manter o texto legível.
  // ----------------------------------------------------------------
  background: {
    type: 'image', // 'image' | 'video'
    image: '/bg.png',
    video: '/bg.mp4',
    poster: '/bg.jpg', // 1º frame enquanto o vídeo carrega
    overlay: 0.72,
  },

  social: {
    tiktok: '#',
    instagram: '#',
    twitch: '#',
    youtube: '#',
  },
  // `to` = valor final (animado de 0). prefix/suffix/group preservam o formato.
  stats: [
    { to: 120, suffix: '+', label: 'Torneios', icon: 'trophy' },
    { to: 18, prefix: 'R$ ', suffix: 'mil', label: 'Em prêmios', icon: 'prize' },
    { to: 2400, group: true, label: 'Jogadores', icon: 'players' },
    { to: 5100, group: true, label: 'No Discord', icon: 'discord' },
  ],
};
