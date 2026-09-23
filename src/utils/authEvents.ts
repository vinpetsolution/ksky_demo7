const AUTH_EVENT = "ksky-auth-changed";

export function emitAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
}

export function subscribeAuth(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(AUTH_EVENT, onStoreChange);
  return () => window.removeEventListener(AUTH_EVENT, onStoreChange);
}
