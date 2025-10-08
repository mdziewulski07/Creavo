import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import { ProjectTabs } from './ProjectTabs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProjectView = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const { projects } = useProjects(user?.uid);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'assets'>('overview');

  const project = useMemo(() => projects.find(item => item.id === projectId), [projects, projectId]);

  useEffect(() => {
    setActiveTab('overview');
  }, [projectId]);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <Container>
      <header>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </header>
      <ProjectTabs active={activeTab} onChange={setActiveTab} />
      <section>
        {activeTab === 'overview' && <div>Overview content coming soon.</div>}
        {activeTab === 'tasks' && <div>Tasks board integration TBD.</div>}
        {activeTab === 'assets' && <div>Project assets manager placeholder.</div>}
      </section>
    </Container>
  );
};
