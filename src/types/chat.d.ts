import {UserProfile} from 'types/user';

export interface Chat {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: number;
  matchId: number;
  idPerChat: number;
  userId: number | null;
  content: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ChatUser {
  id: number;
  chatId: number;
  userId: number;
}

export interface ChatRoom {
  matchId: number;
  lastMessage: string;
  hasNewLastMessage: boolean;
  opponent: {
    userId: number;
    userProfile: UserProfile;
  };
}
