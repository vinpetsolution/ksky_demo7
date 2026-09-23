'use client';

import {
  PropsWithChildren,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { AuthResponse } from '@/types';
import { clearAllAuthData } from '@/utils/auth';
import {
  getAuthSnapshot,
  persistDemoSession,
} from '@/utils/demoSession';
import { subscribeAuth } from '@/utils/authEvents';

type Props = PropsWithChildren<object>;

interface UserContextType {
  loadingUser: boolean;
  currentUser: AuthResponse | undefined;
  setCurrentUser: (user: AuthResponse | undefined) => void;
  sendJsonMessage: (type: string, data?: unknown) => void;
  isWebSocketOpen: boolean;
  isConnectionUnstable: boolean;
  lastJsonMessage: unknown;
  connectionId: string | null;
  refetchUserInfo: (userName?: string) => Promise<void>;
  jwtToken: string | null;
  triggerReconnect: () => void;
  isPlayingGame: boolean;
  setIsPlayingGame: (playing: boolean) => void;
}

const noop = () => {};
const noopAsync = async () => {};

const getServerAuthSnapshot = (): AuthResponse | undefined => undefined;

const initialUserContext: UserContextType = {
  loadingUser: false,
  currentUser: undefined,
  setCurrentUser: noop,
  sendJsonMessage: noop,
  isWebSocketOpen: false,
  isConnectionUnstable: false,
  lastJsonMessage: null,
  connectionId: null,
  refetchUserInfo: noopAsync,
  jwtToken: null,
  triggerReconnect: noop,
  isPlayingGame: false,
  setIsPlayingGame: noop,
};

const UserContext = createContext<UserContextType>(initialUserContext);

export function UserProvider({ children }: Props) {
  const currentUser = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );

  const setCurrentUser = useCallback((user: AuthResponse | undefined) => {
    if (!user) {
      clearAllAuthData();
      return;
    }
    persistDemoSession(user);
  }, []);

  const value = useMemo<UserContextType>(
    () => ({
      loadingUser: false,
      currentUser,
      setCurrentUser,
      sendJsonMessage: noop,
      isWebSocketOpen: false,
      lastJsonMessage: null,
      connectionId: null,
      refetchUserInfo: noopAsync,
      jwtToken: currentUser?.result?.token ?? null,
      triggerReconnect: noop,
      isPlayingGame: false,
      setIsPlayingGame: noop,
      isConnectionUnstable: false,
    }),
    [currentUser, setCurrentUser],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
