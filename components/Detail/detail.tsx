'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Chip, Typography} from '@mui/material';
import {chipStyle, detailBoxStyle, detailInfoBoxStyle, typographyStyle} from '../Detail/detail.styled';
import {Loader} from '@/components/UI/Loader/Loader';
import {IDetailResponse} from '@/types/types';
import {useSearchParams} from 'next/navigation';
import {motion} from 'framer-motion';
import {listVariants} from '@/helpers/helpers';
import {ImageBox} from '@/components/ImageBox/ImageBox';

interface IProps {
  data: any
}

export const Detail: FC<IProps> = ({data}) => {
  const {title, original_title, name, original_name, backdrop_path, overview, genres}: IDetailResponse = data;
  const [domLoaded, setDomLoaded] = useState(false);
  const searchParams = useSearchParams();
  const format = searchParams.get('format');

  // console.log(url)

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const MotionBox = motion(Box);

  if (!domLoaded) return <Loader/>;
  return (
    <>
      {data ? <MotionBox
        sx={detailBoxStyle}
        variants={listVariants}
        initial='hidden'
        animate='show'
      >

        <Typography sx={typographyStyle} variant="h4" align="center" mb={2}>
          {format === 'movie' ? title : name}
        </Typography>

        <Typography sx={typographyStyle} variant="subtitle1" align="center">
          {format === 'movie' ? original_title : original_name}
        </Typography>

        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {genres?.length && genres.map((genre: { id: number, name: string }) =>
            <Chip sx={chipStyle} label={genre.name} key={genre.id}/>
          )}
        </Box>
        <Box sx={detailInfoBoxStyle}>
          <ImageBox backdrop_path={backdrop_path}/>

          <Typography sx={typographyStyle} variant="h6" align="center" mt={4}>
            {overview}
          </Typography>
        </Box>
      </MotionBox>
        :
        <></>
      }
    </>
  );
};