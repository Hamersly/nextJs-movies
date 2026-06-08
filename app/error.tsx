'use client';

import { ErrorFallback } from '@/components/UI/ErrorFallback/ErrorFallback';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorFallback
      title="Что-то пошло не так"
      message={error.message || 'Неизвестная ошибка'}
      reset={reset}
    />
  );
}
