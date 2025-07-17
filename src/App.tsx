import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import { Toaster } from './components/ui/sonner';
import Home from './pages/Home';
import LoadoutBuilder from './pages/LoadoutBuilder';
import LoadoutViewer from './pages/LoadoutViewer';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import AboutDev from './pages/AboutDev';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
        <div className="min-h-screen">
          <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loadouts" element={<LoadoutBuilder />} />
              <Route path="/loadout/:id" element={<LoadoutViewer />} />
          <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about-dev" element={<AboutDev />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          </Layout>
          <Toaster />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
