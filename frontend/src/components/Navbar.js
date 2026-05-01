import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      <div className="navbar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <span>Welcome, {user.name} ({user.role})</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;