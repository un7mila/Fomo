import {User} from 'types/user';

export interface Matches {
  id: number;
  userId: number | null;
  opponentId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  opponentUser: User;
}

export interface MatchUsers {
  matchId: number;
  userId: number;
  user: User;
}
