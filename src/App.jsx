// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { ErrorPage } from './pages/ErrorPage';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute} from './components/ProtectedRoute';
import { DarkModeProvider } from './contexts/DarkModeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/candidate',
    element:
    <ProtectedRoute requiredRole="candidate">
      <CandidateDashboard />
    </ProtectedRoute>,
  },
  {
    path: '/recruiter',
    element:
    <ProtectedRoute requiredRole="recruiter">
      <RecruiterDashboard />
    </ProtectedRoute>,
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </AuthProvider>
  )
}