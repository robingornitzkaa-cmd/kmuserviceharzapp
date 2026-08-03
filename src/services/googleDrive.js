/**
 * Google Drive REST API Live-Sync Service for Founder OS
 */

let tokenClient = null;
let googleAccessToken = null;

/**
 * Loads the Google API client script and Google Identity Services script.
 */
export const loadGoogleApiScripts = () => {
  return new Promise((resolve, reject) => {
    // 1. Load GAPI (Google API client library)
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => {
      // 2. Load GIS (Google Identity Services)
      const gisScript = document.createElement('script');
      gisScript.src = 'https://accounts.google.com/gsi/client';
      gisScript.async = true;
      gisScript.defer = true;
      gisScript.onload = () => {
        resolve(true);
      };
      gisScript.onerror = () => reject(new Error('GIS Script konnte nicht geladen werden.'));
      document.body.appendChild(gisScript);
    };
    gapiScript.onerror = () => reject(new Error('GAPI Script konnte nicht geladen werden.'));
    document.body.appendChild(gapiScript);
  });
};

/**
 * Initializes the OAuth2 Token Client.
 */
export const initTokenClient = (clientId, onTokenReceived, onError) => {
  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    if (onError) onError(new Error('Google Identity Services Bibliothek ist nicht initialisiert.'));
    return null;
  }

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (tokenResponse) => {
      if (tokenResponse.error !== undefined) {
        if (onError) onError(tokenResponse);
        return;
      }
      googleAccessToken = tokenResponse.access_token;
      // Session storage to keep login token alive during session
      sessionStorage.setItem('f_google_access_token', googleAccessToken);
      if (onTokenReceived) onTokenReceived(googleAccessToken);
    },
  });

  return tokenClient;
};

/**
 * Requests the Google OAuth token.
 */
export const getAccessToken = (clientId) => {
  return new Promise((resolve, reject) => {
    // Check if token already in memory
    if (googleAccessToken) {
      resolve(googleAccessToken);
      return;
    }
    
    // Check sessionStorage
    const savedToken = sessionStorage.getItem('f_google_access_token');
    if (savedToken) {
      googleAccessToken = savedToken;
      resolve(googleAccessToken);
      return;
    }

    if (!tokenClient) {
      initTokenClient(
        clientId, 
        (token) => resolve(token),
        (err) => reject(err)
      );
    }

    if (tokenClient) {
      // Trigger OAuth2 Popup
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      reject(new Error('OAuth Token Client konnte nicht initialisiert werden.'));
    }
  });
};

/**
 * Helper to check response and handle errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API Fehler (${response.status}): ${errorText}`);
  }
  return response.json();
};

/**
 * Searches for a folder by name in Google Drive.
 */
export const getFolderId = async (token, folderName) => {
  const query = encodeURIComponent(`mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`);
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id)`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const data = await handleResponse(response);
  return data.files && data.files.length > 0 ? data.files[0].id : null;
};

/**
 * Creates a folder in Google Drive.
 */
export const createFolder = async (token, folderName) => {
  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      })
    }
  );
  const data = await handleResponse(response);
  return data.id;
};

/**
 * Searches for a file inside a parent folder in Google Drive.
 */
export const getFileId = async (token, fileName, parentId) => {
  const query = encodeURIComponent(`name = '${fileName}' and '${parentId}' in parents and trashed = false`);
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id)`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const data = await handleResponse(response);
  return data.files && data.files.length > 0 ? data.files[0].id : null;
};

/**
 * Uploads a new text file to Google Drive.
 */
export const uploadFile = async (token, fileName, content, parentId) => {
  // 1. Create file metadata
  const metadataResponse = await fetch(
    'https://www.googleapis.com/drive/v3/files',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fileName,
        parents: [parentId],
        mimeType: 'text/plain'
      })
    }
  );
  const metadata = await handleResponse(metadataResponse);
  const fileId = metadata.id;

  // 2. Upload content
  await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: content
    }
  );

  return fileId;
};

/**
 * Updates an existing file in Google Drive.
 */
export const updateFile = async (token, fileId, content) => {
  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: content
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API Upload Fehler (${response.status}): ${errorText}`);
  }
  return fileId;
};

/**
 * Downloads all text files from a folder in Google Drive.
 */
export const downloadAllDocsFromDrive = async (token, folderName) => {
  const folderId = await getFolderId(token, folderName);
  if (!folderId) {
    throw new Error(`Projektordner "${folderName}" wurde in Google Drive nicht gefunden.`);
  }

  const query = encodeURIComponent(`'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`);
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const data = await handleResponse(response);
  const driveFiles = data.files || [];

  const downloadedDocs = [];
  for (const file of driveFiles) {
    const contentResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    let textContent = '';
    if (contentResponse.ok) {
      textContent = await contentResponse.text();
    }
    downloadedDocs.push({
      id: 'gdrive_' + file.id,
      title: file.name,
      content: textContent,
      status: 'synced',
      url: '#'
    });
  }

  return downloadedDocs;
};
