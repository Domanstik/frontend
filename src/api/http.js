// Два клиента: internal (.NET) и external (RPC).
// Авто-заголовки, единая обработка ошибок, ретрай 401 для external session_jwt.

import { tokenVault } from './tokenVault';

const BASE_INTERNAL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');
const BASE_EXTERNAL = (import.meta.env.VITE_EXT_API_URL || '').replace(/\/+$/, '');

async function request(base, path, { method = 'GET', headers, body } = {}) {
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const isForm = body instanceof FormData;

  const res = await fetch(url, {
    method,
    headers: {
      ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: isForm ? body : body != null ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json')
    ? await res.json()
    : await res.text().catch(() => null);

  if (!res.ok) {
    const err = new Error(
      (data && (data.message || data.error || data.title || data)) ||
        `HTTP ${res.status}`,
    );
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

// ------- INTERNAL (.NET) -------
export const internalHttp = {
  async get(path) {
    const t = tokenVault.getInternal();
    return request(BASE_INTERNAL, path, {
      method: 'GET',
      headers: t ? { Authorization: `Bearer ${t}` } : undefined,
    });
  },
  async post(path, body) {
    const t = tokenVault.getInternal();
    return request(BASE_INTERNAL, path, {
      method: 'POST',
      headers: t ? { Authorization: `Bearer ${t}` } : undefined,
      body,
    });
  },
  async put(path, body) {
    const t = tokenVault.getInternal();
    return request(BASE_INTERNAL, path, {
      method: 'PUT',
      headers: t ? { Authorization: `Bearer ${t}` } : undefined,
      body,
    });
  },
  async del(path) {
    const t = tokenVault.getInternal();
    return request(BASE_INTERNAL, path, {
      method: 'DELETE',
      headers: t ? { Authorization: `Bearer ${t}` } : undefined,
    });
  },
};

// ------- EXTERNAL (RPC) -------
async function externalWithSession(path, opts = {}, retryOnce = true) {
  const useSession = tokenVault.getExtSession();
  const headers = {
    ...(opts.headers || {}),
    ...(useSession ? { session_jwt: useSession } : {}),
  };

  try {
    return await request(BASE_EXTERNAL, path, { ...opts, headers });
  } catch (e) {
    // Если 401 — попробуем автоматически взять новый session_jwt через auth_jwt
    if (e.status === 401 && retryOnce) {
      await externalAuth.ensureSession();
      return externalWithSession(path, opts, /*retryOnce*/ false);
    }
    throw e;
  }
}

export const externalAuth = {
  async register({ pin, tg_id, phone, username }) {
    const res = await request(BASE_EXTERNAL, '/api/auth/reg', {
      method: 'POST',
      body: { pin, tg_id, phone, username },
    });
    if (res?.auth_jwt) tokenVault.setExtAuth(res.auth_jwt);
    return res;
  },
  async login() {
    const auth = tokenVault.getExtAuth();
    if (!auth) throw new Error('No auth_jwt. Call register or persist auth first.');
    const res = await request(BASE_EXTERNAL, '/api/auth/login', {
      method: 'POST',
      headers: { auth_jwt: auth },
    });
    if (res?.sessoin_jwt || res?.session_jwt) {
      tokenVault.setExtSession(res.sessoin_jwt || res.session_jwt);
    }
    return res;
  },
  async ensureSession() {
    if (!tokenVault.extSessionExpiresSoon()) return tokenVault.getExtSession();
    await this.login();
    return tokenVault.getExtSession();
  },
};

export const externalHttp = {
  // вызовы, требующие session_jwt (с авторизацией и авто-ретраем)
  get: (p) => externalWithSession(p, { method: 'POST' }), // RPC всё через POST; но getProfile/getRating — тела пустые
  post: (p, body) => externalWithSession(p, { method: 'POST', body }),
};
