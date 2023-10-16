// RegistrationForm.js
import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../config';
import { useNavigate } from "react-router-dom";


const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleRegister = async () => {
    if (username && password) {
      try {
        const body = {
          username: username,
          password: password
        }

        console.log(BASE_URL + '/auth');
       

        const response = await axios.post(BASE_URL + '/api/auth', body);
       
        // Assuming the response contains a token
        const token = response.data.token;
        // Save the token in local storage
       localStorage.setItem('token', token);
       localStorage.setItem('username' , response.data.username);
       localStorage.setItem('subscribeDate',response.data.subscribedDate)

    
  
        console.log('Registered with username:', username, 'and token:', token);
  
        return navigate("/");
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      alert('Please enter both a username and a password.');
    }
  };
  
  return (
    <div className="flex justify-center  h-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
