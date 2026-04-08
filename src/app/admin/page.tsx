'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RSVPEntry {
  guestCode: string;
  fullName: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  guestNames: string;
  dietary: string;
  needsAccommodation: boolean;
  accommodationType: string;
  message: string;
  submittedAt: string;
}

interface Stats {
  totalResponses: number;
  attendingCount: number;
  notAttendingCount: number;
  totalGuests: number;
  accommodationRequests: number;
}

type FilterValue = 'all' | 'attending' | 'not-attending' | 'accommodation';
type SortField = 'name' | 'date';
type SortDir = 'asc' | 'desc';

// ─── Auth Gate ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'admin_auth';

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/rsvps?code=${encodeURIComponent(code)}`);
      if (res.status === 401) {
        setError('Incorrect code. Please try again.');
        setCode('');
      } else if (res.ok) {
        sessionStorage.setItem(STORAGE_KEY, code);
        onAuth();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0f' }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,160,160,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="glass-panel w-full max-w-sm p-10 relative">
        {/* Rose accent line at top */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #D4A0A0, transparent)' }}
        />

        <div className="text-center mb-8">
          <p
            className="section-kicker mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem' }}
          >
            Admin Access
          </p>
          <h1
            className="font-display text-2xl font-light glow-heading"
            style={{ color: '#f8f8f8', letterSpacing: '-0.01em' }}
          >
            RSVP Dashboard
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Nikita &amp; Daniel — 3 October 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-code"
              className="block text-xs mb-2"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Admin Code
            </label>
            <input
              id="admin-code"
              type="password"
              className="form-input-dark"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              autoFocus
              disabled={loading}
            />
          </div>

          {error && (
            <p
              className="text-sm text-center"
              style={{ color: '#D4A0A0', fontFamily: 'DM Sans, sans-serif' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={loading || !code.trim()}
            style={loading || !code.trim() ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span
                  className="inline-block w-4 h-4 border border-current border-t-transparent rounded-full"
                  style={{ animation: 'spin 0.7s linear infinite' }}
                />
                Verifying…
              </span>
            ) : (
              'Enter Dashboard'
            )}
          </button>
        </form>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'rose' | 'sage' | 'mauve' | 'default';
}) {
  const accentColor =
    accent === 'rose'
      ? '#D4A0A0'
      : accent === 'sage'
        ? '#A8C5B0'
        : accent === 'mauve'
          ? '#C9B8D4'
          : 'rgba(255,255,255,0.6)';

  return (
    <div className="glass-card p-6 flex flex-col gap-1 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}55, transparent)`,
        }}
      />
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'DM Sans, sans-serif' }}
      >
        {label}
      </p>
      <p
        className="font-display text-4xl font-light mt-1"
        style={{ color: accentColor, lineHeight: 1 }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-xs mt-1"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

function Badge({ attending }: { attending: 'yes' | 'no' }) {
  const isYes = attending === 'yes';
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm"
      style={{
        background: isYes ? 'rgba(168,197,176,0.15)' : 'rgba(212,160,160,0.15)',
        color: isYes ? '#A8C5B0' : '#D4A0A0',
        border: `1px solid ${isYes ? 'rgba(168,197,176,0.25)' : 'rgba(212,160,160,0.25)'}`,
        fontFamily: 'DM Sans, sans-serif',
        borderRadius: '2px',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: isYes ? '#A8C5B0' : '#D4A0A0' }}
      />
      {isYes ? 'Attending' : 'Not Attending'}
    </span>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

function Dashboard({ adminCode }: { adminCode: string }) {
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/rsvps', {
        headers: { 'x-admin-code': adminCode },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = (await res.json()) as { rsvps: RSVPEntry[]; stats: Stats };
      setRsvps(data.rsvps);
      setStats(data.stats);
    } catch {
      setError('Could not load RSVP data. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [adminCode]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // ── Filtered + sorted rows ──────────────────────────────────────────────────
  const rows = useMemo(() => {
    let list = [...rsvps];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.guestNames.toLowerCase().includes(q)
      );
    }

    if (filter === 'attending') list = list.filter((r) => r.attending === 'yes');
    if (filter === 'not-attending') list = list.filter((r) => r.attending === 'no');
    if (filter === 'accommodation') list = list.filter((r) => r.needsAccommodation);

    list.sort((a, b) => {
      if (sortField === 'name') {
        const cmp = a.fullName.localeCompare(b.fullName);
        return sortDir === 'asc' ? cmp : -cmp;
      }
      const cmp = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [rsvps, search, filter, sortField, sortDir]);

  // ── Accommodation summary ───────────────────────────────────────────────────
  const accommodationSummary = useMemo(() => {
    const needs = rsvps.filter((r) => r.needsAccommodation);
    const byType: Record<string, RSVPEntry[]> = {};
    for (const r of needs) {
      const key = r.accommodationType || 'Not specified';
      if (!byType[key]) byType[key] = [];
      byType[key].push(r);
    }
    return byType;
  }, [rsvps]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-ZA', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span
      style={{ opacity: sortField === field ? 1 : 0.3, fontSize: '0.65rem', marginLeft: '4px' }}
    >
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0a0a0f' }}
      >
        <div className="text-center">
          <div
            className="w-8 h-8 border border-bloom border-t-transparent rounded-full mx-auto mb-4"
            style={{
              animation: 'spin 0.8s linear infinite',
              borderColor: '#D4A0A0',
              borderTopColor: 'transparent',
            }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
            }}
          >
            Loading RSVPs…
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,160,160,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Header bar */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: 'rgba(10,10,15,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p
                className="section-kicker"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem' }}
              >
                Admin
              </p>
              <h1
                className="font-display text-lg font-light"
                style={{ color: '#f8f8f8', lineHeight: 1.2 }}
              >
                RSVP Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p
              className="text-xs hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Nikita &amp; Daniel · 3 Oct 2026
            </p>
            <button
              onClick={() => void fetchData()}
              className="btn-ghost-dark text-xs py-2 px-4"
              style={{ fontSize: '0.78rem' }}
            >
              Refresh
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }}
              className="text-xs"
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'DM Sans, sans-serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {error && (
          <div
            className="glass-card px-6 py-4 text-sm text-center"
            style={{ color: '#D4A0A0', fontFamily: 'DM Sans, sans-serif' }}
          >
            {error}
          </div>
        )}

        {/* ── Summary cards ──────────────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Responses" value={stats.totalResponses} accent="default" />
            <StatCard
              label="Attending"
              value={stats.attendingCount}
              sub={
                stats.totalResponses > 0
                  ? `${Math.round((stats.attendingCount / stats.totalResponses) * 100)}% of responses`
                  : undefined
              }
              accent="sage"
            />
            <StatCard label="Not Attending" value={stats.notAttendingCount} accent="rose" />
            <StatCard
              label="Total Guests"
              value={stats.totalGuests}
              sub={`${stats.accommodationRequests} need accommodation`}
              accent="mauve"
            />
          </div>
        )}

        {/* ── Filter + search ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input-dark flex-1"
            style={{ maxWidth: '360px' }}
          />

          <div className="flex gap-2 flex-wrap">
            {(
              [
                ['all', 'All'],
                ['attending', 'Attending'],
                ['not-attending', 'Not Attending'],
                ['accommodation', 'Needs Accommodation'],
              ] as [FilterValue, string][]
            ).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className="text-xs px-3 py-2 rounded-sm transition-all duration-200"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  background: filter === val ? 'rgba(212,160,160,0.18)' : 'rgba(255,255,255,0.05)',
                  color: filter === val ? '#D4A0A0' : 'rgba(255,255,255,0.5)',
                  border:
                    filter === val
                      ? '1px solid rgba(212,160,160,0.35)'
                      : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── RSVP Table ──────────────────────────────────────────────────── */}
        <div className="glass-card overflow-hidden">
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h2
              className="font-display text-base font-light"
              style={{ color: '#f8f8f8', letterSpacing: '-0.01em' }}
            >
              Responses
            </h2>
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
            >
              {rows.length} of {rsvps.length} shown
            </p>
          </div>

          {/* Horizontal scroll wrapper */}
          <div className="overflow-x-auto">
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {[
                    { label: 'Name', sortable: true, field: 'name' as SortField },
                    { label: 'Status', sortable: false },
                    { label: 'Guests', sortable: false },
                    { label: 'Guest Names', sortable: false },
                    { label: 'Dietary', sortable: false },
                    { label: 'Accommodation', sortable: false },
                    { label: 'Submitted', sortable: true, field: 'date' as SortField },
                  ].map((col) => (
                    <th
                      key={col.label}
                      onClick={col.sortable ? () => toggleSort(col.field!) : undefined}
                      style={{
                        padding: '0.75rem 1.25rem',
                        textAlign: 'left',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.35)',
                        fontWeight: 500,
                        cursor: col.sortable ? 'pointer' : 'default',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                      }}
                    >
                      {col.label}
                      {col.sortable && <SortIcon field={col.field!} />}
                    </th>
                  ))}
                  <th
                    style={{
                      padding: '0.75rem 1.25rem',
                      textAlign: 'left',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.35)',
                      fontWeight: 500,
                    }}
                  >
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.25)',
                        fontSize: '0.875rem',
                      }}
                    >
                      No responses match your search.
                    </td>
                  </tr>
                ) : (
                  rows.map((rsvp, i) => {
                    const isExpanded = expanded === rsvp.guestCode;
                    return (
                      <React.Fragment key={rsvp.guestCode}>
                        <tr
                          onClick={() => setExpanded(isExpanded ? null : rsvp.guestCode)}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.background =
                              'rgba(212,160,160,0.05)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.background =
                              i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent';
                          }}
                        >
                          {/* Name */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: '#f8f8f8',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span>{rsvp.fullName}</span>
                            <br />
                            <span
                              style={{
                                color: 'rgba(255,255,255,0.35)',
                                fontSize: '0.75rem',
                                fontWeight: 400,
                              }}
                            >
                              {rsvp.email}
                            </span>
                          </td>

                          {/* Status badge */}
                          <td style={{ padding: '0.875rem 1.25rem', whiteSpace: 'nowrap' }}>
                            <Badge attending={rsvp.attending} />
                          </td>

                          {/* Guest count */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: '0.875rem',
                              textAlign: 'center',
                            }}
                          >
                            {rsvp.attending === 'yes' ? rsvp.guestCount : '—'}
                          </td>

                          {/* Guest names */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: '0.8rem',
                              maxWidth: '180px',
                            }}
                          >
                            <span
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {rsvp.guestNames || '—'}
                            </span>
                          </td>

                          {/* Dietary */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: '0.8rem',
                              maxWidth: '160px',
                            }}
                          >
                            <span
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {rsvp.dietary || '—'}
                            </span>
                          </td>

                          {/* Accommodation */}
                          <td style={{ padding: '0.875rem 1.25rem', whiteSpace: 'nowrap' }}>
                            {rsvp.needsAccommodation ? (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  flexDirection: 'column',
                                  gap: '2px',
                                }}
                              >
                                <span
                                  style={{
                                    color: '#C9B8D4',
                                    fontSize: '0.75rem',
                                    background: 'rgba(201,184,212,0.12)',
                                    border: '1px solid rgba(201,184,212,0.22)',
                                    padding: '2px 8px',
                                    borderRadius: '2px',
                                  }}
                                >
                                  Yes
                                </span>
                                {rsvp.accommodationType && (
                                  <span
                                    style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}
                                  >
                                    {rsvp.accommodationType}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
                                No
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: 'rgba(255,255,255,0.4)',
                              fontSize: '0.75rem',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatDate(rsvp.submittedAt)}
                          </td>

                          {/* Message preview */}
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              color: 'rgba(255,255,255,0.45)',
                              fontSize: '0.78rem',
                              maxWidth: '200px',
                            }}
                          >
                            {rsvp.message ? (
                              <span
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  fontStyle: 'italic',
                                }}
                              >
                                &ldquo;{rsvp.message}&rdquo;
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>
                        </tr>

                        {/* Expanded detail row */}
                        {isExpanded && (
                          <tr>
                            <td
                              colSpan={8}
                              style={{
                                background: 'rgba(212,160,160,0.04)',
                                borderBottom: '1px solid rgba(212,160,160,0.12)',
                                padding: '1.25rem 1.5rem',
                              }}
                            >
                              <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                              >
                                <div>
                                  <p
                                    style={{
                                      fontSize: '0.65rem',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.1em',
                                      color: 'rgba(255,255,255,0.3)',
                                      marginBottom: '4px',
                                    }}
                                  >
                                    Phone
                                  </p>
                                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {rsvp.phone || '—'}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      fontSize: '0.65rem',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.1em',
                                      color: 'rgba(255,255,255,0.3)',
                                      marginBottom: '4px',
                                    }}
                                  >
                                    Guest Code
                                  </p>
                                  <p
                                    style={{
                                      color: 'rgba(255,255,255,0.7)',
                                      fontFamily: 'monospace',
                                      fontSize: '0.82rem',
                                    }}
                                  >
                                    {rsvp.guestCode}
                                  </p>
                                </div>
                                {rsvp.message && (
                                  <div className="sm:col-span-2">
                                    <p
                                      style={{
                                        fontSize: '0.65rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        color: 'rgba(255,255,255,0.3)',
                                        marginBottom: '4px',
                                      }}
                                    >
                                      Full Message
                                    </p>
                                    <p
                                      style={{
                                        color: 'rgba(255,255,255,0.65)',
                                        fontStyle: 'italic',
                                        lineHeight: 1.6,
                                      }}
                                    >
                                      &ldquo;{rsvp.message}&rdquo;
                                    </p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Accommodation Summary ───────────────────────────────────────── */}
        {Object.keys(accommodationSummary).length > 0 && (
          <div>
            <h2
              className="font-display text-xl font-light mb-4"
              style={{ color: '#f8f8f8', letterSpacing: '-0.01em' }}
            >
              Accommodation Requests
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(accommodationSummary).map(([type, guests]) => (
                <div key={type} className="glass-card p-5 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background:
                        'linear-gradient(to right, transparent, rgba(201,184,212,0.5), transparent)',
                    }}
                  />
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-display text-base font-light" style={{ color: '#C9B8D4' }}>
                      {type}
                    </p>
                    <span className="font-display text-2xl font-light" style={{ color: '#C9B8D4' }}>
                      {guests.length}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {guests.map((g) => (
                      <li
                        key={g.guestCode}
                        className="text-sm flex items-center gap-2"
                        style={{
                          color: 'rgba(255,255,255,0.55)',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'rgba(201,184,212,0.5)' }}
                        />
                        {g.fullName}
                        {g.guestCount > 1 && (
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                            ({g.guestCount} guests)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className="text-center py-6"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.75rem',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Nikita &amp; Daniel — 3 October 2026 · Featherwood Farm
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check sessionStorage for persisted admin session
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdminCode(stored);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0a0a0f' }}
      />
    );
  }

  if (!adminCode) {
    return <AuthGate onAuth={() => setAdminCode(sessionStorage.getItem(STORAGE_KEY) ?? '1234')} />;
  }

  return <Dashboard adminCode={adminCode} />;
}
