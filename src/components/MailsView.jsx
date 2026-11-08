import React, { useState } from 'react';
import { 
  Mail, 
  ExternalLink, 
  CheckCheck, 
  RefreshCw, 
  Search, 
  Plus, 
  Clock, 
  User, 
  Inbox,
  Filter,
  Sparkles
} from 'lucide-react';

export const MailsView = ({
  gmailMessages = [],
  setGmailMessages,
  googleAccounts = [],
  handleAddGoogleAccount,
  handleRemoveGoogleAccount,
  isConnectingGoogle,
  triggerGoogleSync,
  isGoogleSyncing,
  googleSyncLogs = [],
  onMarkMailAsRead,
  selectedGmailAccount = 'all',
  setSelectedGmailAccount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [markingIds, setMarkingIds] = useState(new Set());

  // Search and filter logic
  const filteredMails = gmailMessages.filter(mail => {
    // Account filter
    if (selectedGmailAccount !== 'all' && mail.accountEmail !== selectedGmailAccount) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchFrom = (mail.from || '').toLowerCase().includes(q);
      const matchSubject = (mail.subject || '').toLowerCase().includes(q);
      const matchSnippet = (mail.snippet || '').toLowerCase().includes(q);
      return matchFrom || matchSubject || matchSnippet;
    }
    return true;
  });

  const handleMarkAsReadClick = async (mail) => {
    if (markingIds.has(mail.id)) return;
    setMarkingIds(prev => new Set(prev).add(mail.id));

    try {
      if (onMarkMailAsRead) {
        await onMarkMailAsRead(mail.id, mail.accountEmail);
      } else {
        // Fallback: aus der lokalen Liste entfernen
        setGmailMessages(prev => prev.filter(m => m.id !== mail.id));
      }
    } finally {
      setMarkingIds(prev => {
        const next = new Set(prev);
        next.delete(mail.id);
        return next;
      });
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
              <Mail size={26} style={{ color: '#ef4444' }} />
              <span>Gmail Posteingangs-Cockpit</span>
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
              Zentrale Übersicht ungelesener E-Mails über alle verknüpften Google-Konten
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              padding: '0.25rem 0.65rem', 
              borderRadius: '1rem', 
              background: gmailMessages.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)', 
              color: gmailMessages.length > 0 ? '#f87171' : '#34d399', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Inbox size={14} /> {gmailMessages.length} ungelesen
            </span>

            <button
              type="button"
              onClick={triggerGoogleSync}
              className="btn btn-secondary"
              disabled={isGoogleSyncing}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.45rem 0.8rem' }}
              title="Posteingänge aller Konten synchronisieren"
            >
              <RefreshCw size={14} className={isGoogleSyncing ? 'spin' : ''} />
              <span>{isGoogleSyncing ? 'Prüfe Mails...' : 'Jetzt abrufen'}</span>
            </button>
          </div>
        </div>

        {/* Multi-Account Bar */}
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Postfächer:</span>
            {googleAccounts.map((acc, idx) => {
              const badgeColor = idx === 0 ? 'var(--accent-cyan)' : idx === 1 ? 'var(--accent-purple)' : '#f59e0b';
              const mailCount = gmailMessages.filter(m => m.accountEmail === acc.email).length;

              return (
                <span 
                  key={acc.email} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.3rem', 
                    fontSize: '0.72rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '1rem', 
                    background: 'rgba(255,255,255,0.04)', 
                    border: `1px solid ${badgeColor}`,
                    color: '#ffffff'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badgeColor }}></span>
                  <span>{acc.email}</span>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '0 0.35rem', borderRadius: '0.5rem' }}>
                    {mailCount}
                  </span>
                  {handleRemoveGoogleAccount && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGoogleAccount(acc.email)}
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.8rem', marginLeft: '0.2rem' }}
                      title={`${acc.email} trennen`}
                    >
                      ×
                    </button>
                  )}
                </span>
              );
            })}

            <button
              type="button"
              onClick={handleAddGoogleAccount}
              className="btn btn-secondary"
              style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              disabled={isConnectingGoogle}
            >
              <Plus size={12} /> {googleAccounts.length === 0 ? 'Google verbinden' : 'Konto +'}
            </button>
          </div>

          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <ExternalLink size={12} /> Zu Gmail (Web)
          </a>
        </div>

        {googleSyncLogs.length > 0 && (
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', padding: '0.4rem 0.6rem', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '0.68rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', maxHeight: '80px', overflowY: 'auto' }}>
            {googleSyncLogs.map((log, i) => (
              <div key={i} style={{ color: log.includes('✅') ? 'var(--accent-green)' : 'var(--text-secondary)' }}>{log}</div>
            ))}
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          {/* Account Filter Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.25rem' }}>
              <Filter size={13} /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedGmailAccount('all')}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '0.35rem',
                border: selectedGmailAccount === 'all' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                background: selectedGmailAccount === 'all' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: selectedGmailAccount === 'all' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Alle Postfächer ({gmailMessages.length})
            </button>

            {googleAccounts.map(acc => {
              const count = gmailMessages.filter(m => m.accountEmail === acc.email).length;
              const isSel = selectedGmailAccount === acc.email;
              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => setSelectedGmailAccount(acc.email)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '0.35rem',
                    border: isSel ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                    background: isSel ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                    color: isSel ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {acc.email.split('@')[0]} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div style={{ position: 'relative', minWidth: '240px', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Mails durchsuchen (Absender, Betreff)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', height: '36px', paddingLeft: '2.2rem', fontSize: '0.8rem' }}
            />
          </div>
        </div>
      </div>

      {/* Message List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredMails.map(mail => {
          const accIdx = googleAccounts.findIndex(a => a.email === mail.accountEmail);
          const badgeColor = accIdx === 0 ? 'var(--accent-cyan)' : accIdx === 1 ? 'var(--accent-purple)' : '#f59e0b';
          const isMarking = markingIds.has(mail.id);
          const mailUrl = `https://mail.google.com/mail/u/0/#inbox/${mail.id}`;

          return (
            <div
              key={mail.id}
              className="card"
              style={{
                padding: '1rem 1.25rem',
                borderLeft: `4px solid ${badgeColor}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                {/* Meta row: Sender, Account, Date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <User size={13} /> {mail.from}
                    </span>
                    {mail.accountEmail && (
                      <span style={{ 
                        fontSize: '0.62rem', 
                        padding: '0.05rem 0.35rem', 
                        borderRadius: '0.25rem', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: `1px solid ${badgeColor}`, 
                        color: badgeColor, 
                        fontWeight: 600 
                      }} title={`Empfangen auf: ${mail.accountEmail}`}>
                        {mail.accountEmail.split('@')[0]}
                      </span>
                    )}
                  </div>

                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {mail.date ? new Date(mail.date).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>

                {/* Subject */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.15rem 0 0.35rem 0', wordBreak: 'break-word' }}>
                  {mail.subject || '(Kein Betreff)'}
                </h3>

                {/* Snippet body */}
                {mail.snippet && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45, wordBreak: 'break-word' }}>
                    {mail.snippet}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
                <a
                  href={mailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}
                  title="In Gmail öffnen"
                >
                  <ExternalLink size={12} /> In Gmail öffnen
                </a>

                <button
                  type="button"
                  onClick={() => handleMarkAsReadClick(mail)}
                  className="btn btn-secondary"
                  disabled={isMarking}
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap', color: 'var(--accent-green)' }}
                  title="Als gelesen markieren"
                >
                  <CheckCheck size={12} /> {isMarking ? 'Markiere...' : 'Als gelesen'}
                </button>
              </div>
            </div>
          );
        })}

        {filteredMails.length === 0 && (
          <div className="card" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
            <Inbox size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {searchQuery.trim() ? 'Keine Mails für diese Suche gefunden' : '🎉 Posteingang aufgeräumt!'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
              {searchQuery.trim() 
                ? `Keine Nachrichten stimmen mit "${searchQuery}" überein.` 
                : 'Aktuell liegen keine ungelesenen E-Mails in deinen verknüpften Postfächern vor.'}
            </p>
            <button
              type="button"
              onClick={triggerGoogleSync}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
            >
              <RefreshCw size={13} /> Jetzt neu prüfen
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
