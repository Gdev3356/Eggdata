export type UserRank = 'EGG_MASTER' | 'GENERAL' | 'ROBOT' | 'RECRUIT';

export interface User {
  id: number;
  userName: string;
  rank: UserRank;
}

export interface AuthContextType {
  user: User | null;
  login: (userName: string, password: string) => Promise<boolean>;
  logout: () => void;
  canRegister: boolean;
}