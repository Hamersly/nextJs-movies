import React, {FC} from 'react';
import {AppBar, Box, Toolbar} from '@mui/material';
import {MenuEl} from '@/components/MenuEl/MenuEl';
import {Search} from '@/components/Search/Search';
import {headerAppBarStyle, headerToolbarStyle, headerToolStyle} from '@/components/Bar/Bar.styled';

export const Bar:FC = () => {
  return (
    <AppBar sx={headerAppBarStyle} position="static">
      <Toolbar sx={headerToolbarStyle}>
        <Box sx={headerToolStyle}>
          <MenuEl/>
          <Box>
            <Search/>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};