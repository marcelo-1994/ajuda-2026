import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Requests } from './pages/Requests';
import { RequestDetails } from './pages/RequestDetails';
import { CreateRequest } from './pages/CreateRequest';
import { Profile } from './pages/Profile';
import { Pricing } from './pages/Pricing';
import { Ranking } from './pages/Ranking';
import { Professionals } from './pages/Professionals';
import { Marketplace } from './pages/Marketplace';
import { Community } from './pages/Community';
import { Integrations } from './pages/Integrations';
import { Timeline } from './pages/Timeline';
import { AdminDashboard } from './pages/AdminDashboard';
import { Invite } from './pages/Invite';
import { InstallPrompt } from './components/InstallPrompt';
import { BetaNotice } from './components/BetaNotice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BetaNotice />
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="requests" element={<Requests />} />
            <Route path="requests/:id" element={<RequestDetails />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="professionals" element={<Professionals />} />
            <Route path="marketplace" element={<Marketplace />} />
            
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="create-request" element={
              <ProtectedRoute>
                <CreateRequest />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="integrations" element={
              <ProtectedRoute>
                <Integrations />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="invite" element={
              <ProtectedRoute>
                <Invite />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
