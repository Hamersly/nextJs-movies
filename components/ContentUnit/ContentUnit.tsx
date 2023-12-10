'use client';
import React, {FC} from 'react';
import Image from 'next/image';
import Backdrop from '@mui/material/Backdrop';
import {Box, Typography} from '@mui/material';
import {
  unitBoxStyle,
  unitImageBoxStyle,
  unitImageStile,
  unitInfoBoxStyle,
  unitPosterStile,
  unitTypographyStyle
} from './CounterUnit.styled';
import {IContent} from '@/types/types';
import {Links} from '../Links/Links';
import {rgbDataURL} from '@/helpers/blur';

interface IProps {
  format?: string;
  content: any;
}

export const ContentUnit: FC<IProps> = ({format, content}) => {
  const [open, setOpen] = React.useState(false);
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={unitBoxStyle}>
      <Box sx={unitImageBoxStyle}>
        <Image
          onClick={handleToggle}
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          width={350}
          height={500}
          style={unitImageStile}
          placeholder="blur"
          blurDataURL={rgbDataURL(163, 163, 163)}
          alt=""
        />
        <Backdrop
          sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
          open={open}
          onClick={handleClose}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            width={3500}
            height={5000}
            style={unitPosterStile}
            quality={100}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            alt=""
          />
        </Backdrop>
      </Box>

      <Box sx={unitInfoBoxStyle}>
        <Links href={{
          pathname: `/${format}/${id}`,
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

    </Box>
  );
};
