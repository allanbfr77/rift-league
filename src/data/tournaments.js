// ============================================================
// FONTE DA VERDADE dos torneios.
// Criar um torneio = adicionar um objeto aqui.
// O campo `status` controla qual estado a página renderiza:
//   'open'     → inscrições abertas (cronômetro + inscrição)
//   'live'     → ao vivo (transmissão + classificação parcial)
//   'finished' → encerrado (campeão + classificação final)
// ============================================================

export const tournaments = [
  {
    id: 'trocacao-solo',
    name: 'Campeonato Trocação Solo',
    status: 'finished',
    format: 'Solo',
    mode: 'Trocação',
    region: 'BR',
    startsAt: '2026-05-17T19:00:00-03:00',
    round: { current: 6, total: 6 },
    prize: {
      currency: 'vbucks',
      total: 12000,
      label: '10K V-Bucks + 2K bônus',
      perWin: 2000,
    },
    champion: {
      kicker: 'Destaque',
      team: 'BX Noyru',
      players: '2 quedas vencidas',
      prizeLabel: '4K V-Bucks',
    },
    roundWinners: [
      { round: 1, player: 'ACE Low Cortisol' },
      { round: 2, player: 'IGL_Ramos 7' },
      { round: 3, player: 'BX Noyru' },
      { round: 4, player: 'LosBot Pablocz' },
      { round: 5, player: 'VirouClip' },
      { round: 6, player: 'BX Noyru' },
    ],
    standings: [
      { rank: 1, team: 'BX Noyru', prize: 4000, currency: 'vbucks' },
      { rank: 2, team: 'ACE Low Cortisol', prize: 2000, currency: 'vbucks' },
      { rank: 3, team: 'IGL_Ramos 7', prize: 2000, currency: 'vbucks' },
      { rank: 4, team: 'LosBot Pablocz', prize: 2000, currency: 'vbucks' },
      { rank: 5, team: 'VirouClip', prize: 2000, currency: 'vbucks' },
    ],
    rules: [
      'Modo Trocação Solo, servidores BR',
      '6 quedas — 2K V-Bucks por vitória',
      'Premiação total de 10K V-Bucks + 2K bônus',
    ],
  },
  {
    id: 'reload-trio-zb-clans',
    name: 'Campeonato Entre Clãs — Reload Trio ZB',
    status: 'finished',
    format: 'Trio',
    mode: 'Zero Build',
    region: 'BR',
    startsAt: '2026-05-30T19:00:00-03:00',
    checkIn: '13h30',
    spots: { filled: 13, total: 13 },
    round: { current: 5, total: 5 },
    prize: {
      total: 800,
      distribution: [
        { place: 1, amount: 400 },
        { place: 2, amount: 250 },
        { place: 3, amount: 150 },
      ],
    },
    champion: {
      team: 'PQD',
      players: 'PqD crown · deadz · thonny',
    },
    standings: [
      { rank: 1, team: 'PQD · PqD crown / deadz / thonny', prize: 400 },
      { rank: 2, team: 'BX team · O RATO / mazagão / Noyru', prize: 250 },
      { rank: 3, team: 'CDR · CDR YUKAMI / kauu1v4 / CDR THEUSS', prize: 150 },
    ],
    rules: [
      'Modo Reload Trio Zero Build, servidores BR',
      'Campeonato entre clãs — 13 equipes, 5 quedas',
      'Check-in obrigatório no Discord',
      'Proibido teaming e qualquer cheat',
    ],
  },
  {
    id: 'valentines-cup',
    name: 'Valentines Cup',
    status: 'open',
    format: 'Duo',
    mode: 'Misto',
    region: 'BR',
    startsAt: '2026-06-28T18:00:00-03:00',
    organizers: ['Cherry Girls', 'Rift League'],
    description:
      'Campeonato de Dia dos Namorados — competitivo e divertido, em comemoração ao Dia dos Namorados.',
    spotsLabel: 'Vagas limitadas',
    spots: { filled: 15, total: 40 },
    registrationFee: 10,
    prize: { total: 400 },
    sponsors: ['Cherry Girls', 'CDR', 'BX', 'PQD'],
    rules: [
      'Modo Duo Misto, servidores BR',
      'Inscrição de R$ 10 por dupla',
      'Vagas limitadas — inscrições abertas no Discord',
      'Parceria Cherry Girls × Rift League',
    ],
  },
];

// ---------- seletores ----------
export const getTournament = (id) => tournaments.find((t) => t.id === id);

export const getNextOpen = () => tournaments.find((t) => t.status === 'open');

export const getFinishedTournaments = () =>
  tournaments
    .filter((t) => t.status === 'finished')
    .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt));

const mapChampion = (t) => ({
  id: t.id,
  name: t.name,
  date: t.startsAt,
  format: t.format,
  prize: t.champion?.prizeLabel
    ? null
    : t.prize?.distribution?.find((d) => d.place === 1)?.amount ?? null,
  prizeLabel: t.champion?.prizeLabel ?? null,
  ...t.champion,
});

export const getAllChampions = () =>
  getFinishedTournaments()
    .filter((t) => t.champion)
    .map(mapChampion);

export const getRecentChampions = (limit = 3) =>
  getAllChampions().slice(0, limit);
