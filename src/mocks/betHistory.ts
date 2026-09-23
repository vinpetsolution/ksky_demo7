import type { BetHistoryItem } from "@/types/betHistory";

export const DEMO_BET_HISTORY: BetHistoryItem[] = [
  { _id: "1", userId: "demo-user", gameId: "evo-baccarat", vendorName: "Evolution", gameName: "바카라", betAmount: 50000, winAmount: 95000, result: "Win", totaledPlay: 1, createdAt: "2026-09-16T12:10:00.000Z", updatedAt: "2026-09-16T12:10:00.000Z", gameCategory: "Live Casino" },
  { _id: "2", userId: "demo-user", gameId: "evo-roulette", vendorName: "Evolution", gameName: "룰렛", betAmount: 30000, winAmount: 0, result: "Lose", totaledPlay: 1, createdAt: "2026-09-16T11:40:00.000Z", updatedAt: "2026-09-16T11:40:00.000Z", gameCategory: "Live Casino" },
  { _id: "3", userId: "demo-user", gameId: "pg-fortune", vendorName: "PG Soft", gameName: "포춘 타이거", betAmount: 20000, winAmount: 80000, result: "Win", totaledPlay: 1, createdAt: "2026-09-15T21:05:00.000Z", updatedAt: "2026-09-15T21:05:00.000Z", gameCategory: "Slot" },
  { _id: "4", userId: "demo-user", gameId: "prag-sweet", vendorName: "Pragmatic Play", gameName: "스윗 보난자", betAmount: 15000, winAmount: 0, result: "Lose", totaledPlay: 1, createdAt: "2026-09-15T20:22:00.000Z", updatedAt: "2026-09-15T20:22:00.000Z", gameCategory: "Slot" },
  { _id: "5", userId: "demo-user", gameId: "sexy-baccarat", vendorName: "Sexy Gaming", gameName: "섹시 바카라", betAmount: 100000, winAmount: 0, result: "Draw", totaledPlay: 1, createdAt: "2026-09-15T18:11:00.000Z", updatedAt: "2026-09-15T18:11:00.000Z", gameCategory: "Live Casino" },
];
