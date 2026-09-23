import type { QnAItem } from "@/types/qna";

export const DEMO_QNA_ITEMS: QnAItem[] = [
  {
    id: "qna-1",
    title: "입금 관련 문의",
    message: "입금이 반영되지 않습니다.",
    status: "answered",
    answer: "데모 페이지에서는 실제 입금이 처리되지 않습니다.",
    userId: "demo-user",
    userName: "testuser",
    answeredBy: "admin",
    answeredByName: "고객센터",
    createdAt: "2026-09-15T00:00:00.000Z",
    updatedAt: "2026-09-15T01:00:00.000Z",
    answeredAt: "2026-09-15T01:00:00.000Z",
    isRead: true,
  },
  {
    id: "qna-2",
    title: "출금 처리 문의",
    message: "출금 신청 후 상태를 확인하고 싶습니다.",
    status: "pending",
    answer: null,
    userId: "demo-user",
    userName: "testuser",
    createdAt: "2026-09-16T00:00:00.000Z",
    updatedAt: "2026-09-16T00:00:00.000Z",
    isRead: true,
  },
];
