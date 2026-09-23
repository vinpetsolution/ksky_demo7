export interface MessageThreadSummary {
  id: string;
  createdBy?: string;
  recipientUsername?: string;
  recipientType?: string;
  unreadByRecipient?: boolean;
  unreadBySender?: boolean;
  subject?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  createdAt?: string;
}

export interface ThreadMessage {
  id: string;
  threadId?: string;
  senderUsername?: string;
  senderNickname?: string;
  content?: string;
  createdAt?: string;
}
