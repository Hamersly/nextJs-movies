'use client';
import {FC, useState} from 'react';
import Image from 'next/image';
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
import {BackdropImg} from '@/components/UI/BackdropImg/BackdropImg';
import {motion} from 'framer-motion';

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

  const MotionBox = motion(Box);

  return (
    <MotionBox
      sx={unitBoxStyle}
      whileHover={{scale: 1.1}}
    >
      <Box sx={unitImageBoxStyle}>
        <Box sx={unitImageShadowBoxStyle}>
          <Image
            onClick={handleToggle}
            src={`${process.env.NEXT_PUBLIC_URL_IMG}${poster_path}`}
            width={350}
            height={500}
            style={unitImageStile}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            alt=""
            onError={({currentTarget}) => {
              currentTarget.onerror = null;
              currentTarget.src = '/notFound.png';
            }}
          />
        </Box>
        <BackdropImg
          handleClose={handleClose}
          path={poster_path}
          open={open}
          width={3500}
          height={5000}
          styles={unitPosterStile}
        />
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
