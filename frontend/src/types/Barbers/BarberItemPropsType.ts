import { ReactNode } from 'react';

export interface BarberItemPropsType {
 file: string;
id: number;
password: string;
role: string;
username: string;
  index: number;
  children?: ReactNode;
}