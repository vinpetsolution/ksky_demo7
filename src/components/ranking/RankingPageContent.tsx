"use client";

import { useMemo, useState } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { Button } from "@/components/ui/Button";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { BANNER_VIDEOS } from "@/mocks/slides";
import {
  DEMO_RANKING_EVENTS,
  DEMO_AGENT_RANKING,
  DEMO_USER_RANKING,
  DEMO_MY_AGENT_RANK,
  DEMO_MY_USER_RANK,
} from "@/mocks/ranking";
import { formatMoney, maskName } from "@/utils/format";
import type {
  AgentRankItem,
  MyAgentRank,
  MyUserRank,
  RankingEvent,
  RankingType,
  UserRankItem,
} from "@/types/event";
import { cn } from "@/utils/classNames";

type RankingTarget = "agent" | "user";

interface RankingPageContentProps {
  target: RankingTarget;
  pageTitle: string;
}

const RANKING_TABS: { key: RankingType; label: string }[] = [
  { key: "total", label: "전체" },
  { key: "casino", label: "카지노" },
  { key: "slot", label: "슬롯" },
];

function formatEventOption(event: RankingEvent) {
  const fmt = (iso: string) => iso.split("T")[0];
  return `${event.title} (${fmt(event.startAt)} ~ ${fmt(event.endAt)})`;
}

function getBetFromMyRank(
  rank: MyAgentRank | MyUserRank | AgentRankItem | UserRankItem,
  type: RankingType,
): number {
  switch (type) {
    case "casino":
      return rank.fakeCasinoBet;
    case "slot":
      return rank.fakeSlotBet;
    default:
      return rank.fakeTotalBet;
  }
}

function getBetAmount(
  item: AgentRankItem | UserRankItem,
  type: RankingType,
): number {
  return getBetFromMyRank(item, type);
}

function getMyRankValue(
  myRank: MyAgentRank | MyUserRank | null,
  type: RankingType,
): number | null {
  if (!myRank) return null;
  switch (type) {
    case "casino":
      return myRank.casinoRank;
    case "slot":
      return myRank.slotRank;
    default:
      return myRank.totalRank;
  }
}

function rankDisplay(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
}

