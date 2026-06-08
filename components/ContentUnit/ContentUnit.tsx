'use client';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import {
  unitBoxStyle,
  unitImageBoxStyle,
  unitImageShadowBoxStyle,
  unitImageStyle,
  unitInfoBoxStyle,
  unitPosterStyle,
  unitTypographyStyle,
} from './ContentUnit.styled';
import { IContent } from '@/types/types';
import { Links } from '../Links/Links';
import { ImageBox } from '@/components/ImageBox/ImageBox';

interface IProps {
  format?: string;
  content: IContent;
  priority?: boolean;
}

export const ContentUnit: FC<IProps> = ({ format, content, priority = false }) => {
  const {
    poster_path,
    id,
    title,
    name,
    original_title,
    original_name,
    release_date,
    first_air_date,
    popularity,
  }: IContent = content;

  return (
    <Box sx={unitBoxStyle}>
      <Box sx={unitImageBoxStyle}>
        <Box sx={unitImageShadowBoxStyle}>
          <ImageBox
            img_path={poster_path}
            errorImgSrc={'/notFound.png'}
            imageStyle={unitImageStyle}
            posterStyle={unitPosterStyle}
            imgWidth={350}
            imgHeight={500}
            backdropWidth={3500}
            backdropHeight={5000}
            alt={title || name || ''}
            priority={priority}
          />
        </Box>
      </Box>

      <Box sx={unitInfoBoxStyle}>
        <Links
          href={{
            pathname: `/${format}/${id}`,
          }}
        >
          <Typography sx={unitTypographyStyle} variant="h6">
            {format === 'movie' ? `"${title}"` : `"${name}"`}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            {format === 'movie' ? `"${original_title}"` : `"${original_name}"`}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            Премьера: {format === 'movie' ? release_date : first_air_date}
          </Typography>

          <Typography sx={unitTypographyStyle} mt={2} variant="inherit">
            Рейтинг: {popularity}
          </Typography>
        </Links>
      </Box>
    </Box>
  );
};
