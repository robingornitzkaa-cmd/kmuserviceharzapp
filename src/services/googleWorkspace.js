/**
 * Google Workspace (Calendar & Gmail) Live-Radar Service for Founder OS
 */

let tokenClient = null;
let googleAccessToken = null;

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/drive.file'
].join(' ');

/**
 * Lädt Google Identity Services (GIS) und GAPI Skripte
 */
export const loadGoogleApiScripts = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(false);

    if (window.google?.accounts?.oauth2) {
      return resolve(true);
    }

    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => resolve(true);
    gisScript.onerror = () => reject(new Error('Google Identity Services Skript konnte nicht geladen werden.'));
    document.body.appendChild(gisScript);
  });
};

/**
 * Initialisiert den Google OAuth2 Token Client
 */
export const initTokenClient = (clientId, onTokenReceived, onError) => {
  if (typeof window === 'undefined' || !window.google?.accounts?.oauth2) {
    if (onError) onError(new Error('Google Identity Services Bibliothek ist nicht initialisiert.'));
    return null;
  }

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES,
    callback: (tokenResponse) => {
      if (tokenResponse.error !== undefined) {
        if (onError) onError(tokenResponse);
        return;
      }
      googleAccessToken = tokenResponse.access_token;
      sessionStorage.setItem('f_google_access_token', googleAccessToken);
      localStorage.setItem('f_google_connected', 'true');
      if (onTokenReceived) onTokenReceived(googleAccessToken);
    },
  });

  return tokenClient;
};

/**
 * Fordert einen Google Access Token an
 */
export const getGoogleAccessToken = (clientId) => {
  return new Promise((resolve, reject) => {
    if (googleAccessToken) {
      resolve(googleAccessToken);
      return;
    }

    const savedToken = sessionStorage.getItem('f_google_access_token');
    if (savedToken) {
      googleAccessToken = savedToken;
      resolve(googleAccessToken);
      return;
    }

    if (!tokenClient && clientId) {
      initTokenClient(
        clientId,
        (token) => resolve(token),
        (err) => reject(err)
      );
    }

    if (tokenClient) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      reject(new Error('OAuth Token Client konnte nicht initialisiert werden. Bitte Client-ID angeben.'));
    }
  });
};

/**
 * Ruft anstehende Google-Kalender-Termine für heute und die nächsten 7 Tage ab
 */
export const fetchGoogleCalendarEvents = async (token) => {
  if (!token) throw new Error('Kein Google Access Token vorhanden.');

  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&maxResults=20`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Google Calendar API Fehler: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const items = data.items || [];

  return items.map(ev => {
    const startStr = ev.start?.dateTime || ev.start?.date || '';
    const endStr = ev.end?.dateTime || ev.end?.date || '';
    const startDate = new Date(startStr);
    
    // Formatierte Zeit
    const hours = String(startDate.getHours()).padStart(2, '0');
    const mins = String(startDate.getMinutes()).padStart(2, '0');
    const timeFormatted = isNaN(startDate.getTime()) ? 'Ganztägig' : `${hours}:${mins}`;
    const dateFormatted = startStr.split('T')[0] || '';

    return {
      id: ev.id,
      title: ev.summary || '(Kein Titel)',
      description: ev.description || '',
      location: ev.location || '',
      start: startStr,
      end: endStr,
      date: dateFormatted,
      time: timeFormatted,
      isGoogle: true,
      htmlLink: ev.htmlLink
    };
  });
};

/**
 * Ruft die neuesten ungelesenen E-Mails aus Gmail ab
 */
export const fetchUnreadGmailMessages = async (token) => {
  if (!token) throw new Error('Kein Google Access Token vorhanden.');

  // 1. Liste ungelesener Messages abrufen
  const listUrl = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=5';
  const listRes = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!listRes.ok) {
    throw new Error(`Gmail API Fehler: ${listRes.status} ${listRes.statusText}`);
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  if (messages.length === 0) {
    return [];
  }

  // 2. Details für jede Mail abrufen
  const emailDetails = [];
  for (const msg of messages) {
    try {
      const detailUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`;
      const detailRes = await fetch(detailUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (detailRes.ok) {
        const d = await detailRes.json();
        const headers = d.payload?.headers || [];
        const subjectHeader = headers.find(h => h.name.toLowerCase() === 'subject');
        const fromHeader = headers.find(h => h.name.toLowerCase() === 'from');
        const dateHeader = headers.find(h => h.name.toLowerCase() === 'date');

        emailDetails.push({
          id: d.id,
          threadId: d.threadId,
          subject: subjectHeader ? subjectHeader.value : '(Kein Betreff)',
          from: fromHeader ? fromHeader.value : 'Unbekannter Absender',
          date: dateHeader ? dateHeader.value : '',
          snippet: d.snippet || '',
          unread: true
        });
      }
    } catch {
      // Einzelne Mail überspringen
    }
  }

  return emailDetails;
};

/**
 * Beendet die Google-Sitzung
 */
export const logoutGoogle = () => {
  googleAccessToken = null;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('f_google_access_token');
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('f_google_connected', 'false');
  }
};
