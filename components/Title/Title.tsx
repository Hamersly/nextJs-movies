import {Box, Typography} from '@mui/material';
import {titleBoxStyle, titleOneStyle, titleTwoStyle} from '@/components/Title/Title.styled';
import {Links} from '../Links/Links';

export const Title = () => {
  return (
    <Box sx={titleBoxStyle}>
      <Typography sx={titleOneStyle} variant="h2">
        <Links href={'/'}>ВидеоПоиск</Links>
      </Typography>
      <Typography sx={titleTwoStyle} variant="h4">
        <Links href={'/movie'}>Фильмы</Links> и <Links href={'/tv'}>Сериалы</Links>
      </Typography>
    </Box>
  );
};