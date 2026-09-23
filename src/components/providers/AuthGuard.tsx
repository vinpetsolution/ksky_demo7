"use client";

import { useEffect } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser, loadingUser } = useUser();
  const { openLogin } = useAuthModal();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && !currentUser) {
      router.replace("/");
      const timer = window.setTimeout(() => {
        openLogin();
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [currentUser, loadingUser, openLogin, router]);

  return <>{children}</>;
}
