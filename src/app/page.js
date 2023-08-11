"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [device_name, setDevice_name] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username,
        password,
        device_name
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('An error occurred');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">device:</label>
          <input
            type="text"
            id="password"
            value={device_name}
            onChange={(e) => setDevice_name(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
