import {Box} from '@mui/material';
import {pageBoxStyle} from '@/components/PageBox/PageBox.styled';
import {FC, ReactNode} from 'react';

interface IProps {
  children: ReactNode
}

export const PageBox: FC<IProps> = ({children}) => {
  return (
    <Box sx={pageBoxStyle}>
      {children}
    </Box>
  );
};