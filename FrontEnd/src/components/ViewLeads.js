import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/ViewLeads.css';

const ViewLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Added for success messages

  // Filter state
  const [filterPartnerCode, setFilterPartnerCode] = useState('');
  const [filterLeadSource, setFilterLeadSource] = useState('');
  const [filterLeadInterest, setFilterLeadInterest] = useState('');
  const [filterDateTime, setFilterDateTime] = useState('');
  const [partnerCodes, setPartnerCodes] = useState([]); // State to store partner codes

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/leads/fetch');
        if (response.data && response.data.length > 0) {
          setLeads(response.data);
          setFilteredLeads(response.data); // Set initial filtered leads
        } else {
          setError('No leads available.');
        }
      } catch (error) {
        setError('Failed to fetch leads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPartnerCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/channelPartner/fetch');
        if (response.data && response.data.length > 0) {
          setPartnerCodes(response.data.map(partner => partner.code)); // Extract codes
        } else {
          setError('No partner codes available.');
        }
      } catch (error) {
        setError('Failed to fetch partner codes. Please try again later.');
      }
    };

    fetchLeads();
    fetchPartnerCodes();
  }, []);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/v1/leads/filter', {
        params: {
          partnerCode: filterPartnerCode,
          leadSource: filterLeadSource,
          leadInterest: filterLeadInterest,
          timeframe: filterDateTime
        }
      });

      if (response.data && response.data.length > 0) {
        setFilteredLeads(response.data);
        setError('');
        setMessage('Filters applied successfully.'); // Success message
      } else {
        setFilteredLeads([]);
        setError('No leads match the filters.');
        setMessage('');
      }
    } catch (error) {
      setError('Failed to fetch filtered leads. Please try again later.');
      setMessage('');
    }
  };

  const downloadCSV = () => {
    window.location.href = 'http://localhost:8080/api/v1/leads/csv';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-leads-container">
      {/* Popup Notifications */}
      {message && <div className="popup success">{message}</div>}
      {error && <div className="popup error">{error}</div>}

      <div className="header-container">
        <h2>Leads</h2>
        <button onClick={downloadCSV} className="download-csv-button">
          Download CSV
        </button>
      </div>

      {/* Filter Form */}
      <div className="filter-form-container">
        <h3>Filter Leads</h3>
        <form onSubmit={handleFilterSubmit}>
          <label htmlFor="filterPartnerCode">Partner Code</label>
          <select
            id="filterPartnerCode"
            value={filterPartnerCode}
            onChange={(e) => setFilterPartnerCode(e.target.value)}
          >
            <option value="">Select a partner code</option>
            {partnerCodes.map(code => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <label htmlFor="filterLeadSource">Lead Source</label>
          <select
            id="filterLeadSource"
            value={filterLeadSource}
            onChange={(e) => setFilterLeadSource(e.target.value)}
          >
            <option value="">Select a lead source</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="filterLeadInterest">Lead Interest</label>
          <input
            type="text"
            id="filterLeadInterest"
            value={filterLeadInterest}
            onChange={(e) => setFilterLeadInterest(e.target.value)}
          />

          <label htmlFor="filterDateTime">Filter Date and Time</label>
          <input
            type="datetime-local"
            id="filterDateTime"
            value={filterDateTime}
            onChange={(e) => setFilterDateTime(e.target.value)}
          />

          <button type="submit">Apply Filters</button>
        </form>
      </div>

      {/* Leads Table */}
      {filteredLeads.length > 0 ? (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Partner Code</th>
              <th>Lead Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Lead Source</th>
              <th>Lead Interest</th>
              <th>Additional Notes</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.lead_id}>
                <td>{lead.lead_id}</td>
                <td>{lead.partner_code}</td>
                <td>{lead.lead_name}</td>
                <td>{lead.lead_contact_number}</td>
                <td>{lead.lead_email}</td>
                <td>{lead.lead_source}</td>
                <td>{lead.lead_interest}</td>
                <td>{lead.additional_notes}</td>
                <td>{new Date(lead.lead_created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No leads available.</div>
      )}
    </div>
  );
};

export default ViewLeads;
