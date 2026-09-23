"use client";

import { PARTNER_LOGOS } from "@/constants/partner";
import { cn } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { AuthLink } from "../ui/AuthLink";
import { usePathname } from "next/navigation";

type FooterProps = {
  className?: string;
};

const FOOTER_NAV = [
  { label: "카지노", href: "/casino" },
  { label: "슬롯", href: "/slots" },
  { label: "프로모션", href: "#" },
  { label: "공지사항", href: "/article" },
  { label: "1:1 문의", href: "/inquiries" },
] as const;

const FOOTER_TAGS = [
  { label: "슬롯" },
  { label: "라이브카지노" },
] as const;

export default function Footer({ className }: FooterProps) {

  const pathname = usePathname();
  return (
    <footer
      className={cn(
        "relative z-10 w-full bg-black",
        "mt-auto",
        "text-sm ",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-2 before:h-[0.5px]",
        "before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,238,175,0.32)_20%,rgba(255,248,210,0.58)_50%,rgba(255,238,175,0.32)_80%,transparent_100%)]",
        "before:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
        "before:content-['']",
        className,
      )}
    >
      {/* Partner */}
      <section className={cn(
        "w-full pt-5 pb-5.5 relative bg-[linear-gradient(180deg,#101620_0%,#0a0e14_100%)]",
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-2 after:h-[0.5px]",
        "after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,238,175,0.32)_20%,rgba(255,248,210,0.58)_50%,rgba(255,238,175,0.32)_80%,transparent_100%)]",
        "after:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
        "after:content-['']",
      )}>
        <p className="text-[11px] uppercase mb-3 font-semibold tracking-[0.08em] text-gold-border text-center">
          공식 파트너
        </p>
        <div className="mx-auto w-full ">
          <Marquee
            speed={100}
          // autoFill
          >
            <div className="flex lg:gap-2.5 gap-2.5 pr-2.5 bg-transparent">
              {PARTNER_LOGOS.map((logo) => (
                <div key={logo.alt}
                  className={cn("min-w-28 shrink-0 flex items-center justify-center h-14 rounded-lg py-2 px-4 border border-white/7",
                    "bg-white/5"
                  )}
                >
                  <Image
                    unoptimized
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={48}
                    className="h-11 w-auto object-contain max-w-120px brightness-[1.08] contrast-[1.05]"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      <div className={cn("w-full flex flex-col gap-5 text-center",
        "items-center pt-6 px-4 pb-8 text-[#757575]"
      )}>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-[13px]">
          {FOOTER_NAV.map((item) => {

            const active = item.href !== "#" && pathname === item.href;
            return (
              <AuthLink
                key={item.label}
                href={item.href}
                className={cn("transition-colors hover:text-gold ", active && "text-gold")}
              >
                {item.label}
              </AuthLink>
            )
          })}
        </nav>
        <div className="h-px w-full max-w-md bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07)_25%,rgba(255,255,255,0.07)_75%,transparent)]" />
        <div className={cn("flex flex-wrap items-center justify-center gap-x-6 gap-y-4")}>
          <Link
            href={"https://www.gamcare.org.uk/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex hover:text-white opacity-90 items-center transition-[color,opacity] hover:opacity-100"
          >
            <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.68121 28.5618C4.61753 29.9001 3.70893 30.7792 2.50475 30.7792C1.87082 30.7792 1.32147 30.5279 0.877628 30.047C0.518369 29.6498 0.328285 29.1265 0.328285 28.5411C0.328285 27.9547 0.560188 27.4107 1.00403 26.9712C1.42697 26.5524 1.9345 26.3641 2.56843 26.3641C3.43426 26.3641 4.11001 26.783 4.44836 27.5152H3.68802C3.4124 27.1594 3.01132 26.9712 2.52566 26.9712C2.12458 26.9712 1.74346 27.118 1.46879 27.4107C1.17766 27.717 1.012 28.1196 1.00403 28.5401C1.00403 28.9797 1.1523 29.3985 1.44788 29.6695C1.74346 29.9839 2.14549 30.1514 2.54657 30.1514C3.20236 30.1514 3.68707 29.8164 4.02637 29.1255H2.08181V28.5194H4.68216L4.68121 28.5618ZM5.35696 30.6954H4.68216L6.3511 26.4479H6.96412L8.63306 30.6954H7.95731L7.4916 29.4615H5.82266L5.35696 30.6954ZM6.66759 27.2432L6.05457 28.8545H7.28061L6.66759 27.2432ZM8.88587 30.6954V26.4479H9.81538L11.0623 29.7326L12.3083 26.4479H13.2169V30.6954H12.6258L12.6676 27.0126L11.2733 30.6954H10.8086L9.4143 27.0126L9.45612 30.6954H8.88587ZM15.9218 30.7792C15.625 30.7845 15.3305 30.7276 15.0575 30.6122C14.7844 30.4969 14.5391 30.3258 14.3375 30.11C13.9355 29.6912 13.7245 29.1688 13.7245 28.5401C13.7245 27.9547 13.9573 27.4107 14.3802 27.0126C14.8022 26.5947 15.3307 26.3848 15.9427 26.3848C16.9359 26.3848 17.8027 27.0343 18.0774 28.0799H16.9369C16.704 27.662 16.3657 27.4314 15.9427 27.4314C15.3088 27.4314 14.8022 27.9124 14.8022 28.5401C14.8022 29.2103 15.3307 29.7335 15.9218 29.7335C16.3229 29.7335 16.6822 29.5237 16.915 29.1265H18.0555C17.7609 30.1524 16.9359 30.7792 15.9218 30.7792ZM19.0905 30.6954H17.95L19.5981 26.4479H20.4439L22.092 30.6954H20.9515L20.7395 30.0884H19.3234L19.0905 30.6954ZM20.0219 27.8503L19.5981 29.2103H20.4439L20.0219 27.8503ZM22.1765 30.6954V26.4479H23.5927C24.0356 26.4479 24.3948 26.4686 24.6695 26.6785C25.0497 26.9505 25.2397 27.3477 25.2397 27.871C25.2397 28.5618 24.8805 29.0634 24.2684 29.231L25.3243 30.6954H24.0356L23.2116 29.3354V30.6954H22.1765ZM23.4444 28.415C23.9719 28.415 24.2047 28.2898 24.2047 27.8917C24.2047 27.5359 23.9719 27.39 23.529 27.39H23.2325V28.3943H23.4444V28.415ZM25.81 30.6954V26.4479H28.1347V27.3891H26.8669V28.0799H28.1347V29.0211H26.8669V29.7543H28.1347V30.6954H25.81Z" fill="currentColor"></path><path d="M27.3953 14.7933C27.2783 14.7269 27.149 14.6843 27.0151 14.6682H18.3302C17.7381 14.6682 17.2524 15.1482 17.2524 15.7345C17.2524 16.3209 17.7381 16.8018 18.3302 16.8018H21.5835C21.6339 16.8018 21.6822 16.8216 21.7179 16.8569C21.7535 16.8922 21.7736 16.9401 21.7736 16.99C21.7736 17.0531 21.7317 17.0945 21.689 17.1369C19.9145 18.078 17.6117 18.6428 15.0969 18.6428C14.4838 18.6428 13.8927 18.6013 13.3006 18.5392V20.9449C13.8081 20.9872 14.3147 21.0079 14.8431 21.0079C18.3302 21.0079 21.5208 20.1703 23.9082 18.7896C23.9291 18.7689 23.9709 18.7689 24.0128 18.7689C24.1401 18.7689 24.2247 18.8526 24.2247 18.9778V19.0409L23.739 20.3802C23.4853 21.0917 23.8445 21.8653 24.5421 22.1166C24.6895 22.1797 24.8586 22.2013 25.0069 22.2013C25.2862 22.2001 25.5586 22.1155 25.7886 21.9585C26.0185 21.8015 26.1952 21.5794 26.2957 21.3213L28.092 16.4884C28.196 16.1698 28.183 15.825 28.0554 15.5148C27.9278 15.2047 27.6937 14.9492 27.3943 14.7933H27.3953ZM15.0978 5.69123C17.6335 5.69123 19.9364 6.27758 21.7317 7.21876C21.7317 7.21876 22.8732 8.03476 23.4016 7.26017C24.0147 6.36134 22.7886 5.8164 22.7886 5.8164C20.5703 4.79146 17.8236 4.1637 14.8441 4.1637C14.3156 4.1637 13.8081 4.1844 13.3015 4.22676V5.7957C13.8718 5.73358 14.4848 5.69123 15.0978 5.69123Z" fill="currentColor"></path><path d="M2.23008 0.125122C1.19412 0.125122 0.328285 0.962769 0.328285 2.00842V22.4508C0.328285 23.4767 1.17416 24.335 2.22913 24.335H13.3015V20.9656C6.64573 20.4847 1.46879 16.9279 1.46879 12.5967C1.46879 8.26536 6.64573 4.70771 13.3015 4.22677V0.125122H2.23008Z" fill="currentColor"></path><path d="M4.80762 12.1571C4.80762 15.3581 8.46293 17.9943 13.2806 18.5383V5.77502C8.48384 6.31902 4.80762 8.97691 4.80762 12.1571Z" fill="currentColor"></path></svg>
          </Link>
          <Link
            href="https://www.begambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline font-semibold underline-offset-[3px] hover:text-white transition-colors "
          >
            도박에 책임감을 가지세요
          </Link>
          <span
            className={cn("inline-flex size-9 rounded-full items-center justify-center px-2 border",
              "border-[rgba(128,101,40,0.45)] text-xs text-gold-border font-bold bg-[#c9a2270f]"
            )}
          >
            18+
          </span>
        </div>
        <p className="text-[11px] leading-[1.55] opacity-75 max-w-140 wrap-break-word">
          게임은 중독성이 있습니다. 책임감 있게 플레이해 주세요. 이 사이트는 18세 이상의 사용자를 위한 것입니다.
        </p>
        <p className="text-xs font-medium">
          ©2026 All rights reserved.
        </p>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {FOOTER_TAGS.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "rounded-md inline-flex items-center font-medium border border-white/7 bg-white/3.5 px-2.5 h-6.5",
                "text-[11px] transition-colors",
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <Link href="/" className="mt-1 flex items-center justify-center">
          <Image
            src="/images/logo/ksky.png"
            alt="KSKY SOLUTION"
            width={140}
            height={40}
            className="h-11 brightness-[1.05] hover:brightness-[1.12] transition-all duration-200 w-auto object-contain"
            unoptimized
          />
        </Link>
      </div>




    </footer>
  );
}
