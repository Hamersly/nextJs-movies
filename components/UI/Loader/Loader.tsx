import {FC} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader: FC = () => {
  return (
    <CircularProgress size={90}/>
  );
};