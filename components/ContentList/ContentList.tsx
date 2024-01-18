'use client';
import {FC, useEffect, useState} from 'react';
import {ContentUnit} from '../ContentUnit/ContentUnit';
import {Box, Typography} from '@mui/material';
import {IHandleChangeFunc, IListResponse} from '@/types/types';
import {Loader} from '../UI/Loader/Loader';
import {cLBoxStyle, contentBoxStyle, contentTypographyStyle} from '@/components/ContentList/ContentList.styled';
import {BasePagination} from '../BasePagination/BasePagination';
import {getContentList, getSearchResult} from '@/helpers/getContent';
import {SortedContent} from '../SortedContent/SortedContent';
import {Scroll} from '../UI/Scroll/Scroll';
import {motion} from 'framer-motion';
import {listVariants} from '@/helpers/helpers';


interface IProps {
  format?: string;
  search?: string;
}

export const ContentList: FC<IProps> = ({format = 'movie', search = null}) => {
  const [sort, setSort] = useState('popularity');
  const [data, setData] = useState<IListResponse>({page: 1, results: [], total_pages: 1});
  let {page, results, total_pages}: IListResponse = data;
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(`${format}Page`)) {
      page = Number(sessionStorage.getItem(`${format}Page`));
    } else {
      sessionStorage.setItem(`${format}Page`, `${page}`);
    }

    const fetchData = async () => {
      let requestFunc;
      if (search === null) {
        requestFunc = getContentList(format, sort, page);
      } else {
        requestFunc = getSearchResult(search, page);
      }
      const response: any = await requestFunc;
      setData(response);
      setDomLoaded(true);
    };
    fetchData()
      .catch(console.error);
  // }
  }, [format, sort, search]);

  const handleChange: IHandleChangeFunc = async (_event: object, page: number) => {
    const response: any = await getContentList(format, sort, page);
    setData(response);
    sessionStorage.setItem(`${format}Page`, page.toString());
  };

  const sorted = (param: string) => setSort(param);

  return ((!domLoaded) ? <Loader/>
    :
    (results !== undefined && !results.length) ?
      <Typography sx={contentTypographyStyle} variant="h4" align="center">
          Ничего не найдено:(
      </Typography>
      :
      (results !== undefined && results.length) ?
        <>
          <Box sx={contentBoxStyle}>
            {search === null &&
                <Box sx={cLBoxStyle}>
                  <SortedContent sort={sorted}/>
                </Box>
            }

            <Box sx={cLBoxStyle}>
              <BasePagination page={page} total_pages={total_pages} handleChange={handleChange}/>
            </Box>

            {results.map((result: any) =>
              <motion.div
                style={{width: '100%', maxWidth: '800px'}}
                key={result.id}
                variants={listVariants}
                initial='hidden'
                animate='show'
              >
                <ContentUnit
                  format={format}
                  content={result}
                />
              </motion.div>)
            }

            <Box sx={cLBoxStyle}>
              <BasePagination page={page} total_pages={total_pages} handleChange={handleChange}/>
            </Box>
            <Scroll/>
          </Box>
        </>
        :
        null
  );
};