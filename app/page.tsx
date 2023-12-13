import {Box, Typography} from '@mui/material';
import {ContentUnit} from '@/components/ContentUnit/ContentUnit';
import {homeContentStyle, homeTypographyStyle} from '@/app/page.styled';

export async function getData() {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3';
  const url: string = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc`;
  const response = await fetch(url);
  return await response.json();
}

export default async function Page() {
  const {results} = await getData();
  return (
    <>
      <Typography sx={homeTypographyStyle} variant="h4">Топ 10 фильмов</Typography>
      <Box sx={homeContentStyle}>
        {results && Array.from(results).slice(0, 10).map((result: any) =>
          <ContentUnit format={'movie'} content={result} key={result.id}/>)
        }
      </Box>
    </>
  );
}
