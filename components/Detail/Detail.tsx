'use client';
import { FC, useEffect, useReducer } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import {
  detailBoxStyle,
  detailInfoBoxStyle,
  errorTypographyStyle,
  genresBoxStyle,
  typographyStyle,
  chipStyle,
} from '../Detail/detail.styled';
import { LoadingFallback } from '@/components/UI/LoadingFallback/LoadingFallback';
import { ImageBox } from '../ImageBox/ImageBox';
import { IDetailResponse } from '@/types/types';
import { getDetail } from '@/helpers/getContent';
import { useParams } from 'next/navigation';
import { detailImageStyle, detailPosterStyle } from './detail.styled';

type DetailState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: IDetailResponse };

type DetailAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_OK'; data: IDetailResponse }
  | { type: 'FETCH_FAIL' };

function detailReducer(state: DetailState, action: DetailAction): DetailState {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_OK':
      return { status: 'ready', data: action.data };
    case 'FETCH_FAIL':
      return { status: 'error' };
  }
}

export const Detail: FC = () => {
  const [state, dispatch] = useReducer(detailReducer, { status: 'loading' });
  // Параметры из URL: /movie/123 → slug=movie, id=123
  const params = useParams<{ slug: string; id: string }>();
  const format = params.slug;
  const id = params.id;

  // Запрос к TMDB через прокси. Флаг cancelled предотвращает утечку памяти.
  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    dispatch({ type: 'FETCH_START' });
    const fetchData = async () => {
      const response = await getDetail(format, id, abortController.signal);
      if (!cancelled) dispatch({ type: 'FETCH_OK', data: response });
    };
    fetchData().catch(() => {
      if (!cancelled) dispatch({ type: 'FETCH_FAIL' });
    });
    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [format, id]);

  if (state.status === 'loading') return <LoadingFallback />;

  if (state.status === 'error') {
    return (
      <Box sx={detailBoxStyle}>
        <Typography sx={errorTypographyStyle} variant="h6" align="center">
          Данные недоступны
        </Typography>
      </Box>
    );
  }

  const {
    title,
    original_title,
    name,
    original_name,
    backdrop_path,
    overview,
    genres,
  }: IDetailResponse = state.data;

  return (
    <Box sx={detailBoxStyle}>
      <Typography sx={typographyStyle} variant="h4" align="center" mb={2}>
        {format === 'movie' ? title : name}
      </Typography>

      <Typography sx={typographyStyle} variant="subtitle1" align="center">
        {format === 'movie' ? original_title : original_name}
      </Typography>

      {genres && genres?.length ? (
        <Box sx={genresBoxStyle}>
          {genres.map((genre: { id: number; name: string }) => (
            <Chip sx={chipStyle} label={genre.name} key={genre.id} />
          ))}
        </Box>
      ) : null}
      <Box sx={detailInfoBoxStyle}>
        <ImageBox
          img_path={backdrop_path}
          errorImgSrc={'/notFound2.png'}
          imageStyle={detailImageStyle}
          posterStyle={detailPosterStyle}
          imgWidth={500}
          imgHeight={350}
          backdropWidth={5000}
          backdropHeight={3500}
          alt={format === 'movie' ? title : name || ''}
        />

        <Typography sx={typographyStyle} variant="h6" align="center" mt={4}>
          {overview}
        </Typography>
      </Box>
    </Box>
  );
};
