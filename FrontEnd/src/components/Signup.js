import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('analyst'); // Default role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/register', {
        username,
        password,
        role,
      });

      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="form">
      <h2>Registration Page</h2>
        <form className="register-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
          </select>
          <button type="submit">Sign Up</button>
          <p className="message">
            Already registered? <a href="/">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
