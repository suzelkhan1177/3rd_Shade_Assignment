import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/ViewChannelPartners.css'; 

const ViewChannelPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/channelPartner/fetch');
        if (response.data && response.data.length > 0) {
          setPartners(response.data);
        } else {
          setError('No channel partners available.');
        }
      } catch (error) {
        setError('Failed to fetch channel partners. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return <div className="popup info">Loading...</div>;
  }

  if (error) {
    return <div className="popup error">{error}</div>;
  }

  return (
    <div className="view-partners-container">
      {partners.length === 0 && !error && <div className="popup info">No channel partners available.</div>}
      {partners.length > 0 && (
        <>
          <h2>Channel Partners</h2>
          <table className="partners-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td>{partner.id}</td>
                  <td>{partner.code}</td>
                  <td>{partner.name}</td>
                  <td>{partner.contact_number}</td>
                  <td>{partner.email}</td>
                  <td>{new Date(partner.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ViewChannelPartners;