export function RankingPageContent({ target, pageTitle }: RankingPageContentProps) {
  const events = useMemo(
    () =>
      target === "agent"
        ? DEMO_RANKING_EVENTS.filter((e) => e.agentRankingEnabled)
        : DEMO_RANKING_EVENTS.filter((e) => e.userRankingEnabled),
    [target],
  );
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ?? "");
  const [rankingType, setRankingType] = useState<RankingType>("total");
  const agentRanking = DEMO_AGENT_RANKING;
  const userRanking = DEMO_USER_RANKING;
  const myRank = target === "agent" ? DEMO_MY_AGENT_RANK : DEMO_MY_USER_RANK;
  const rankingList = target === "agent" ? agentRanking : userRanking;
  const myRankValue = getMyRankValue(myRank, rankingType);
  const myBetAmount = getBetFromMyRank(myRank, rankingType);

  const emptyMessage = useMemo(() => {
    if (events.length === 0) return "현재 진행 중인 이벤트가 없습니다.";
    if (!selectedEventId) return "랭킹 데이터가 없습니다.";
    if (rankingList.length === 0) return "랭킹 데이터가 없습니다.";
    return null;
  }, [events.length, selectedEventId, rankingList.length]);

  return (
    <AuthGuard>
      <HeroCarousel videos={BANNER_VIDEOS} />
      <div className="flex w-full flex-col px-0 pb-10 md:px-5">
        <div
          className="flex w-full flex-col pt-px lg:flex-row"
          style={{ marginLeft: "-1px" }}
        >
          <div className="hidden h-50 w-81.25 shrink-0 flex-col justify-center bg-[#fffcf7cc] backdrop-blur-[5px] lg:flex">
            <span className="block pr-10 text-right text-[40px] font-extralight text-gray">
              🏆
            </span>
            <span className="-mt-4 block pr-10 text-right text-[32px] font-normal text-[#a6842e]">
              {pageTitle}
            </span>
          </div>
          <div
            className="flex min-h-30 min-w-0 flex-1 flex-col justify-center bg-[#fffcf7cc] px-5 py-6 backdrop-blur-[5px] lg:h-50 lg:px-0 lg:py-0"
            style={{ marginRight: "1px" }}
          >
            <h1 className="mb-2 pl-5 text-xl font-semibold text-[#a6842e] lg:hidden">
              🏆 {pageTitle}
            </h1>
            <div className="space-y-1 pl-5 text-sm leading-[1.6] text-gray lg:pl-10 lg:text-[15px]">
              <p>진행 중인 이벤트별 배팅 랭킹을 확인할 수 있습니다.</p>
              <p>전체 · 카지노 · 슬롯 탭으로 구분하여 조회할 수 있습니다.</p>
            </div>
          </div>
        </div>

        {events.length > 0 && (
          <div className="mt-px bg-cream p-3 md:p-4">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="h-10 w-full rounded border border-line bg-panel px-3 text-sm text-gray outline-none focus:border-[#a6842e]"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {formatEventOption(event)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-px grid grid-cols-3 gap-px">
          {RANKING_TABS.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant="transparent"
              onClick={() => setRankingType(tab.key)}
              className={cn(
                "h-12 rounded-none text-sm font-semibold md:h-15.5 md:text-base",
                rankingType === tab.key
                  ? "border border-gold bg-[linear-gradient(90deg,#e8d5a3,#c6a15b)] text-ink"
                  : "bg-panel text-gray hover:bg-[#f8f1e4] hover:text-[#a6842e]/80",
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {myRank && myRankValue != null && (
          <div className="mt-px border border-gold/40 bg-[linear-gradient(90deg,#c6a15b1a,#c6a15b08)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-gold px-2 py-0.5 text-xs font-bold text-ink">
                  ME
                </span>
                <span className="text-sm font-semibold text-ink">내 순위</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray">
                  순위{" "}
                  <strong className="text-lg text-[#a6842e]">{myRankValue}</strong>
                </span>
                <span className="text-gray">
                  배팅금액{" "}
                  <strong className="text-[#1f8a45]">{formatMoney(myBetAmount)}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-px overflow-x-auto">
          <table className="min-w-120 w-full border-collapse">
            <thead>
              <tr className="bg-line text-sm text-ink">
                <th className="border-b border-r border-line px-4 py-3 text-center font-medium">
                  순위
                </th>
                <th className="border-b border-r border-line px-4 py-3 text-center font-medium">
                  {target === "agent" ? "에이전트" : "유저"}
                </th>
                <th className="border-b border-line px-4 py-3 text-center font-medium">
                  배팅금액
                </th>
              </tr>
            </thead>
            <tbody>
              {emptyMessage ? (
                <tr>
                  <td
                    colSpan={3}
                    className="bg-panel py-12 text-center text-base font-semibold text-[#a6842e]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rankingList.map((item) => {
                  const isAgent = target === "agent";
                  const agentItem = item as AgentRankItem;
                  const userItem = item as UserRankItem;
                  const rowKey = isAgent ? agentItem.agentId : userItem.userId;
                  const nickname = isAgent
                    ? agentItem.agentNickname
                    : userItem.userNickname;
                  const displayName = item.isSelf ? nickname : maskName(nickname);
                  const bet = getBetAmount(item, rankingType);

                  return (
                    <tr
                      key={rowKey}
                      className={cn(
                        "border-b border-line text-sm text-ink",
                        item.isSelf
                          ? "bg-[linear-gradient(90deg,#c6a15b26,#c6a15b0d)]"
                          : "bg-panel",
                      )}
                    >
                      <td className="border-r border-line px-4 py-3 text-center">
                        <span
                          className={cn(
                            item.rank <= 3 ? "text-[#a6842e] font-semibold" : "",
                          )}
                        >
                          {rankDisplay(item.rank)}
                        </span>
                      </td>
                      <td className="border-r border-line px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="flex items-center gap-1.5 font-medium text-ink">
                            {displayName}
                            {item.isSelf && (
                              <span className="rounded bg-gold px-1.5 py-px text-[10px] font-bold text-ink">
                                ME
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray">
                            {isAgent
                              ? `Lv.${agentItem.agentLevel} · 회원 ${agentItem.directMemberCount}명`
                              : `@${item.isSelf ? userItem.agentId : maskName(userItem.agentId)}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-[#1f8a45]">
                        {formatMoney(bet)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthGuard>
  );
}
