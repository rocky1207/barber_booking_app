import { ReactNode } from 'react';

export interface BarberType {
  file: string;
  id: number;
  password: string;
  role: string;
  username: string;
  index: number;
  children?: ReactNode;
}

export interface BarberSliceType {
  barbers: BarberType[];
  currentBarberId: string;
}