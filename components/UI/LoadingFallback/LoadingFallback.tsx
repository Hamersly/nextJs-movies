import { Box, CircularProgress } from '@mui/material';

export function LoadingFallback() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
      <CircularProgress size={90} />
    </Box>
  );
}
