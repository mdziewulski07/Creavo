import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
  enableAuthPersistence,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  signInGuest,
  signOutUser,
  subscribeToAuth,
  createOrUpdateUserDocument,
  uploadUserAvatar
} from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  initializing: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Record<string, unknown>) => Promise<void>;
  uploadAvatar: (file: File | Blob) => Promise<string>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    enableAuthPersistence().catch(() => {
      // ignore persistence errors (e.g. private browsing)
    });
    const unsubscribe = subscribeToAuth(async currentUser => {
      setUser(currentUser);
      setInitializing(false);
      if (currentUser) {
        await createOrUpdateUserDocument(currentUser.uid, {
          email: currentUser.email ?? null,
          displayName: currentUser.displayName ?? currentUser.email ?? 'Guest',
          photoURL: currentUser.photoURL ?? null
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      initializing,
      signInWithGoogle: async () => {
        await signInWithGoogle();
      },
      signInWithEmail: async (email, password) => {
        await signInWithEmail(email, password);
      },
      registerWithEmail: async (email, password) => {
        await registerWithEmail(email, password);
      },
      signInGuest: async () => {
        await signInGuest();
      },
      signOut: async () => {
        await signOutUser();
      },
      updateUserProfile: async data => {
        if (!user) return;
        await createOrUpdateUserDocument(user.uid, data);
      },
      uploadAvatar: async file => {
        if (!user) {
          throw new Error('No authenticated user');
        }
        const url = await uploadUserAvatar(user.uid, file);
        await createOrUpdateUserDocument(user.uid, { photoURL: url });
        return url;
      }
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
