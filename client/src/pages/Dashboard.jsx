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
  const [showModifyChoices, setShowModifyChoices] = useState(false);
  const [fieldsToModify, setFieldsToModify] = useState([]);

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

  // const changeSelf = async () => {
  //   const newName = prompt('Enter your new name:', user.name);
  //   const newEmail = prompt('Enter your new email:', user.email);
  //   const newBirthDate = prompt('Enter your new birth date (YYYY-MM-DD):', user.birthDate || '');
  //   if (!newName && !newEmail && !newBirthDate) {
  //     alert('No changes made.');
  //     return;
  //   }
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`/api/users/${user.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         ...(newName ? { name: newName } : {}),
  //         ...(newEmail ? { email: newEmail } : {}),
  //         ...(newBirthDate ? { birthDate: newBirthDate } : {})
  //       })
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to update user info');
  //     }
  //     const updatedUser = await response.json();
  //     setUser(updatedUser);
  //     localStorage.setItem('user', JSON.stringify(updatedUser));
  //     alert('Profile updated successfully.');
  //   } catch (err) {
  //     console.error('Error updating user info:', err);
  //     alert('Error updating profile.');
  //   }
  // };

  // const handleModifyClick = () => {
  //   setShowModifyChoices(true);
  //   setFieldsToModify([]);
  // };

  const handleProfileUpdate = async (fieldsToModify, user, setUser, setShowModifyChoices, setFieldsToModify) => {
    let updates = {};
    for (const field of fieldsToModify) {
      let promptText = `Enter your new ${field.replace('birthDate', 'birth date (YYYY-MM-DD)')}:`;
      let defaultValue = user[field] || '';
      let newValue = prompt(promptText, defaultValue);
      if (newValue) updates[field] = newValue;
    }
    if (Object.keys(updates).length === 0) {
      alert('No changes made.');
      setShowModifyChoices(false);
      setFieldsToModify([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update user info');
      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully.');
    } catch (err) {
      console.error('Error updating user info:', err);
      alert('Error updating profile.');
    }

    setShowModifyChoices(false);
    setFieldsToModify([]);
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
    <div className="dashboardDiv">
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

      {user.role === 'user' && (
        <div className="user-panel">
          <h3>User Panel</h3>
          <p>You can modify your profile</p>
          <div className="button-row">
            <button
              onClick={() => {
                setShowModifyChoices(true);
                setFieldsToModify([]);
              }}
              className="changeSelf-button"
            >
              Modify your personal information
            </button>
          </div>
          {showModifyChoices && (
            <div className="modify-container">
              <p>Select the field(s) you want to modify:</p>
              <button onClick={() => setFieldsToModify(prev => [...prev, 'name'])} disabled={fieldsToModify.includes('name')}>Name</button>
              <button onClick={() => setFieldsToModify(prev => [...prev, 'email'])} disabled={fieldsToModify.includes('email')}>Email</button>
              <button onClick={() => setFieldsToModify(prev => [...prev, 'birthDate'])} disabled={fieldsToModify.includes('birthDate')}>Birth Date</button>
              {fieldsToModify.length > 0 && (
                <button onClick={() =>
                  handleProfileUpdate(fieldsToModify, user, setUser, setShowModifyChoices, setFieldsToModify)
                }>
                  Submit Changes
                </button>
              )}
              <button onClick={() => { setShowModifyChoices(false); setFieldsToModify([]); }}>Cancel</button>
            </div>
          )}
        </div>
      )
      }

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;