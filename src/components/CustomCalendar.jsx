import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getTodayStr() {
  const t = new Date();
  return toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
}

export default function CustomCalendar({ value, onChange, bookedDates = [], isDarkMode }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayStr = getTodayStr();

  // First day of the month (0=Sun..6=Sat), convert to Mon-based (0=Mon..6=Sun)
  const firstDayRaw = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const firstDay = (firstDayRaw + 6) % 7; // shift so Monday=0

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  // empty leading cells
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const accent = isDarkMode ? '#8b5cf6' : '#4f46e5';
  const accentGlow = isDarkMode ? 'rgba(139,92,246,0.35)' : 'rgba(79,70,229,0.2)';

  return (
    <div style={{ padding: '16px', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={prevMonth}
          style={{
            width: 36, height: 36, borderRadius: 12, border: 'none',
            background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            color: isDarkMode ? '#fff' : '#1e293b',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <span style={{
          fontWeight: 800, fontSize: 16,
          color: isDarkMode ? '#f8fafc' : '#1e293b',
          letterSpacing: '-0.02em'
        }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          style={{
            width: 36, height: 36, borderRadius: 12, border: 'none',
            background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            color: isDarkMode ? '#fff' : '#1e293b',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: 'center', fontSize: 10, fontWeight: 800,
            color: isDarkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 0'
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const isSelected = value === dateStr;
          const isBooked = bookedDates.includes(dateStr);
          const isPast = dateStr < todayStr;
          const isToday = dateStr === todayStr;
          const isDisabled = isBooked || isPast;

          let bg = 'transparent';
          let color = isDarkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)';
          let cursor = 'pointer';
          let textDecoration = 'none';
          let boxShadow = 'none';
          let opacity = 1;

          if (isSelected) {
            bg = accent;
            color = '#fff';
            boxShadow = `0 4px 16px ${accentGlow}`;
          } else if (isToday) {
            bg = isDarkMode ? 'rgba(139,92,246,0.25)' : 'rgba(79,70,229,0.15)';
            color = isDarkMode ? '#c4b5fd' : '#4f46e5';
          } else if (isDisabled) {
            color = isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)';
            textDecoration = 'line-through';
            cursor = 'not-allowed';
            opacity = 0.6;
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(dateStr)}
              style={{
                background: bg,
                color,
                border: 'none',
                borderRadius: 12,
                padding: '10px 4px',
                fontWeight: 700,
                fontSize: 13,
                cursor,
                textDecoration,
                boxShadow,
                opacity,
                transition: 'all 0.15s ease',
                outline: 'none',
              }}
              onMouseEnter={e => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.background = bg === accent ? accent : isToday ? (isDarkMode ? 'rgba(139,92,246,0.25)' : 'rgba(79,70,229,0.15)') : 'transparent';
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
