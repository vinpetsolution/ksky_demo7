"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Modal from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { GameCard } from "@/components/ui/GameCard";
import { SLOT_DATA } from "@/mocks/slides";
import type { GameCardProps } from "@/components/ui/GameCard";
import { cn } from "@/utils/classNames";

const PAGE_SIZE = 12;
const LOAD_DELAY_MS = 800;

type GameSearchModalProps = {
  open: boolean;
  onClose: () => void;
};

function filterGames(items: GameCardProps[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => item.name?.toLowerCase().includes(q));
}

function getGameCardKey(item: GameCardProps, indexInFiltered: number) {
  const media = item.image ?? item.video ?? item.gif;
  return media ? `${media}::${indexInFiltered}` : `game-${indexInFiltered}`;
}

export function GameSearchModal({ open, onClose }: GameSearchModalProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => filterGames(SLOT_DATA, query), [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const pageStart = (currentPage - 1) * PAGE_SIZE;

  const pageItems = useMemo(() => {
    return filtered.slice(pageStart, pageStart + PAGE_SIZE);
  }, [filtered, pageStart]);

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      setPage(1);
    },
    [],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="검색"
      className="xl:w-[1000px] 2xl:w-[1000px] w-full"
      contentClassName="overflow-y-auto flex min-h-0 flex-1 flex-col"
    >
      <div className="relative shrink-0">
        <IoSearch
          className="pointer-events-none absolute left-1.5 top-1/2 size-6 -translate-y-1/2 text-white"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="게임 검색"
          className="h-10 w-full rounded-lg border border-white bg-transparent py-0 pl-10 pr-3 text-base tracking-normal text-white placeholder:text-white/40 outline-none"
        />
      </div>

      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16">
          <span
            className="size-8 animate-spin rounded-full border-4 border-gold border-t-transparent"
            aria-hidden
          />
          <p className="text-sm text-white">게임 로딩 중...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center text-sm text-white/80">
          <p>검색 결과가 없습니다.</p>
          <p className="mt-2 text-[#757575]">다른 검색어를 시도해 보세요.</p>
        </div>
      ) : (
        <>
          <div
            key={currentPage}
            className={cn("mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4")}
          >
            {pageItems.map((item, i) => (
              <GameCard
                {...item}
                key={getGameCardKey(item, pageStart + i)}
                useGif={item.useGif ?? false}
                showFavoriteButton={true}
                isFavorite={true}
                className="aspect-video w-full"
              />
            ))}
          </div>


          <div className="flex shrink-0 mt-3 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-medium text-white text-center lg:text-left">
              합계:{" "}
              <span className="tabular-nums">{filtered.length.toLocaleString()}</span>
            </p>
            {totalPages > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                className="justify-center sm:justify-end"
              />
            ) : null}
          </div>
        </>
      )}
    </Modal>
  );
}
