'use client';
import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { ContentUnit } from '../ContentUnit/ContentUnit';
import { Box, Typography } from '@mui/material';
import { IContent, IHandleChangeFunc, IListResponse } from '@/types/types';
import { LoadingFallback } from '@/components/UI/LoadingFallback/LoadingFallback';
import {
  cLBoxStyle,
  contentBoxStyle,
  contentItemStyle,
  contentTypographyStyle,
  errorTypographyStyle,
} from '@/components/ContentList/ContentList.styled';
import { BasePagination } from '../BasePagination/BasePagination';
import { getContentList, getSearchResult } from '@/helpers/getContent';
import { SortedContent } from '../SortedContent/SortedContent';
import { Scroll } from '../UI/Scroll/Scroll';

interface IProps {
  format?: string;
  search?: string;
}

const readPage = (format: string): number => {
  const saved = sessionStorage.getItem(`${format}Page`);
  if (saved) return Number(saved);
  sessionStorage.setItem(`${format}Page`, '1');
  return 1;
};

type ListState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: IListResponse };

type ListAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_OK'; data: IListResponse }
  | { type: 'FETCH_FAIL' };

function listReducer(state: ListState, action: ListAction): ListState {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_OK':
      return { status: 'ready', data: action.data };
    case 'FETCH_FAIL':
      return { status: 'error' };
  }
}

export const ContentList: FC<IProps> = ({ format = 'movie', search = null }) => {
  const [sort, setSort] = useState('popularity');
  const [page, setPage] = useState(() => readPage(format));
  const [state, dispatch] = useReducer(listReducer, { status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    dispatch({ type: 'FETCH_START' });
    const fetchData = async () => {
      let requestFunc;
      if (search === null) {
        requestFunc = getContentList(format, sort, page, abortController.signal);
      } else {
        requestFunc = getSearchResult(search, page, abortController.signal);
      }
      const response: IListResponse = await requestFunc;
      if (!cancelled) dispatch({ type: 'FETCH_OK', data: response });
    };
    fetchData().catch(() => {
      if (!cancelled) dispatch({ type: 'FETCH_FAIL' });
    });
    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [format, sort, search, page]);

  const handleChange: IHandleChangeFunc = useCallback(
    (_event, newPage) => {
      setPage(newPage);
      sessionStorage.setItem(`${format}Page`, newPage.toString());
    },
    [format],
  );

  const sorted = useCallback((param: string) => setSort(param), []);

  if (state.status === 'loading') return <LoadingFallback />;

  if (state.status === 'error') {
    return (
      <Typography sx={errorTypographyStyle} variant="h6" align="center">
        Данные недоступны
      </Typography>
    );
  }

  const { results, total_pages } = state.data;

  return results !== undefined && !results.length ? (
    <Typography sx={contentTypographyStyle} variant="h4" align="center">
      Ничего не найдено:(
    </Typography>
  ) : results !== undefined && results.length ? (
    <>
      <Box sx={contentBoxStyle}>
        {search === null && (
          <Box sx={cLBoxStyle}>
            <SortedContent sort={sorted} />
          </Box>
        )}

        <Box sx={cLBoxStyle}>
          <BasePagination page={page} total_pages={total_pages} handleChange={handleChange} />
        </Box>

        {results.map((result: IContent, i: number) => (
          <Box sx={contentItemStyle} key={result.id}>
            {/* i === 0 — первый постер страницы грузится с priority для LCP */}
            <ContentUnit format={format} content={result} priority={i === 0} />
          </Box>
        ))}

        <Box sx={cLBoxStyle}>
          <BasePagination page={page} total_pages={total_pages} handleChange={handleChange} />
        </Box>
        <Scroll />
      </Box>
    </>
  ) : null;
};
