'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Typography, Chip} from '@mui/material';
import {
  detailBoxStyle,
  detailImageStile,
  detailInfoBoxStyle,
  detailPosterStile,
  typographyStyle,
  chipStyle
} from '../Detail/detail.styled';
import Image from 'next/image';
import {rgbDataURL} from '@/helpers/blur';
import {Loader} from '@/components/UI/Loader/Loader';
import {IDetailResponse} from '@/types/types';
import {getDetail} from '@/helpers/getContent';
import {useSearchParams} from 'next/navigation';
import { motion } from 'framer-motion';
import {listVariants} from '@/helpers/helpers';
import {BackdropImg} from '@/components/UI/BackdropImg/BackdropImg';

export const Detail: FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IDetailResponse>({});
  const {title, original_title, name, original_name, backdrop_path, overview, genres}: IDetailResponse = data;
  const [domLoaded, setDomLoaded] = useState(false);
  const searchParams = useSearchParams();
  const format = searchParams.get('format');
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getDetail(format, id);
      setData(response);
      setDomLoaded(true);
    };
    fetchData()
      .catch(console.error);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

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
          <Image
            onClick={handleToggle}
            src={
              backdrop_path
                ?
                `https://image.tmdb.org/t/p/original${backdrop_path}`
                :
                'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg'}
            width={500}
            height={350}
            style={detailImageStile}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            alt=""
          />
          <BackdropImg
            handleClose={handleClose}
            path={backdrop_path}
            open={open}
            width={5000}
            height={3500}
            styles={detailPosterStile}
          />

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