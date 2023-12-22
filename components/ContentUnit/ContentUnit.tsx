'use client';
import {FC, useState} from 'react';
import Image from 'next/image';
import Backdrop from '@mui/material/Backdrop';
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
import {rgbDataURL} from '@/helpers/blur';

interface IProps {
  format?: string;
  content: any;
}

export const ContentUnit: FC<IProps> = ({format, content}) => {
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={unitBoxStyle}>
      <Box sx={unitImageBoxStyle}>
        <Box sx={unitImageShadowBoxStyle}>
          <Image
            onClick={handleToggle}
            src={
              poster_path
                ?
                `https://image.tmdb.org/t/p/original${poster_path}`
                : 
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyksNfiHo_balKy9xA2xVP-8w1hULHaFxUQNYjyTOhh2u_AK_srEptjHGyuzOWpMetIc&usqp=CAU'
            }
            width={350}
            height={500}
            style={unitImageStile}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            alt=""
          />
        </Box>
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

    </Box>
  );
};
