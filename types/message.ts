export interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}