'use client';

import { Box, Typography, Button } from '@mui/material';

interface IProps {
  title?: string;
  message?: string;
  reset?: () => void;
}

export function ErrorFallback({
  title = 'Что-то пошло не так',
  message = 'Попробуйте позже',
  reset,
}: IProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {message}
      </Typography>
      {reset && (
        <Button variant="contained" onClick={reset}>
          Попробовать снова
        </Button>
      )}
    </Box>
  );
}
