/** Today's date as YYYY-MM-DD (local timezone) */
export function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Current time as HH:MM (24h, local) */
export function getNowTimeString() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function isPastDate(dateStr) {
  if (!dateStr) return false;
  return dateStr < getTodayString();
}

export function isPastDateTime(dateStr, timeStr) {
  if (!dateStr) return false;
  if (isPastDate(dateStr)) return true;
  if (dateStr === getTodayString() && timeStr) {
    return timeStr < getNowTimeString();
  }
  return false;
}
