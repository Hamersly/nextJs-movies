'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Typography, Chip} from '@mui/material';
import {
  detailBoxStyle,
  detailInfoBoxStyle,
  typographyStyle,
  chipStyle
} from '../Detail/detail.styled';
import {Loader} from '@/components/UI/Loader/Loader';
import {ImageBox} from '../ImageBox/ImageBox';
import {IDetailResponse} from '@/types/types';
import {getDetail} from '@/helpers/getContent';
import {useSearchParams} from 'next/navigation';
import { motion } from 'framer-motion';
import {listVariants} from '@/helpers/helpers';
import {detailImageStile, detailPosterStile} from './detail.styled';

export const Detail: FC = () => {
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
  }, [format, id]);

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

        {(genres && genres?.length) ?
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {genres.map((genre: { id: number, name: string }) =>
              <Chip sx={chipStyle} label={genre.name} key={genre.id}/>
            )}
          </Box> :
          <></>
        }
        <Box sx={detailInfoBoxStyle}>
          <ImageBox
            img_path={backdrop_path}
            errorImgSrc={'/notFound2.png'}
            imageStile={detailImageStile}
            posterStile={detailPosterStile}
            imgWidth={500}
            imgHeight={350}
            backdropWidth={5000}
            backdropHeight={3500}
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