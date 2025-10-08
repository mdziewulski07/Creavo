import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../pages/home/HomePage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { ProjectView } from '../pages/project/ProjectView';
import { WelcomePage } from '../pages/others/WelcomePage';
import { NotFound } from '../pages/others/NotFound';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoutes = () => {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return <AppShell />;
};

export const AppRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoutes />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings/*" element={<SettingsPage />} />
      <Route path="/project/:projectId/*" element={<ProjectView />} />
    </Route>
    <Route path="/welcome" element={<WelcomePage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
