import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/styles.css';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleViewLeads = () => {
    navigate('/view_leads');
  };

  const handleAddLeads = () => {
    navigate('/add_leads');
  };

  const handleViewChannelPartners = () => {
    navigate('/view_channel_partners');
  };

  const handleFormChannelPartners = () => {
    navigate('/form_channel_partners');
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <div className="dashboard-card">
      <h2>Welcome to the Dashboard</h2>
      <p>Here you can manage your leads and view performance metrics.</p>
      <div className="button-container">
        <button className="add-channel-partners-button" onClick={handleFormChannelPartners}>Add Channel Partners</button>
        <button className="view-channel-partners-button" onClick={handleViewChannelPartners}>View Channel Partners</button>
        <button onClick={handleViewLeads}>View Leads</button>
        <button onClick={handleAddLeads}>Add New Lead</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
