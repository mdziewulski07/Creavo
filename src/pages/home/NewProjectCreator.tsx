import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';

const Form = styled.form`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
  background-color: rgba(255, 255, 255, 0.9);
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;

const SubmitButton = styled.button`
  justify-self: flex-start;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const NewProjectCreator = () => {
  const { user } = useAuth();
  const { createProject } = useProjects(user?.uid);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [bannerType, setBannerType] = useState<'image' | 'generated'>('generated');
  const [iconLibrary, setIconLibrary] = useState<'lucide' | 'feather' | 'material' | 'iconmonstr'>('lucide');
  const [iconName, setIconName] = useState('sparkles');
  const [bannerImageUrl, setBannerImageUrl] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !user) return;

    await createProject({
      name,
      description,
      theme: {
        primaryColor,
        bannerType,
        bannerImageUrl: bannerType === 'image' ? bannerImageUrl : undefined,
        iconLibrary,
        iconName
      }
    });

    setName('');
    setDescription('');
    setBannerImageUrl('');
  };

  return (
    <div>
      <h2>Create a new project</h2>
      <Form onSubmit={handleSubmit}>
        <FullWidth>
          <Label>
            Project name
            <Input value={name} onChange={event => setName(event.target.value)} required />
          </Label>
        </FullWidth>
        <FullWidth>
          <Label>
            Description
            <Input value={description} onChange={event => setDescription(event.target.value)} />
          </Label>
        </FullWidth>
        <Label>
          Primary color
          <Input type="color" value={primaryColor} onChange={event => setPrimaryColor(event.target.value)} />
        </Label>
        <Label>
          Banner type
          <Select value={bannerType} onChange={event => setBannerType(event.target.value as 'image' | 'generated')}>
            <option value="generated">Generated</option>
            <option value="image">Image</option>
          </Select>
        </Label>
        {bannerType === 'image' && (
          <Label>
            Banner image URL
            <Input
              type="url"
              value={bannerImageUrl}
              onChange={event => setBannerImageUrl(event.target.value)}
            />
          </Label>
        )}
        <Label>
          Icon library
          <Select
            value={iconLibrary}
            onChange={event =>
              setIconLibrary(event.target.value as 'lucide' | 'feather' | 'material' | 'iconmonstr')
            }
          >
            <option value="lucide">Lucide</option>
            <option value="feather">Feather</option>
            <option value="material">Material</option>
            <option value="iconmonstr">Iconmonstr</option>
          </Select>
        </Label>
        <Label>
          Icon name
          <Input value={iconName} onChange={event => setIconName(event.target.value)} />
        </Label>
        <SubmitButton type="submit">Create project</SubmitButton>
      </Form>
    </div>
  );
};
