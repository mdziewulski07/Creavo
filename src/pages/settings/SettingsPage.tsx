import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NewThemeCreator } from './NewThemeCreator';
import { AppSettingsTab } from './AppSettingsTab';
import { ProjectSettingsTab } from './ProjectSettingsTab';
import { useAuth } from '../../contexts/AuthContext';

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.text)};
`;

const TabContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
`;

type SettingsTab = 'app' | 'themes' | 'project';

const settingsTabs: { key: SettingsTab; label: string; path: string }[] = [
  { key: 'app', label: 'App', path: 'app' },
  { key: 'themes', label: 'Themes', path: 'themes' },
  { key: 'project', label: 'Project', path: 'project' }
];

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<SettingsTab>('app');
  const { user } = useAuth();

  useEffect(() => {
    navigate(active);
  }, [active, navigate]);

  return (
    <div>
      <h1>Settings</h1>
      <Tabs>
        {settingsTabs.map(tab => (
          <TabButton key={tab.key} $active={tab.key === active} onClick={() => setActive(tab.key)}>
            {tab.label}
          </TabButton>
        ))}
      </Tabs>
      <TabContainer>
        <Routes>
          <Route path="app" element={<AppSettingsTab />} />
          <Route path="themes" element={<NewThemeCreator />} />
          <Route
            path="project"
            element={user ? <ProjectSettingsTab /> : <div>Select a project from the dashboard.</div>}
          />
          <Route path="*" element={<Navigate to="app" replace />} />
        </Routes>
      </TabContainer>
    </div>
  );
};
