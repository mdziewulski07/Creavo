import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 480px;
`;

const Label = styled.label`
  display: grid;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const AppSettingsTab = () => {
  const { user, updateUserProfile, uploadAvatar } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? '');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateUserProfile({ displayName, photoURL });
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    const url = await uploadAvatar(file);
    setPhotoURL(url);
  };

  return (
    <div>
      <h2>Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Display name
          <Input value={displayName} onChange={event => setDisplayName(event.target.value)} />
        </Label>
        <Label>
          Photo URL
          <Input value={photoURL} onChange={event => setPhotoURL(event.target.value)} />
        </Label>
        <Label>
          Upload avatar
          <Input type="file" accept="image/*" onChange={handleAvatarChange} />
        </Label>
        <Button type="submit">Save changes</Button>
      </Form>
    </div>
  );
};
