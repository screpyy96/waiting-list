import { useState } from 'react';
import { type WaitingListEntry, type ApiResponse } from '@/core/types/common';

type UseWaitingListProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export function useWaitingList({ onSuccess, onError }: UseWaitingListProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinWaitingList = async (email: string, name?: string, phone?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, phone }),
      });

      const data: ApiResponse<WaitingListEntry> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      onSuccess?.();
      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    joinWaitingList,
    isLoading,
    error,
  };
} 