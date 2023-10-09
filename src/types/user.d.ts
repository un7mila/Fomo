export interface User {
  id: number;
  name: string | null;
  googleEmail: string | null;
  profileImage: string | null;
  birth: Date | null;
  gender: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id: number;
  userId: number | null;
  name: string;
  description: string | null;
  birth: Date | null;
  image: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type Tokens = {
  token: string;
  refreshToken: string;
};
