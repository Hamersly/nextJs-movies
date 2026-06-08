'use client';

import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '@/components/ThemeRegistry/ThemeRegistry';
import { themeToggleStyle } from './ThemeToggle.styled';

export const ThemeToggle = () => {
  const { mode, toggle } = useThemeMode();

  return (
    <IconButton sx={themeToggleStyle} onClick={toggle} aria-label="переключить тему">
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
