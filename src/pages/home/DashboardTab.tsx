import { useMemo, useState } from 'react';
import styled from 'styled-components';
import type { Project } from '../../types/project';

interface DashboardTabProps {
  projects: Project[];
  loading: boolean;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.text)};
  box-shadow: ${({ $active }) => ($active ? '0 6px 18px rgba(99, 102, 241, 0.3)' : 'none')};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

const Card = styled.article`
  border-radius: 1rem;
  background: linear-gradient(160deg, rgba(99, 102, 241, 0.18), rgba(14, 165, 233, 0.15));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Banner = styled.div<{ $image?: string }>`
  height: 160px;
  border-radius: 0.75rem;
  background: ${({ $image }) =>
    $image
      ? `url(${$image}) center/cover`
      : 'linear-gradient(140deg, rgba(255,255,255,0.45), rgba(255,255,255,0))'};
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.article`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(99, 102, 241, 0.08);
`;

const ListCover = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 0.75rem;
  background: ${({ $color }) => $color};
`;

export const DashboardTab = ({ projects, loading }: DashboardTabProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const gridContent = useMemo(
    () =>
      projects.map(project => (
        <Card key={project.id}>
          <Banner $image={project.theme.bannerImageUrl}>{project.name}</Banner>
          <span>{project.description}</span>
        </Card>
      )),
    [projects]
  );

  const listContent = useMemo(
    () =>
      projects.map(project => (
        <ListItem key={project.id}>
          <ListCover $color={project.theme.primaryColor} />
          <div>
            <strong>{project.name}</strong>
            <p>{project.description}</p>
          </div>
          <span>Last update: {project.updatedAt ? 'Recently' : '—'}</span>
        </ListItem>
      )),
    [projects]
  );

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (!projects.length) {
    return <div>No projects yet. Create your first project to get started!</div>;
  }

  return (
    <div>
      <Header>
        <h2>Your workspace</h2>
        <ViewToggle>
          <ToggleButton $active={view === 'grid'} onClick={() => setView('grid')}>
            Grid
          </ToggleButton>
          <ToggleButton $active={view === 'list'} onClick={() => setView('list')}>
            List
          </ToggleButton>
        </ViewToggle>
      </Header>
      {view === 'grid' ? <Grid>{gridContent}</Grid> : <List>{listContent}</List>}
    </div>
  );
};
