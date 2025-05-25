import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Store token and user together
      localStorage.setItem('user', JSON.stringify({
  ...res.data.user,
  token: res.data.token
}));


      window.location.href = '/dashboard'; 
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('Login failed: Server error or network issue');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      <p style={{ marginTop: 10 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default Login;
