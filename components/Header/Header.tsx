import {Box} from '@mui/material';
import {headerBoxStyle} from './Header.styled';
import {Title} from '../Title/Title';
import {Bar} from '@/components/Bar/Bar';


export const Header = () => {
  return (
    <Box sx={headerBoxStyle}>
      <Title/>
      <Bar/>
    </Box>
  );
};