import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  type Firestore,
  type DocumentReference,
  type WithFieldValue,
  type DocumentData
} from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};

export const auth = getAuth(getFirebaseApp());
export const db: Firestore = getFirestore(getFirebaseApp());
export const storage: FirebaseStorage = getStorage(getFirebaseApp());

export const enableAuthPersistence = async () => {
  await setPersistence(auth, browserLocalPersistence);
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signInWithEmail = (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (
  email: string,
  password: string
): Promise<UserCredential> => createUserWithEmailAndPassword(auth, email, password);

export const signInGuest = (): Promise<UserCredential> => signInAnonymously(auth);

export const signOutUser = (): Promise<void> => signOut(auth);

export const subscribeToAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const userCollection = () => collection(db, 'users');
export const userDoc = (uid: string): DocumentReference => doc(userCollection(), uid);

export const projectCollection = (uid: string) => collection(userDoc(uid), 'projects');

export const fetchUserDocument = (uid: string) => getDoc(userDoc(uid));

export const createOrUpdateUserDocument = async (
  uid: string,
  data: WithFieldValue<DocumentData>
) => {
  await setDoc(
    userDoc(uid),
    {
      ...data,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
};

export const updateUserDocument = async (uid: string, data: WithFieldValue<DocumentData>) => {
  await updateDoc(userDoc(uid), {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const uploadUserAvatar = async (uid: string, file: File | Blob): Promise<string> => {
  const avatarRef = storageRef(storage, `users/${uid}/avatar`);
  await uploadBytes(avatarRef, file);
  return getDownloadURL(avatarRef);
};
