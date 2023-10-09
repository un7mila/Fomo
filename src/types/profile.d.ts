export interface ProfileGroups {
  id: number;
  name: string;
  priority: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  profileItems: ProfileItems[];
}

export interface ProfileItems {
  id: number;
  profileGroupId: number;
  name: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface UserProfileItems {
  id: number;
  userId: number;
  profileItemId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
