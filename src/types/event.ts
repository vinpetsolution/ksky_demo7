export interface RankingEvent {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  status: string;
  rankingLimit: number;
  agentRankingEnabled: boolean;
  userRankingEnabled: boolean;
  lastAggregatedAt: string;
}

export interface AgentRankItem {
  rank: number;
  agentId: string;
  agentNickname: string;
  agentLevel: number;
  directMemberCount: number;
  fakeCasinoBet: number;
  fakeSlotBet: number;
  fakeTotalBet: number;
  reachedAt: string;
  calculatedAt: string;
  isSelf: boolean;
}

export interface UserRankItem {
  rank: number;
  userId: string;
  userNickname: string;
  agentId: string;
  fakeCasinoBet: number;
  fakeSlotBet: number;
  fakeTotalBet: number;
  reachedAt: string;
  calculatedAt: string;
  isSelf: boolean;
}

export interface MyAgentRank {
  agentId: string;
  totalRank: number;
  casinoRank: number;
  slotRank: number;
  fakeCasinoBet: number;
  fakeSlotBet: number;
  fakeTotalBet: number;
  directMemberCount?: number;
}

export interface MyUserRank {
  userId: string;
  totalRank: number;
  casinoRank: number;
  slotRank: number;
  fakeCasinoBet: number;
  fakeSlotBet: number;
  fakeTotalBet: number;
}

export type RankingType = "total" | "casino" | "slot";
export type RankingTarget = "agent" | "user";

export interface RankingResult<T> {
  eventId: string;
  eventTitle: string;
  rankingType: string;
  rankingTarget: string;
  rankingLimit: number;
  lastAggregatedAt: string;
  ranking: T[];
  myRank: MyAgentRank | MyUserRank | null;
}

export interface RankingResponse<T> {
  message: string;
  success: boolean;
  returnCode: string;
  result: RankingResult<T> | null;
}

export interface EventsListResponse {
  message: string;
  success: boolean;
  returnCode: string;
  result: RankingEvent[] | null;
}
