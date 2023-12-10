import {FC} from 'react';
import Pagination from '@mui/material/Pagination';
import {IHandleChangeFunc} from '@/types/types';
import {basePaginationStyle} from './BasePagination.styled';

interface IProps {
  page: number;
  total_pages: number;
  handleChange: IHandleChangeFunc;
}

export const BasePagination: FC<IProps> = ({page, total_pages, handleChange}) => {
  return (
    <Pagination
      sx={basePaginationStyle}
      color={'primary'}
      count={total_pages > 100 ? 100 : total_pages}
      siblingCount={0}
      page={page}
      onChange={handleChange}/>
  );
};