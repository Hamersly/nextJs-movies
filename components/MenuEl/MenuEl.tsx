'use client';

import {MouseEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Box} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import {Links} from '@/components/Links/Links';


export const MenuEl = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormat = (): void => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{mr: 2}}
        onClick={handleClick}
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {backgroundColor: '#1240AB'}
        }}
      >

        <MenuItem onClick={handleClose}>
          <HomeIcon sx={{color: 'white'}}/>
          <Typography sx={{color: 'white'}} ml={'10px'} variant="h6" component="div">
            <Links href={'/'}>Главная</Links>
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleFormat()}>
          <LocalMoviesIcon sx={{color: 'white'}}/>
          <Typography sx={{color: 'white'}} ml={'10px'} variant="h6" component="div">
            <Links href={'/movie'}>Фильмы</Links>
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleFormat()}>
          <LiveTvIcon sx={{color: 'white'}}/>
          <Typography sx={{color: 'white'}} ml={'10px'} variant="h6" component="div">
            <Links href={'/tv'}>Сериалы</Links>
          </Typography>
        </MenuItem>

      </Menu>
    </Box>
  );
};