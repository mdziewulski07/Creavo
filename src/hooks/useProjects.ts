import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { projectCollection } from '../lib/firebase';
import type { Project, ProjectInput } from '../types/project';

export const useProjects = (uid: string | undefined) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const q = query(projectCollection(uid), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const data: Project[] = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...(docSnap.data() as ProjectInput)
      }));
      setProjects(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  const createProject = useCallback(
    async (input: ProjectInput) => {
      if (!uid) return;
      await addDoc(projectCollection(uid), {
        ...input,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    },
    [uid]
  );

  const updateProject = useCallback(
    async (projectId: string, input: Partial<ProjectInput>) => {
      if (!uid) return;
      const ref = doc(projectCollection(uid), projectId);
      await updateDoc(ref, {
        ...input,
        updatedAt: serverTimestamp()
      });
    },
    [uid]
  );

  const removeProject = useCallback(
    async (projectId: string) => {
      if (!uid) return;
      const ref = doc(projectCollection(uid), projectId);
      await deleteDoc(ref);
    },
    [uid]
  );

  return useMemo(
    () => ({ projects, loading, createProject, updateProject, removeProject }),
    [projects, loading, createProject, updateProject, removeProject]
  );
};
