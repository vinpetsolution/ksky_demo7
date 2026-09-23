"use client";

import { useRouter } from "next/navigation";
import type { HTMLAttributes, PointerEventHandler } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { cn } from "@/utils/classNames";

interface AuthLinkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  href: string;
  children: React.ReactNode;
  className?: string;
  requireAuth?: boolean;
  onClick?: () => void;
  onPointerDown?: PointerEventHandler<HTMLSpanElement>;
}

export function AuthLink({
  href,
  children,
  className,
  requireAuth = true,
  onClick,
  onPointerDown,
  ...props
}: AuthLinkProps) {
  const router = useRouter();
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (requireAuth && !currentUser) {
      openLogin();
      return;
    }

    onClick?.();

    if (href && href !== "#") {
      router.push(href);
    }
  };

  return (
    <span
      onClick={handleClick}
      onPointerDown={onPointerDown}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </span>
  );
}
