import { removeStorageKey } from '@/services/storageService';
import { getStorageKey, getRefreshTokenKey, getUserKey } from '@/constants/store-key';
import { emitAuthChanged } from '@/utils/authEvents';

export const AUTH_COOKIE_NAME = 'ksky_auth_active';

export const setAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; SameSite=Lax`;
  }
};

export const clearAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }
};

export const clearAllAuthData = () => {
  removeStorageKey({ key: getStorageKey() });
  clearAuthCookie();

  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(getRefreshTokenKey());
    sessionStorage.removeItem(getUserKey());
    sessionStorage.removeItem('token');
    localStorage.removeItem(getRefreshTokenKey());
    localStorage.removeItem(getUserKey());
    localStorage.removeItem(getStorageKey());
  }
  emitAuthChanged();
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const auth = sessionStorage.getItem(getStorageKey());
    if (auth) {
      const parsed = JSON.parse(auth);
      return parsed?.result?.token ?? null;
    }
  } catch {
    return null;
  }
  return null;
};
