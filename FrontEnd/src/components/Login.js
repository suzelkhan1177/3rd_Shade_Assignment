import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', {
        username: email,
        password: password,
      });

      // Assuming the response contains a token
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="form">
      <h2>Login Page</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="UserName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
