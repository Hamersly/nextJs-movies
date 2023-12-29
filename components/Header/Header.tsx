import {Box} from '@mui/material';
import {headerBoxStyle} from './Header.styled';
import {Title} from '../Title/Title';


export const Header = () => {
  return (
    <Box sx={headerBoxStyle}>
      <Title/>
    </Box>
  )
  ;
};