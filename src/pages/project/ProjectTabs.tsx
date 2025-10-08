import styled from 'styled-components';

type ProjectTabKey = 'overview' | 'tasks' | 'assets';

interface ProjectTabsProps {
  active: ProjectTabKey;
  onChange: (key: ProjectTabKey) => void;
}

const Tabs = styled.nav`
  display: flex;
  gap: 1rem;
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

const tabList: { key: ProjectTabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'assets', label: 'Assets' }
];

export const ProjectTabs = ({ active, onChange }: ProjectTabsProps) => (
  <Tabs>
    {tabList.map(tab => (
      <TabButton key={tab.key} $active={tab.key === active} onClick={() => onChange(tab.key)}>
        {tab.label}
      </TabButton>
    ))}
  </Tabs>
);
