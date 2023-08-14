"use client"
import React from 'react';
import { useLoginMutation } from '../../api/apiSlice'; // Adjust the path


const LoginForm = () => {
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const device_name = formData.get('device_name') || 'web';


    try {
      const loginData = { email, password, device_name };
      await login(loginData).unwrap();
      window.location.href = '/dash/dashboard'; // Replace with your desired route
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="device_name" className="block text-sm font-medium text-gray-700">
              Device Name
            </label>
            <input
              id="device_name"
              name="device_name"
              type="text"
              autoComplete="off"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {isError && <div className="text-red-600">{error.message}</div>}
          {isSuccess && <div className="text-green-600">Login successful!</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
