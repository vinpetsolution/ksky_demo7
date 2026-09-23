export interface BetHistoryItem {
  _id: string;
  userId: string;
  gameId: string;
  vendorName: string;
  gameName: string;
  betAmount: number;
  winAmount: number;
  result: string;
  totaledPlay: number;
  createdAt: string;
  updatedAt: string;
  gameCategory: string;
}
