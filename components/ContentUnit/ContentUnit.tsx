'use client';
import {FC} from 'react';
import {Box, Typography} from '@mui/material';
import {
  unitBoxStyle,
  unitImageBoxStyle,
  unitImageShadowBoxStyle,
  unitImageStile,
  unitInfoBoxStyle,
  unitPosterStile,
  unitTypographyStyle
} from './CounterUnit.styled';
import {IContent} from '@/types/types';
import {Links} from '../Links/Links';
import {motion} from 'framer-motion';
import {ImageBox} from '@/components/ImageBox/ImageBox';

interface IProps {
  format?: string;
  content: any;
}

export const ContentUnit: FC<IProps> = ({format, content}) => {
  const {
    poster_path,
    id,
    title,
    name,
    original_title,
    original_name,
    release_date,
    first_air_date,
    popularity
  }: IContent = content;

  const param = format === 'movie' ? original_title : original_name;
  const MotionBox = motion(Box);

  return (
    <MotionBox
      sx={unitBoxStyle}
      // whileHover={{scale: 1.1}}
    >
      <Box sx={unitImageBoxStyle}>
        <Box sx={unitImageShadowBoxStyle}>
          <ImageBox
            img_path={poster_path}
            errorImgSrc={'/notFound.png'}
            imageStile={unitImageStile}
            posterStile={unitPosterStile}
            imgWidth={350}
            imgHeight={500}
            backdropWidth={3500}
            backdropHeight={5000}
          />
        </Box>
      </Box>

      <Box sx={unitInfoBoxStyle}>
        <Links href={{
          pathname: `/${format}/${param}`,
          query: {format: format, id: `${id}`},
        }}>
          <Typography sx={unitTypographyStyle} variant="h6">
            {format === 'movie' ? `"${title}"` :
              format === 'tv' && `"${name}"`}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            {format === 'movie' ? `"${original_title}"` :
              format === 'tv' && `"${original_name}"`}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            Премьера: {format === 'movie' ? release_date :
              format === 'tv' && first_air_date}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            Рейтинг: {popularity}
          </Typography>
        </Links>
      </Box>
    </MotionBox>
  );
};
