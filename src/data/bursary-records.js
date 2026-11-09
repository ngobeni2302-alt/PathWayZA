const required = ['name', 'type', 'year', 'fields', 'coverage', 'eligibility', 'deadline', 'url'];
export function isBursaryDetails(value) {
  if (!value || !required.every(key => typeof value[key] === 'string' && value[key].trim())) return false;
  try { if (new URL(value.url).protocol !== 'https:') return false; } catch { return false; }
  for (const key of ['opens', 'closes']) {
    if (value[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(value[key]) ||
      !Number.isFinite(Date.parse(value[key])) || new Date(value[key]).toISOString().slice(0, 10) !== value[key])) return false;
  }
  return !(value.opens && value.closes && value.opens > value.closes);
}
export function mapBursaryRows(rows) {
  if (!Array.isArray(rows)) throw new Error('Invalid funding response');
  return rows.map(row => {
    if (!isBursaryDetails(row.details) || !/^\d{4}-\d{2}-\d{2}$/.test(row.reviewed_at || '')) {
      throw new Error('Invalid funding record');
    }
    return { ...row.details, id: row.id, reviewedAt: row.reviewed_at };
  });
}
export function southAfricaDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
}
