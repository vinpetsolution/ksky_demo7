"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";

const LOADER_DURATION_MS = 1200;
const LOADER_LABEL = "KSKY SOLUTION";

const SLIDE_UP_TRANSITION = {
  duration: 0.7,
  ease: [0.4, 0, 0.2, 1] as const,
};

/** Clip phần vẽ lệch do translateY — tránh scrollbar Y tạm khi enter. */
function SlideUpEnter({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden overflow-y-clip">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SLIDE_UP_TRANSITION}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <SlideUpEnter>{children}</SlideUpEnter>;
  }

  return (
    <PageLoaderTransition key={pathname}>{children}</PageLoaderTransition>
  );
}

function PageLoaderTransition({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, LOADER_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SlideUpEnter>{children}</SlideUpEnter>
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="page-loader"
            className={cn(
              "fixed z-30 flex w-full flex-col items-center justify-center bg-black",
              "max-lg:inset-x-0 max-lg:top-38.5 max-lg:bottom-17.5",
              "lg:top-20 lg:right-0 lg:bottom-0 lg:left-60",
            )}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="relative text-[32px] font-black italic tracking-[2px] text-[#4a0d0d]">
              {LOADER_LABEL}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 animate-logo-sweep bg-[linear-gradient(90deg,transparent,#ff3333,#ffca28,#ff3333,transparent)] bg-size-[200%_100%] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] filter-[drop-shadow(0_0_8px_rgba(255,51,51,0.8))]"
              >
                {LOADER_LABEL}
              </span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
