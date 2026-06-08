import { Box, Typography } from '@mui/material';
import { ContentUnit } from '@/components/ContentUnit/ContentUnit';
import { homeContentStyle, homeTypographyStyle } from '@/app/page.styled';
import { getTopList } from '@/helpers/getContent';

// Главная страница: ISR с ревалидацией раз в час.
// getTopList() вызывается на сервере и ходит напрямую в TMDB (не через прокси).
export const revalidate = 3600;

export default async function Page() {
  const { results } = await getTopList();
  const items = Array.isArray(results) ? results.slice(0, 10) : [];
  return (
    <>
      <Typography sx={homeTypographyStyle} variant="h4">
        Топ 10 фильмов
      </Typography>

      <Box sx={homeContentStyle}>
        {items.length ? (
          items.map((result) => <ContentUnit format="movie" content={result} key={result.id} />)
        ) : (
          <Typography sx={homeTypographyStyle} variant="h6">
            Данные недоступны
          </Typography>
        )}
      </Box>
    </>
  );
}
