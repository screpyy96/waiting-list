import { type ReactNode } from 'react';

export type BaseProps = {
  className?: string;
  children?: ReactNode;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
};

export type WaitingListEntry = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
}; 