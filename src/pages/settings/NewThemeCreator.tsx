import { FormEvent, useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 640px;
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

export const NewThemeCreator = () => {
  const [themeName, setThemeName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [surfaceColor, setSurfaceColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1f2933');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Integration placeholder for theme saving logic
    setThemeName('');
  };

  return (
    <div>
      <h2>Create theme</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Theme name
          <Input value={themeName} onChange={event => setThemeName(event.target.value)} />
        </Label>
        <Label>
          Primary color
          <Input type="color" value={primaryColor} onChange={event => setPrimaryColor(event.target.value)} />
        </Label>
        <Label>
          Surface color
          <Input type="color" value={surfaceColor} onChange={event => setSurfaceColor(event.target.value)} />
        </Label>
        <Label>
          Text color
          <Input type="color" value={textColor} onChange={event => setTextColor(event.target.value)} />
        </Label>
        <Button type="submit">Save theme</Button>
      </Form>
    </div>
  );
};
