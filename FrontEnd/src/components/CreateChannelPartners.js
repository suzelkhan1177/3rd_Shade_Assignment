
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/form.css';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const ChannelPartnerForm = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:8080/api/v1/channelPartner/create', {
        name,
        contact_number: contactNumber,
        email
      });

      if (response.status === 201) {
        setMessage('Channel Partner created successfully!');
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
      setMessage('');
    }
  };

  return (
    <div className="form-card">
      <h2>Create Channel Partner</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="contact_number">Contact Number</label>
        <input
          type="number"
          id="contact_number"
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

        <button type="submit">Create</button>
      </form>

      {message && <div className="popup success">{message}</div>}
      {error && <div className="popup error">{error}</div>}
    </div>
  );
};

export default ChannelPartnerForm;
