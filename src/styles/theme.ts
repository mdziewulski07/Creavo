import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#f5f7fb',
    surface: '#ffffff',
    text: '#1f2933',
    muted: '#6b7280',
    primary: '#6366f1'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    muted: '#94a3b8',
    primary: '#6366f1'
  }
};

export type ThemeMode = 'light' | 'dark';
