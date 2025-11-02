import { ReactNode } from 'react';

export interface BasicBarberType {
  id: number;
  username: string;
  file: string;
  role: string;
  suspended: number;
}

export interface ExtendedBarberType extends BasicBarberType {
  index: number;
  children?: ReactNode;
}

export interface BarberSliceType {
  barbers: BasicBarberType[];
  loggedBarber: BasicBarberType;
  actionBarberId: number | undefined;
}