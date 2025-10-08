import styled from 'styled-components';

type Tab<T extends string> = {
  key: T;
  label: string;
};

interface HomePageTabsProps<T extends string> {
  tabs: Tab<T>[];
  activeKey: T;
  onTabChange: (key: T) => void;
}

const TabBar = styled.nav`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.text)};
  box-shadow: ${({ $active }) => ($active ? '0 10px 20px rgba(99, 102, 241, 0.35)' : 'none')};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const HomePageTabs = <T extends string>({ tabs, activeKey, onTabChange }: HomePageTabsProps<T>) => {
  return (
    <TabBar>
      {tabs.map(tab => (
        <TabButton key={tab.key} $active={tab.key === activeKey} onClick={() => onTabChange(tab.key)}>
          {tab.label}
        </TabButton>
      ))}
    </TabBar>
  );
};
