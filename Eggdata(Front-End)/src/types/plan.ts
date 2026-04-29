import type { UserRank } from '../types/user';
import type { Opponent } from './opponents';

export interface Plan {
  id: number;
  codeName: string;
  description: string;
  rank: UserRank;
  creator: { 
    id: number; 
    name?: string; 
  };
  targets: Opponent[];
  creationDate: string;
}