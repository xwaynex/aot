"use client"
import React from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { setToken } from '../../../store/slice/userSlice'; // Assuming you have a Redux slice for authentication
import { useGetDashboardQuery } from '../../api/apiSlice';
import ProtectedRoute from '../../components/Protected';

function Dashboard() {
  const dispatch = useDispatch();

  // Use the query hook to fetch data from the "getDashboard" endpoint
  const { data, error, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function DashboardWrapper(props) {
  return (
    <ProtectedRoute onAuthenticated={(token) => dispatch(setToken(token))}>
      <Dashboard {...props} />
    </ProtectedRoute>
  );
}

export default DashboardWrapper;
