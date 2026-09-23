"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useAgentCode } from "./AgentCodeProvider";
import { LoginModal } from "@/components/ui/LoginModal";
import { RegistrationModal } from "@/components/ui/RegistrationModal";

interface AuthModalContextValue {
  openLogin: () => void;
  openSignUp: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { clearAgentCode } = useAgentCode();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const openLogin = useCallback(() => setIsLoginModalOpen(true), []);

  const openSignUp = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegistrationModalOpen(true);
  }, []);

  const handleRegistrationComplete = useCallback(() => {
    clearAgentCode();
  }, [clearAgentCode]);

  return (
    <AuthModalContext.Provider value={{ openLogin, openSignUp }}>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignUp={openSignUp}
      />
      <RegistrationModal
        key={isRegistrationModalOpen ? "open" : "closed"}
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegistrationComplete={handleRegistrationComplete}
        onOpenLogin={() => {
          setIsRegistrationModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
