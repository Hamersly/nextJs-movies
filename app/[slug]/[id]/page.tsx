import {Metadata} from 'next';
import {detailBoxStyle, detailImageStile, detailInfoBoxStyle, typographyStyle} from '@/components/Detail/detail.styled';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import {rgbDataURL} from '@/helpers/blur';
import {IDetailResponse} from '@/types/types';

interface IProps {
  params: {
    id: string,
  }
}

export async function generateMetadata({params: {id}}: IProps): Promise<Metadata> {
  return {
    title: id,
    description: '',
  };
}

export async function detail(format: string, id: string) {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3';
  const url: string = `${BASE_URL}/${format}/${id}?api_key=${API_KEY}&language=ru-RU`;
  const response = await fetch(url);
  return await response.json();
}

export default async function Page({searchParams}: any) {
  const {format, id} = searchParams;
  const {
    title,
    original_title,
    name,
    original_name,
    backdrop_path,
    overview
  }: IDetailResponse = await detail(format, id);
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
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            width={500}
            height={350}
            style={detailImageStile}
            placeholder="blur"
            blurDataURL={rgbDataURL(163, 163, 163)}
            priority={true}
            alt=""
          />
          <Typography sx={typographyStyle} variant="h6" align="center" mt={4}>
            {overview}
          </Typography>

        </Box>
      </Box>

      {/*<Detail/>*/}
    </>
  );
}