import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import Healthmetrics from './pages/Healthmetrics';

// Initialize React Query client
const queryClient = new QueryClient();

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

// App Layout component
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          
            <AppLayout>
              <Dashboard />
            </AppLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
        }
      />
      <Route
        path="/metrics"
        element={
            <AppLayout>
              <Healthmetrics />
            </AppLayout>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
} 