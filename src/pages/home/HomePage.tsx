import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { HomePageTabs } from './HomePageTabs';
import { DashboardTab } from './DashboardTab';
import { TemplatesTab } from './TemplatesTab';
import { MarketplaceTab } from './MarketplaceTab';
import { NewProjectCreator } from './NewProjectCreator';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';

const TabContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
`;

type HomeTabKey = 'dashboard' | 'templates' | 'marketplace' | 'create';

const tabLabels: Record<HomeTabKey, string> = {
  dashboard: 'Dashboard',
  templates: 'Templates',
  marketplace: 'Marketplace',
  create: 'New Project'
};

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<HomeTabKey>('dashboard');
  const { user } = useAuth();
  const { projects, loading } = useProjects(user?.uid);

  const content = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab projects={projects} loading={loading} />;
      case 'templates':
        return <TemplatesTab />;
      case 'marketplace':
        return <MarketplaceTab />;
      case 'create':
        return <NewProjectCreator />;
      default:
        return null;
    }
  }, [activeTab, projects, loading]);

  return (
    <div>
      <HomePageTabs
        activeKey={activeTab}
        onTabChange={setActiveTab}
        tabs={Object.entries(tabLabels).map(([key, label]) => ({
          key: key as HomeTabKey,
          label
        }))}
      />
      <TabContent>{content}</TabContent>
    </div>
  );
};
