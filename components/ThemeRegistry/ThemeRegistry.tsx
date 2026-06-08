'use client';

import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Контекст для переключения тёмной/светлой темы.
// Хранит текущий режим и функцию toggle.
interface ThemeContextValue {
  mode: 'dark' | 'light';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ mode: 'dark', toggle: () => {} });

export const useThemeMode = () => useContext(ThemeContext);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1240AB' },
    background: { default: '#06246f', paper: '#0d2f8a' },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1240AB' },
    background: { default: '#f0f2f5', paper: '#ffffff' },
  },
});

export const ThemeRegistry = ({ children }: { children: ReactNode }) => {
  // Всегда стартуем с 'dark' для совпадения SSR/CSR.
  // После гидратации читаем сохранённую тему из localStorage.
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'dark' || saved === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
