import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../styles/global';
import { darkTheme, lightTheme, type ThemeMode } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.1);
`;

const Logo = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
`;

const ModeToggle = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 0.875rem;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1rem;
`;

export const AppShell = () => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo>Creavo</Logo>
          <ModeToggle onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}>
            {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </ModeToggle>
        </Header>
        <Main>
          <Outlet />
        </Main>
      </Container>
    </ThemeProvider>
  );
};
