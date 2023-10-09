export interface SwipeHistories {
  id: number;
  userId: number | null;
  swipedUserId: number | null;
  type: string | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
