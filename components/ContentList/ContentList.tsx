'use client';
import {FC, useEffect, useState} from 'react';
import {ContentUnit} from '../ContentUnit/ContentUnit';
import {Box} from '@mui/material';
import {IHandleChangeFunc, IListResponse} from '@/types/types';
import {Loader} from '../UI/Loader/Loader';
import {cLBoxStyle, contentBoxStyle} from '@/components/ContentList/ContentList.styled';
import {BasePagination} from '../BasePagination/BasePagination';
import {getContentList, getSearchResult} from '@/helpers/getContent';
import {SortedContent} from '../SortedContent/SortedContent';
import {Scroll} from '../UI/Scroll/Scroll';


interface IProps {
  format?: string;
  search?: string;
}

export const ContentList: FC<IProps> = ({format = 'movie', search = null}) => {
  const [sort, setSort] = useState('popularity');
  const [data, setData] = useState<IListResponse>({page: 1, results: [], total_pages: 1});
  const {page, results, total_pages}: IListResponse = data;

  useEffect(() => {
    if (search === null) {
      const fetchData = async () => {
        const response: any = await getContentList(format, sort, page);
        setData(response);
      };
      fetchData()
        .catch(console.error);
    } else {
      const fetchData = async () => {
        const response: any = await getSearchResult(search, page);
        setData(response);
      };
      fetchData()
        .catch(console.error);
    }
  }, [format, page, sort, search]);

  const handleChange: IHandleChangeFunc = async (_event: object, page: number) => {
    const response: any = await getContentList(format, sort, page);
    setData(response);
  };

  const sorted = (param: string) => {
    setSort(param);
  };

  return (
    <Box sx={contentBoxStyle}>
      {results && search === null ?
        <Box sx={cLBoxStyle}>
          <SortedContent sort={sorted}/>
        </Box>
        :
        <></>
      }
      {results &&
        <Box sx={cLBoxStyle}>
          <BasePagination page={page} total_pages={total_pages} handleChange={handleChange}/>
        </Box>
      }

      {results ?
        results.map((result: any) =>
          <ContentUnit format={format} content={result} key={result.id}/>)
        :
        <Loader/>
      }

      {results &&
        <Box sx={cLBoxStyle}>
          <BasePagination page={page} total_pages={total_pages} handleChange={handleChange}/>
        </Box>
      }

      <Scroll/>

    </Box>
  );
};
