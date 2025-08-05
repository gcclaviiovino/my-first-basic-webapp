import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showUserIdInput, setShowUserIdInput] = useState(false);
  const [userIdInput, setUserIdInput] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);
    } catch (err) {
      console.error('Error parsing stored user data:', err);
      setError('Corrupted user data. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const getLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('api/logs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve logs');
      }
      const logs = await response.json();
      // You can handle logs here, e.g., display them or set state
      console.log('Logs:', logs);
      alert('Logs retrieved. Check console for details.');
    } catch (err) {
      console.error('Error retrieving logs:', err);
      alert('Error retrieving logs.');
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const users = await response.json();
      console.log('Users:', users);
      alert('Users retrieved. Check console for details.');
    } catch (err) {
        console.error('Error retrieving users:', err);
        alert('Error retrieving users.');
      }
  };

  const getUserById = async () => {
    if (!userIdInput) {
      alert('Please enter a user ID.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userIdInput}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('User not found');
      }
      const userData = await response.json();
      alert('User retrieved. Check console for details.');
      setSearchedUser(userData);
      setShowUserIdInput(false);
      console.log("User:", userData)
    } catch (err) {
      console.error('Error retrieving user:', searchedUser);
      alert('Error retrieving user.');
      setSearchedUser(null);
    }
  };

  const handleSearchClick = () => {
    setShowUserIdInput(!showUserIdInput);
    // Clear the input and search results when toggling off
    if (showUserIdInput) {
      setUserIdInput('');
      setSearchedUser(null);
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-container error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="dashboard-container">No user data available. Please log in.</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}!</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      {user.birthDate && <p>Birth Date: {user.birthDate}</p>}
      {user.age !== null && <p>Age: {user.age} years old</p>}
      <p>Role: {user.role}</p>

      {user.role === 'admin' && (
        <div className="admin-content">
          <h3>Admin Panel</h3>
          <p>What do you need?</p>
          <div className="button-row">
            <button onClick={getLogs} className="logs-button">Retrieve log of all actions performed on the DB</button>
            <button onClick={getUsers} className="users-button">Get a list of all the users in the DB</button>
            <button onClick={handleSearchClick} className="user-by-id-button">
              {showUserIdInput ? 'Cancel Search' : 'Search for a user'}
            </button>
          </div>
        {showUserIdInput && (
          <div className="search-container">
            <input
              type="number"
              placeholder="Enter user ID"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
            />
            <button onClick={getUserById}>Search</button>
          </div>
        )}
        </div>
      )}

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;