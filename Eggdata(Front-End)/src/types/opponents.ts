export type OpponentStatus = 'UNKNOWN' | 'ALIVE' | 'ELIMINATED' | 'CAPTURED';

export type OpponentLevel  = 'UNKNOWN' | 'MINOR' | 'NUISANCE' | 'SERIOUS' |'EXTREME';
export interface Opponent {
  id: number;
  name: string;
  species: string;
  powers: string;
  age: number;
  gender?: string;
  weakness?: string;
  status: OpponentStatus;
  personality: string;
  friends: string;
  level: OpponentLevel;
}