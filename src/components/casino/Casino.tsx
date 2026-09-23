'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import {
  getCasinoFallbackLogoUrl,
  getCasinoLogoUrl,
  getCasinoMinibgUrl,
  getCasinoVendorSlug,
} from '@/utils/vendorImages';

const DEMO_CASINO_VENDORS = [
  '에볼루션',
  '프라그마틱 플레이',
  '드림게이밍',
  '빅게이밍',
  '섹시카지노',
  '마이크로게이밍',
  '플레이텍',
  '아시아게이밍',
  '스카이윈드',
  '비보',
  '두윈',
  'WM 카지노',
  'TG 스피드',
  '에즈기',
];

export default function Casino() {
  const handleVendorClick = () => {
    toast.info('데모 페이지에서는 게임을 실행할 수 없습니다.');
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {DEMO_CASINO_VENDORS.map((vendorName, index) => {
        const slug = getCasinoVendorSlug(vendorName);
        const mainIcon = getCasinoLogoUrl(slug, index);
        const minibgImage = getCasinoMinibgUrl(index);

        return (
          <div
            key={vendorName}
            className="group relative cursor-pointer overflow-hidden border border-[#29324b] bg-linear-to-r from-[#0a0f1a] to-[#141c2e] transition-all duration-200 hover:border-[#ef7c00] hover:shadow-[0_0_12px_rgba(239,124,0,0.15)]"
            onClick={handleVendorClick}
          >
            <div className="relative h-25 md:h-30">
              <div className="absolute right-0 bottom-0 z-1 h-full w-[50%] transition-transform duration-300 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={minibgImage}
                  alt=""
                  className="h-full w-full object-contain object-bottom-right opacity-50 grayscale-[0.4] transition-all duration-300 group-hover:opacity-75 group-hover:grayscale-0"
                />
              </div>
              <div className="relative z-2 flex h-full flex-col justify-center gap-1.5 pr-[50%] pl-3 md:pl-4">
                <div className="relative h-8 w-20 md:h-10 md:w-24">
                  <Image
                    src={mainIcon}
                    alt={vendorName}
                    fill
                    className="object-contain object-left"
                    sizes="96px"
                    onError={(e) => {
                      e.currentTarget.src = getCasinoFallbackLogoUrl();
                    }}
                  />
                </div>
                <span className="casino_text line-clamp-1 text-xs leading-tight font-bold tracking-tight break-keep sm:text-sm">
                  {vendorName}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
