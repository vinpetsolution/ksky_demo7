"use client";

import { useState } from "react";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import AccountInfo from "./AccountInfo";
import { MobileSidebar } from "./MobileSidebar";
import { UserSidebar } from "./UserSidebar";
import { Button } from "../ui/Button";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { HEADER_QUICK_NAV } from "./NavBar/headerQuickNav";
import { HeaderQuickNavItem } from "./NavBar/HeaderQuickNavItem";
import { HeaderMoreMenuDropdown } from "./NavBar/HeaderMoreMenuDropdown";
import { FavoritesRecentPlayModal } from "./FavoritesRecentPlayModal";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const { currentUser } = useUser();
  const { openLogin, openSignUp } = useAuthModal();

  const isLoggedIn = !!currentUser?.result?.token;
  const money = currentUser?.result?.user?.balanceMoney || 0;
  const points = currentUser?.result?.user?.balancePoint || 0;

  return (
    <>
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenAccount={() => {
          setIsSidebarOpen(false);
          setIsUserSidebarOpen(true);
        }}
        onOpenFavorites={() => {
          setIsSidebarOpen(false);
          setIsFavoritesModalOpen(true);
        }}
      />
      <UserSidebar
        isOpen={isUserSidebarOpen}
        onClose={() => setIsUserSidebarOpen(false)}
      />
      <FavoritesRecentPlayModal
        open={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full overflow-visible",
          "h-15.5 lg:h-20 bg-black shadow-[0_4px_24px_#00000073]",
          "max-lg:h-auto max-lg:min-h-15.5 max-lg:py-1 ",
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-3 after:h-[0.5px]",
          "after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,238,175,0.32)_20%,rgba(255,248,210,0.58)_50%,rgba(255,238,175,0.32)_80%,transparent_100%)]",
          "after:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
          "after:content-['']",
        )}
      >
        {/* Mobile layout */}
        <div className="hidden max-lg:flex max-lg:min-h-15.5 max-lg:items-center max-lg:justify-between max-lg:gap-3 max-lg:px-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setIsSidebarOpen(true)}
              className="relative inline-block h-4 w-6.25 shrink-0 cursor-pointer transition-all duration-300 ease-in-out"
            >
              <span className="animate-hamburger-wave absolute left-0 top-0 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold" />
              <span className="animate-hamburger-wave absolute left-0 top-2 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold [animation-delay:0.3s]" />
              <span className="animate-hamburger-wave absolute left-0 top-4 h-0.75 w-[70%] origin-left rounded-[20px] bg-gold [animation-delay:0.6s]" />
            </button>

            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo/ksky.png"
                alt="KSKY SOLUTION"
                width={152}
                height={47}
                unoptimized
                className="block h-12.5 lg:h-auto w-22.5 lg:w-30 object-contain"
                priority
              />
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col items-end justify-center gap-0.5">
              <button
                type="button"
                onClick={() => setIsUserSidebarOpen(true)}
                aria-label="User menu"
                className="flex items-center justify-end text-white"
              >
                <HiUserCircle className="size-10" />
              </button>
              <p className="whitespace-nowrap text-right text-[10px] font-semibold leading-tight">
                <span className="text-gray">
                  Money:{" "}
                  <strong className="font-bold text-[#47fd0e]">
                    {money.toLocaleString()}
                  </strong>
                </span>{" "}
                <span className="text-gray">
                  Points:{" "}
                  <strong className="font-bold text-[#47fd0e]">
                    {points.toLocaleString()}
                  </strong>
                </span>
              </p>
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="darkGradient"
                size="sm"
                ripple
                onClick={openLogin}
                className="h-8 rounded-sm px-3 text-xs font-normal"
              >
                로그인
              </Button>
              <Button
                variant="gold"
                size="sm"
                ripple
                onClick={openSignUp}
                className="h-8 min-w-21 rounded-sm px-3 text-xs font-normal"
              >
                회원가입
              </Button>
            </div>
          )}
        </div>

        {/* Desktop layout */}
        <div className="relative mx-auto flex h-20 w-full items-center justify-between px-4 py-1 max-lg:hidden">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo/ksky.png"
                alt="KSKY SOLUTION"
                width={160}
                height={60}
                className="h-12.5 2xl:h-15 w-auto object-contain"
                priority
                unoptimized
              />
            </Link>

            <Button
              variant="transparent"
              ripple
              leftIcon={<FaHeart className="size-4 shrink-0" />}
              onClick={() => setIsFavoritesModalOpen(true)}
              className={cn(
                "h-10 gap-2 rounded-lg px-3 text-sm font-semibold text-white",
                "hover:text-gold-soft hover:shadow-[0_0_14px_#c9a2272e]",
                "hover:bg-[linear-gradient(90deg,#c9a22724,#c9a2270a)]",
              )}
            >
              즐겨찾기 & 최근플레이
            </Button>
          </div>

          <nav className="z-5 flex flex-1 items-center justify-center gap-1 xl:gap-2.5">
            {HEADER_QUICK_NAV.map((item) => (
              <HeaderQuickNavItem key={item.label} item={item} />
            ))}
            <HeaderMoreMenuDropdown />
          </nav>

          <div className="shrink-0">
            <AccountInfo />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
