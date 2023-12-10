import {AppBar, Box, Toolbar} from '@mui/material';
import {headerAppBarStyle, headerBoxStyle, headerToolbarStyle} from './Header.styled';
import {Title} from '../Title/Title';
import {Search} from '../Search/Search';
import {MenuEl} from '@/components/MenuEl/MenuEl';


export const Header = () => {
  return (
    <Box sx={headerBoxStyle}>
      <Title/>
      <AppBar sx={headerAppBarStyle} position="static">
        <Toolbar sx={headerToolbarStyle}>
          <MenuEl/>
          <Box>
            <Search/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};