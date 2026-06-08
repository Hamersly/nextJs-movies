import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { notFoundBoxStyle, notFoundMessageStyle, notFoundLinkStyle } from './not-found.styled';

export default function NotFound() {
  return (
    <Box sx={notFoundBoxStyle}>
      <Typography variant="h4" gutterBottom>
        404 — Страница не найдена
      </Typography>
      <Typography variant="body1" sx={notFoundMessageStyle}>
        Такой страницы не существует
      </Typography>
      <Link href="/" style={notFoundLinkStyle}>
        Вернуться на главную
      </Link>
    </Box>
  );
}
