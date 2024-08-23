import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ViewLeads from './components/ViewLeads';
import ViewChannelPartners from './components/ViewChannelPartners';
import ChannelPartnerForm from './components/CreateChannelPartners';
import NewLeadForm from './components/NewLeadForm';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/view_leads" element={<ProtectedRoute element={<ViewLeads />} />} />
      <Route path="/view_channel_partners" element={<ProtectedRoute element={<ViewChannelPartners />} />} />
      <Route path="/form_channel_partners" element={<ProtectedRoute element={<ChannelPartnerForm />} />} />
      <Route path="/add_leads" element={<ProtectedRoute element={<NewLeadForm />} />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
