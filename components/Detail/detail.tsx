'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
  detailBoxStyle,
  detailImageStile,
  detailInfoBoxStyle,
  detailPosterStile,
  typographyStyle
} from '../Detail/detail.styled';
import Image from 'next/image';
import {rgbDataURL} from '@/helpers/blur';
import Backdrop from '@mui/material/Backdrop';
import {Loader} from '@/components/UI/Loader/Loader';
import {IDetailResponse} from '@/types/types';
import {getDetail} from '@/helpers/getContent';
import {useSearchParams} from 'next/navigation';


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
  }, [format, id]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  if (!domLoaded) return <Loader/>;
  return (
    <>
      <Box sx={detailBoxStyle}>

        <Typography sx={typographyStyle} variant="h4" align="center" mb={2}>
          {format === 'movie' ? title : name}
        </Typography>

        <Typography sx={typographyStyle} variant="h5" align="center">
          {format === 'movie' ? original_title : original_name}
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          {genres?.length && genres.map((result: {id: number, name: string}, index) =>
            <Typography mr={2} mt={2} sx={typographyStyle} variant="subtitle1" align="center" key={index}>
              {result.name}
            </Typography>
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
          <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
            onClick={handleClose}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              width={5000}
              height={3500}
              style={detailPosterStile}
              quality={100}
              placeholder="blur"
              blurDataURL={rgbDataURL(163, 163, 163)}
              alt=""
            />
          </Backdrop>

          <Typography sx={typographyStyle} variant="h6" align="center" mt={4}>
            {overview}
          </Typography>

        </Box>
      </Box>

    </>
  );
};