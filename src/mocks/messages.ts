import type { MessageThreadSummary, ThreadMessage } from "@/types/message";
import type { NoticeItem } from "@/types/notice";

export const DEMO_MESSAGE_THREADS: MessageThreadSummary[] = [
  {
    id: "thread-1",
    createdBy: "admin",
    recipientUsername: "testuser",
    subject: "환영합니다",
    lastMessage: "KSKY SOLUTION 데모에 오신 것을 환영합니다.",
    lastMessageAt: "2026-09-16T10:00:00.000Z",
    createdAt: "2026-09-16T10:00:00.000Z",
    unreadByRecipient: false,
  },
  {
    id: "thread-2",
    createdBy: "admin",
    recipientUsername: "testuser",
    subject: "입금 안내",
    lastMessage: "입금은 데모 전용이며 실제 처리되지 않습니다.",
    lastMessageAt: "2026-09-15T09:30:00.000Z",
    createdAt: "2026-09-15T09:30:00.000Z",
    unreadByRecipient: false,
  },
];

export const DEMO_THREAD_MESSAGES: Record<string, ThreadMessage[]> = {
  "thread-1": [
    {
      id: "msg-1",
      threadId: "thread-1",
      senderUsername: "admin",
      senderNickname: "고객센터",
      content: "KSKY SOLUTION 데모에 오신 것을 환영합니다.",
      createdAt: "2026-09-16T10:00:00.000Z",
    },
  ],
  "thread-2": [
    {
      id: "msg-2",
      threadId: "thread-2",
      senderUsername: "admin",
      senderNickname: "고객센터",
      content: "입금은 데모 전용이며 실제 처리되지 않습니다.",
      createdAt: "2026-09-15T09:30:00.000Z",
    },
  ],
};

export const DEMO_NOTICES: NoticeItem[] = [
  {
    id: "notice-1",
    title: "슬롯베팅왕 이벤트",
    message: "데모 공지입니다. 실제 이벤트는 진행되지 않습니다.",
    kind: "고객센터",
    createdAt: "2026-09-10T00:00:00.000Z",
    isRead: true,
  },
  {
    id: "notice-2",
    title: "첫입금 릴로드 이벤트",
    message: "데모 페이지 안내입니다.",
    kind: "고객센터",
    createdAt: "2026-09-12T00:00:00.000Z",
    isRead: true,
  },
  {
    id: "notice-3",
    title: "시스템 점검 안내",
    message: "본 사이트는 데모 전용입니다.",
    kind: "고객센터",
    createdAt: "2026-09-14T00:00:00.000Z",
    isRead: false,
  },
];
