"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { cn } from "@/utils/classNames";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "@/lib/motion";
import { HEADER_QUICK_NAV } from "./NavBar/headerQuickNav";
import type { HeaderQuickNavItem } from "./NavBar/headerQuickNav";
import { HEADER_MORE_MENU } from "./NavBar/HeaderMoreMenuDropdown";
import {
  MOBILE_SIDEBAR_QUICK_ACTIONS,
  mobileSidebarNavLabel,
} from "./NavBar/mobileSidebarNav";
import { AuthLink } from "@/components/ui/AuthLink";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccount?: () => void;
  onOpenFavorites?: () => void;
}

const mobileSideNavHeaderClass =
  "relative flex min-h-14 shrink-0 items-center border-b border-white/[0.08] bg-panel px-2.5 py-1.5";

const mobileNavActionBtnClass = cn(
  "inline-flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] px-3.5",
  "border border-[rgba(128,101,40,0.28)] bg-[linear-gradient(180deg,#161b22,#0d1217)]",
  "text-sm font-semibold text-white",
  "transition-[border-color,background,color] duration-200 ease-in-out",
  "hover:border-gold-border hover:bg-[linear-gradient(90deg,#c9a22724,#c9a22708)] hover:text-gold",
);

const mobileNavActionBtnHighlightClass = "border-gold-border text-gold-soft group";

const mobileSideNavLinkClass = cn(
  "relative inline-flex h-[52px] w-full cursor-pointer items-center justify-start gap-2.5 overflow-hidden rounded-[10px] px-3 py-1.5",
  "border border-[rgba(128,101,40,0.22)] bg-[linear-gradient(180deg,#161b22,#0d1217)]",
  "text-sm font-semibold text-white",
  "transition-[transform,background,border-color,box-shadow,color] duration-[220ms] ease-in-out",
  "hover:translate-x-[3px] hover:border-gold-border hover:bg-[linear-gradient(90deg,#c9a2272e,#c9a22708)] hover:text-gold hover:shadow-[0_8px_20px_-12px_#c9a22773]",
  "data-active:translate-x-[3px] data-active:border-gold-border data-active:bg-[linear-gradient(90deg,#c9a2272e,#c9a22708)] data-active:text-gold data-active:shadow-[0_8px_20px_-12px_#c9a22773]",
);

function HamburgerButton({
  onClick,
  ariaLabel,
}: {
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="relative inline-block h-4 w-6.25 shrink-0 cursor-pointer transition-all duration-300 ease-in-out"
    >
      <span className="animate-hamburger-wave absolute left-0 top-0 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold" />
      <span className="animate-hamburger-wave absolute left-0 top-2 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold [animation-delay:0.3s]" />
      <span className="animate-hamburger-wave absolute left-0 top-4 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold [animation-delay:0.6s]" />
    </button>
  );
}

function MobileSidebarActionButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(mobileNavActionBtnClass, className)}
    >
      {children}
    </button>
  );
}

function MobileSidebarNavRow({
  item,
  onClose,
}: {
  item: HeaderQuickNavItem;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const active = item.href !== "#" && pathname === item.href;
  const label = mobileSidebarNavLabel(item.label);

  return (
    <AuthLink
      href={item.href}
      requireAuth={item.requireAuth ?? true}
      onClick={onClose}
      data-active={active ? true : undefined}
      className={mobileSideNavLinkClass}
    >
      <Image
        unoptimized
        src={item.icon}
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0 object-contain"
      />
      <span className="font-semibold">{label}</span>
    </AuthLink>
  );
}

function MobileSidebarContent({
  onClose,
  onOpenAccount,
  onOpenFavorites,
}: {
  onClose: () => void;
  onOpenAccount?: () => void;
  onOpenFavorites?: () => void;
}) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();
  const router = useRouter();
  const isLoggedIn = !!currentUser?.result?.token;

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      onClose();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAccount = () => {
    onClose();
    if (isLoggedIn) {
      onOpenAccount?.();
    } else {
      openLogin();
    }
  };

  const handleDeposit = () => {
    if (!isLoggedIn) {
      onClose();
      openLogin();
      return;
    }
    onClose();
    router.push("/deposit");
  };

  const renderQuickAction = (action: (typeof MOBILE_SIDEBAR_QUICK_ACTIONS)[number]) => {
    if (action.id === "account") {
      return (
        <MobileSidebarActionButton className="group" key={action.id} onClick={handleAccount}>
          <BiSolidUser className="size-4.5 shrink-0" aria-hidden />
          <span className="group-hover:text-gold">{action.label}</span>
        </MobileSidebarActionButton>
      );
    }

    if (action.id === "deposit") {
      return (
        <MobileSidebarActionButton
          key={action.id}
          onClick={handleDeposit}
          className={mobileNavActionBtnHighlightClass}
        >
          <span className="group-hover:text-gold">{action.label}</span>
        </MobileSidebarActionButton>
      );
    }

    return (
      <MobileSidebarActionButton
        key={action.id}
        className="group"
        onClick={() => {
          onClose();
          onOpenFavorites?.();
        }}
      >
        <FaHeart className="size-4 shrink-0" aria-hidden />
        <span className="text-[#757575] transition-colors duration-200 group-hover:text-gold">
          {action.label}
        </span>
      </MobileSidebarActionButton>
    );
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-100 flex w-full flex-col bg-black"
    >
      <div className={mobileSideNavHeaderClass}>
        <HamburgerButton onClick={onClose} ariaLabel="Close menu" />
        <Link
          href="/"
          onClick={onClose}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/logo/ksky.png"
            alt="KSKY SOLUTION"
            width={152}
            height={47}
            unoptimized
            className="block h-12.5 w-22.5 object-contain"
            priority
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
        <div className="flex flex-col gap-2.5">
          {MOBILE_SIDEBAR_QUICK_ACTIONS.map(renderQuickAction)}
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {HEADER_QUICK_NAV.map((item) => (
            <MobileSidebarNavRow key={item.label} item={item} onClose={onClose} />
          ))}
        </div>

        <p className="mb-2 mt-5 px-1 text-xs font-semibold uppercase tracking-wide text-[#757575]">
          더보기 +
        </p>
        <div className="flex flex-col gap-2.5">
          {HEADER_MORE_MENU.map((item) => {
            const active = pathname === item.href;
            return (
              <AuthLink
                key={item.href}
                href={item.href}
                requireAuth={item.requireAuth ?? true}
                onClick={onClose}
                data-active={active ? true : undefined}
                className={mobileSideNavLinkClass}
              >
                <span className="font-semibold">{item.label}</span>
              </AuthLink>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function MobileSidebar({
  isOpen,
  onClose,
  onOpenAccount,
  onOpenFavorites,
}: MobileSidebarProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-99 bg-black/50"
              onClick={onClose}
              aria-hidden
            />
            <MobileSidebarContent
              key="sidebar-content"
              onClose={onClose}
              onOpenAccount={onOpenAccount}
              onOpenFavorites={onOpenFavorites}
            />
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
