import styled from 'styled-components';

const Placeholder = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(99, 102, 241, 0.08);
`;

export const ProjectSettingsTab = () => {
  return (
    <div>
      <h2>Project settings</h2>
      <Placeholder>Select a project from the dashboard to edit its settings.</Placeholder>
    </div>
  );
};
