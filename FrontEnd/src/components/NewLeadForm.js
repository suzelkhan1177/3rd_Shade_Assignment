
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/NewLeadForm.css'; 

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const NewLeadForm = () => {
  const [partners, setPartners] = useState([]);
  const [partnerCode, setPartnerCode] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [leadInterest, setLeadInterest] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/channelPartner/fetch');
        setPartners(response.data);
      } catch (err) {
        console.error('Failed to fetch partner codes:', err);
      }
    };

    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      setMessage('');
      return;
    }

    if (!isValidPhoneNumber(contactNumber)) {
      setError('Invalid phone number format');
      setMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/leads/create', {
        partnerCode,
        name,
        contact_number: contactNumber,
        email,
        lead_source: leadSource,
        lead_interest: leadInterest,
        additional_notes: additionalNotes
      });

      if (response.status === 201) {
        setMessage('Lead submitted successfully!');
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
      setMessage('');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
      {message && <div className="popup success">{message}</div>}
        {error && <div className="popup error">{error}</div>}
        <h2>Select Channel Partner Code and Create New Lead</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="partnerCode">Select Channel Partner Code</label>
          <select
            id="partnerCode"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value)}
            required
          >
            <option value="" disabled>Select a partner code</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.code}>
                {partner.code}
              </option>
            ))}
          </select>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="leadSource">Lead Source</label>
          <select
            id="leadSource"
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
            required
          >
            <option value="" disabled>Select a lead source</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="leadInterest">Lead Interest</label>
          <input
            type="text"
            id="leadInterest"
            value={leadInterest}
            onChange={(e) => setLeadInterest(e.target.value)}
            required
          />

          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />

          <button type="submit">Submit Lead</button>
        </form>

      </div>
    </div>
  );
};

export default NewLeadForm;
