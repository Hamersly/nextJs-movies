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
  const {title, original_title, name, original_name, backdrop_path, overview}: IDetailResponse = data;
  const [domLoaded, setDomLoaded] = useState(false);
  const searchParams = useSearchParams();
  const [imageSrc, setImageSrc] = useState(`https://image.tmdb.org/t/p/original${backdrop_path}`)
  const format = searchParams.get('format');
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getDetail(format, id);
      setData(response);
    };
    fetchData()
      .catch(console.error);
    setDomLoaded(true);
  }, [format, id,]);

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

        <Box sx={detailInfoBoxStyle}>
          <Image
            onClick={handleToggle}
            src={imageSrc}
            width={500}
            height={350}
            style={detailImageStile}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            priority={true}
            onError={() => setImageSrc('/no_image_width.jpg')}
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
              priority={true}
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