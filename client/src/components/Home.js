import React, { useState, useEffect } from 'react';
import UserTable from './UserTable/UserTable';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.org/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (updatedUser) => {
    // Find the index of the updated user in the users array
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      // Create a new array with the updated user
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
      console.log("Updated user:", updatedUser);
    }
  };

  const handleDelete = (userId) => {
    // Filter out the user with the specified userId
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    console.log("Deleted user with ID:", userId);
  };

  const handleResetPassword = (userId) => {
    console.log('Reset password for user:', userId);
    // Implement password reset functionality
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">User Management</h1>
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default Home;
