import type { AuthResponse } from "@/types";
import { getStorageKey, saveStorageKey } from "@/services/storageService";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";
import { setAuthCookie } from "@/utils/auth";
import { emitAuthChanged } from "@/utils/authEvents";

let cachedRaw: string | null | undefined;
let cachedUser: AuthResponse | undefined;

export function getAuthSnapshot(): AuthResponse | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const auth = getStorageKey({ key: getStorageKeyName() });
    if (auth === cachedRaw) {
      return cachedUser;
    }
    cachedRaw = auth;
    if (!auth) {
      cachedUser = undefined;
      return undefined;
    }
    cachedUser = JSON.parse(auth) as AuthResponse;
    return cachedUser;
  } catch {
    cachedRaw = null;
    cachedUser = undefined;
    return undefined;
  }
}

export function persistDemoSession(response: AuthResponse) {
  const raw = JSON.stringify(response);
  saveStorageKey({
    key: getStorageKeyName(),
    data: raw,
  });
  cachedRaw = raw;
  cachedUser = response;
  setAuthCookie();
  emitAuthChanged();
}
