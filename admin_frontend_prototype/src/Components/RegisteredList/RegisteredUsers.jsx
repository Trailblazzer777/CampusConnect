import React, { useState, useEffect } from 'react';
import './RegisteredUsers.css';

function RegisteredUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4001/registeredUsers')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='container-users'>
      <div className='eventname-search-bar'>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Eventname" />
      </div>
      <h1>Registered Users</h1>
      {users.slice().reverse().filter(user => user.eventname.toLowerCase().includes(search.toLowerCase())).map(user => (
  <div key={user._id} className='user-boxes'>
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>SRN: {user.srn}</p>
    <p>School: {user.school}</p>
    <p>Course: {user.course}</p>
    <p>Section: {user.section}</p>
    <p>Event Name: {user.eventname}</p>
    <p>Event Organizer: {user.eventorganizer}</p>
    <hr />
  </div>
))}
    </div>
  );
}

export default RegisteredUsers;