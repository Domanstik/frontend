// Хранилище токенов вне Redux. Память + персистентность.
// Важно: токены не вытекают в стор/компоненты.

const LS_KEYS = {
  internal: 'auth/internal_jwt',
  extAuth: 'auth/ext_auth_jwt', // долгоживущий
  extSession: 'auth/ext_session_jwt', // короткий
};

let memory = {
  internal: null,
  extAuth: null,
  extSession: null,
};

function decodeJwt(token) {
  try {
    const part = token.split('.')[1];
    const json = decodeURIComponent(
      atob(part)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function getExp(token) {
  const p = decodeJwt(token);
  return p?.exp ? p.exp * 1000 : null;
}

export const tokenVault = {
  // internal (.NET)
  setInternal(token) {
    memory.internal = token || null;
    if (token) localStorage.setItem(LS_KEYS.internal, token);
    else localStorage.removeItem(LS_KEYS.internal);
  },
  getInternal() {
    if (!memory.internal) {
      const t = localStorage.getItem(LS_KEYS.internal);
      memory.internal = t || null;
    }
    return memory.internal;
  },
  clearInternal() {
    this.setInternal(null);
  },

  // external auth_jwt (вечный)
  setExtAuth(token) {
    memory.extAuth = token || null;
    if (token) localStorage.setItem(LS_KEYS.extAuth, token);
    else localStorage.removeItem(LS_KEYS.extAuth);
  },
  getExtAuth() {
    if (!memory.extAuth) {
      const t = localStorage.getItem(LS_KEYS.extAuth);
      memory.extAuth = t || null;
    }
    return memory.extAuth;
  },

  // external session_jwt (короткий)
  setExtSession(token) {
    memory.extSession = token || null;
    if (token) sessionStorage.setItem(LS_KEYS.extSession, token);
    else sessionStorage.removeItem(LS_KEYS.extSession);
  },
  getExtSession() {
    if (!memory.extSession) {
      const t = sessionStorage.getItem(LS_KEYS.extSession);
      memory.extSession = t || null;
    }
    return memory.extSession;
  },
  extSessionExpiresSoon(thresholdMs = 30_000) {
    const t = this.getExtSession();
    if (!t) return true;
    const exp = getExp(t);
    if (!exp) return false; // нет exp — считаем валидным
    return Date.now() + thresholdMs >= exp;
  },

  decodeJwt,
  getRoleFrom(token) {
    const p = decodeJwt(token) || {};
    return (
      p.role || p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null
    );
  },
  getIdentityFrom(token) {
    const p = decodeJwt(token);
    if (!p) return null;
    return {
      tgId:
        p['tg_id'] ||
        p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        p.sub ||
        null,
      username:
        p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || p.name || null,
    };
  },
};
