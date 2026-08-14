/**
 * Universelle Validierungs- und Bereinigungs-Utilities (Sanitization).
 * Schützt vor fehlerhaften Formulareingaben, ungültigen URLs, defekten E-Mails und XSS.
 */

/**
 * Prüft, ob ein String eine gültige Web-URL ist (http:// oder https://).
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Bereinigt eine URL und ergänzt fehlendes https:// falls nötig.
 * @param {string} url 
 * @returns {string}
 */
export const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  let trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * Prüft, ob eine E-Mail-Adresse ein valides Format besitzt.
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Bereinigt und formatiert eine Telefonnummer für Klick-to-Call (tel:).
 * Entfernt unnötige Leerzeichen, Schrägstriche und Bindestriche.
 * @param {string} phone 
 * @returns {string}
 */
export const sanitizePhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Prüft, ob ein Google Gemini API-Schlüssel das typische Format hat (AIzaSy...).
 * @param {string} key 
 * @returns {boolean}
 */
export const isValidGeminiApiKey = (key) => {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  return trimmed.startsWith('AIzaSy') && trimmed.length >= 35;
};

/**
 * Bereinigt String-Eingaben von gefährlichen HTML-Tags (einfacher XSS-Schutz).
 * @param {string} str 
 * @returns {string}
 */
export const sanitizeText = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validiert, ob eine Zahl innerhalb eines sinnvollen Bereichs liegt.
 * @param {number|string} val 
 * @param {number} min 
 * @param {number} max 
 * @param {number} fallback 
 * @returns {number}
 */
export const clampNumber = (val, min, max, fallback = min) => {
  const num = Number(val);
  if (isNaN(num)) return fallback;
  return Math.min(Math.max(num, min), max);
};
