'use client';
import {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {topTypographyStyle, topContentStyle} from '../TopList/TopList.styled';
import {ContentUnit} from '@/components/ContentUnit/ContentUnit';
import {getTopList} from '@/helpers/getContent';
import {Loader} from '@/components/UI/Loader/Loader';

export const TopList:FC = () => {
  const [results, setResults] = useState([]);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {results}: any = await getTopList();
      setResults(results);
    };
    fetchData()
      .catch(console.error);

    setDomLoaded(true);
  }, []);

  if(!domLoaded) return <Loader/>;

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
