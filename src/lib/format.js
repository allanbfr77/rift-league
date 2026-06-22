// Helpers de formatação — centralizados pra manter consistência.

export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatVBucks(value) {
  if (value >= 1000 && value % 1000 === 0) return `${value / 1000}K V-Bucks`;
  return `${new Intl.NumberFormat('pt-BR').format(value)} V-Bucks`;
}

/** Formata prêmio conforme moeda do torneio (BRL ou V-Bucks). */
export function formatPrize(prize) {
  if (prize?.label) return prize.label;
  if (prize?.currency === 'vbucks') return formatVBucks(prize.total);
  return formatBRL(prize.total);
}

/** Formata um valor individual de prêmio (linha de classificação, etc.). */
export function formatPrizeAmount(amount, currency = 'brl') {
  if (currency === 'vbucks') return formatVBucks(amount);
  return formatBRL(amount);
}

export function formatDate(iso) {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'long' });
  const day = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  // capitaliza o dia da semana
  const wd = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${wd}, ${day}`;
}

export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
}
