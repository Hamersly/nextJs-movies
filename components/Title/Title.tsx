'use client';

import {Box, Typography} from '@mui/material';
import {titleBoxStyle, titleOneStyle, titleTwoStyle} from '@/components/Title/Title.styled';
import {Links} from '../Links/Links';
import {motion} from 'framer-motion';

export const Title = () => {

  const MotionTitleTopography = motion(Typography);

  const linkVariant = {
    hidden: {
      y: 20,
      opacity: 0
    },
    showTitle_1: {
      y: 0,
      opacity: 1,
      transition: {type: 'spring'}
    },
    showTitle_2: {
      y: 0,
      opacity: 1,
      transition: {type: 'spring', delay: 0.5}
    },
    hover: {
      scale: 1.15
    }
  };
  
  return (
    <Box sx={titleBoxStyle}>
      <MotionTitleTopography
        sx={titleOneStyle}
        variant="h2"
        variants={linkVariant}
        initial='hidden'
        animate='showTitle_1'
        whileHover='hover'
      >
        <Links href={'/'}>ВидеоПоиск</Links>
      </MotionTitleTopography>
      <MotionTitleTopography
        sx={titleTwoStyle}
        variant="h4"
        variants={linkVariant}
        initial='hidden'
        animate='showTitle_2'
        whileHover='hover'
      >
        <Links href={'/movie'}>Фильмы</Links> и <Links href={'/tv'}>Сериалы</Links>
      </MotionTitleTopography>
    </Box>
  );
};