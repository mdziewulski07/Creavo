import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 60vh;
  text-align: center;
  gap: 2rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 320px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

const OutlineButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(99, 102, 241, 0.4);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;

export const WelcomePage = () => {
  const { signInWithGoogle, signInGuest, signInWithEmail, registerWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <div>
        <h1>Welcome to Creavo</h1>
        <p>Organize your creative projects with a personalized workspace.</p>
      </div>
      <Actions>
        <Button onClick={() => signInWithGoogle()}>Continue with Google</Button>
        <OutlineButton onClick={() => signInGuest()}>Continue as guest</OutlineButton>
        <Input placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Button onClick={() => signInWithEmail(email, password)}>Log in</Button>
        <OutlineButton onClick={() => registerWithEmail(email, password)}>Create account</OutlineButton>
      </Actions>
    </Container>
  );
};
