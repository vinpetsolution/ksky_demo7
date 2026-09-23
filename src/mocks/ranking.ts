import type { RankingEvent, AgentRankItem, UserRankItem, MyAgentRank, MyUserRank } from "@/types/event";

export const DEMO_RANKING_EVENTS: RankingEvent[] = [
  {
    id: "demo-event-1",
    title: "9월 배팅 랭킹",
    description: "데모 이벤트",
    startAt: "2026-09-01T00:00:00.000Z",
    endAt: "2026-09-30T23:59:59.000Z",
    status: "active",
    rankingLimit: 10,
    agentRankingEnabled: true,
    userRankingEnabled: true,
    lastAggregatedAt: "2026-09-17T00:00:00.000Z",
  },
];

export const DEMO_AGENT_RANKING: AgentRankItem[] = [
  { rank: 1, agentId: "agent01", agentNickname: "골드에이전트", agentLevel: 3, directMemberCount: 42, fakeCasinoBet: 82000000, fakeSlotBet: 31000000, fakeTotalBet: 113000000, reachedAt: "2026-09-10T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: false },
  { rank: 2, agentId: "agent02", agentNickname: "실버파트너", agentLevel: 2, directMemberCount: 28, fakeCasinoBet: 54000000, fakeSlotBet: 22000000, fakeTotalBet: 76000000, reachedAt: "2026-09-11T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: false },
  { rank: 3, agentId: "agent03", agentNickname: "브론즈클럽", agentLevel: 1, directMemberCount: 15, fakeCasinoBet: 21000000, fakeSlotBet: 18000000, fakeTotalBet: 39000000, reachedAt: "2026-09-12T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: false },
];

export const DEMO_USER_RANKING: UserRankItem[] = [
  { rank: 1, userId: "user01", userNickname: "잭팟킹", agentId: "agent01", fakeCasinoBet: 12500000, fakeSlotBet: 4300000, fakeTotalBet: 16800000, reachedAt: "2026-09-10T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: false },
  { rank: 2, userId: "demo-user", userNickname: "Demo", agentId: "agent01", fakeCasinoBet: 8200000, fakeSlotBet: 3100000, fakeTotalBet: 11300000, reachedAt: "2026-09-11T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: true },
  { rank: 3, userId: "user03", userNickname: "슬롯마스터", agentId: "agent02", fakeCasinoBet: 4100000, fakeSlotBet: 6200000, fakeTotalBet: 10300000, reachedAt: "2026-09-12T00:00:00.000Z", calculatedAt: "2026-09-17T00:00:00.000Z", isSelf: false },
];

export const DEMO_MY_AGENT_RANK: MyAgentRank = {
  agentId: "demo-agent",
  totalRank: 8,
  casinoRank: 6,
  slotRank: 9,
  fakeCasinoBet: 5200000,
  fakeSlotBet: 1800000,
  fakeTotalBet: 7000000,
  directMemberCount: 3,
};

export const DEMO_MY_USER_RANK: MyUserRank = {
  userId: "demo-user",
  totalRank: 2,
  casinoRank: 2,
  slotRank: 4,
  fakeCasinoBet: 8200000,
  fakeSlotBet: 3100000,
  fakeTotalBet: 11300000,
};
