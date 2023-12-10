'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {topTypographyStyle, topContentStyle} from '../TopList/TopList.styled';
import {ContentUnit} from '@/components/ContentUnit/ContentUnit';
import {getTopList} from '@/helpers/getContent';

export const TopList:FC = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {results}: any = await getTopList();
      setResults(results);
    };
    fetchData()
      .catch(console.error);
  }, []);
  return (
    <>
      <Typography sx={topTypographyStyle} variant="h4">Топ 10 фильмов</Typography>
      <Box sx={topContentStyle}>
        {Array.from(results).slice(0, 10).map((result: any) =>
          <ContentUnit format={'movie'} content={result} key={result.id}/>)
        }
      </Box>
    </>
  );
};