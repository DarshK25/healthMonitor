import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import Healthmetrics from './pages/Healthmetrics';
import { HealthReport } from './pages/HealthReport';

// Initialize React Query client
const queryClient = new QueryClient();

// Protected Route component
function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn fallbackRedirectUrl="/dashboard" />
      </SignedOut>
    </>
  );
}

// Auth Layout component
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
}

// App Layout component
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          <AuthLayout>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-background border border-border shadow-lg",
                  headerTitle: "text-2xl font-bold text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton: "bg-background border border-border hover:bg-accent",
                  formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                  footerActionLink: "text-primary hover:text-primary/90",
                }
              }}
            />
          </AuthLayout>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <AuthLayout>
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-background border border-border shadow-lg",
                  headerTitle: "text-2xl font-bold text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton: "bg-background border border-border hover:bg-accent",
                  formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                  footerActionLink: "text-primary hover:text-primary/90",
                }
              }}
            />
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/metrics"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Healthmetrics />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <AppLayout>
              <HealthReport />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#000000",
          colorText: "#000000",
        },
        elements: {
          card: "bg-white shadow-md rounded-lg p-6",
          navbar: "bg-white",
          footer: "bg-white",
        }
      }}
    >
      <Router>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Router>
    </ClerkProvider>
  );
} 