import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
  // Optionally: notify server
  fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Clear user info from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Redirect to login page
  window.location.href = '/login'; // or use navigate('/login') if inside a component
};


  return (
    <nav className="navbar">
      <div className="navbar-left">Military Asset Management System</div>
      <div className="navbar-right">
        {user && (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
