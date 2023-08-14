"use client"
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Update to use 'next/router'
import { selectUser } from '../../store/slice/userSlice'; // Update the path

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // Redirect to login page
      router.push('/');
    }
  }, []); // Remove 'token' and 'router' from dependency array

  const token = localStorage.getItem('auth_token'); // Move token declaration inside the component

  if (!token) {
    return null; // Return null if no token, you can customize this behavior if needed
  }

  return children;
};

export default ProtectedRoute;
