'use client';

import { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { Links } from '@/components/Links/Links';
import {
  menuIconButtonStyle,
  menuPaperStyle,
  menuItemIconStyle,
  menuItemTextStyle,
  desktopLinkStyle,
  desktopNavStyle,
} from './MenuEl.styled';

const navItems = [
  { href: '/', label: 'Главная', icon: <HomeIcon sx={menuItemIconStyle} /> },
  { href: '/movie', label: 'Фильмы', icon: <LocalMoviesIcon sx={menuItemIconStyle} /> },
  { href: '/tv', label: 'Сериалы', icon: <LiveTvIcon sx={menuItemIconStyle} /> },
];

export const MenuEl = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isDesktop) {
    return (
      <Box sx={desktopNavStyle}>
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href} style={desktopLinkStyle}>
            {label}
          </Link>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={menuIconButtonStyle}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: menuPaperStyle,
        }}
      >
        {navItems.map(({ href, label, icon }) => (
          <MenuItem key={href} onClick={handleClose}>
            {icon}
            <Typography sx={menuItemTextStyle} ml={'10px'} variant="h6" component="div">
              <Links href={href}>{label}</Links>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
