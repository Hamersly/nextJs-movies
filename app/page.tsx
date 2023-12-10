import {Box, Typography} from '@mui/material';
import {homeContentStyle, homeTypographyStyle} from '@/app/page.styled';
import {ContentUnit} from '@/components/ContentUnit/ContentUnit';
import {getTopList} from '@/helpers/getContent';


export default async function Home() {
  const {results}: any = await getTopList();
  return (
    <>
      <Typography sx={homeTypographyStyle} variant="h4">Топ 10 фильмов</Typography>
      <Box sx={homeContentStyle}>
        {Array.from(results).slice(0, 10).map((result: any) =>
          <ContentUnit format={'movie'} content={result} key={result.id}/>)
        }
      </Box>
    </>
  );
}
