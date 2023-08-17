

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectUser } from '../../store/slice/userSlice'; // Import the selectUser function from your user slice

const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dev.navingtechnologies.com/alto/public/api',

    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());

      console.log('User:', user);
      const token = user?.token;
      console.log('Token:', token);
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
   
    
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      onError: (error) => {
        console.error('Login mutation error:', error);
      },
      onSuccess: (response) => {
        console.log('Login mutation success:', response);
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    verifyUser: builder.mutation({
      query: (body, userId) => ({
        url: `/auth/${userId}/verify`,
        method: 'PATCH',
        body,
      }),
    }),
    resendOtp: builder.mutation({
      query: (userId) => ({
        url: `/auth/${userId}/resend-otp`, // Adjust the endpoint URL as needed
        method: 'POST',
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (body) => ({
        url: '/auth/password/reset-request',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/password/reset',
        method: 'PATCH',
        body,
      }),
    }),

    

    getDashboard: builder.query({
      query: () => ({
        url: '/v1/admin/dashboard',
        method: 'GET',
      }),
    }),


  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyUserMutation, useResendOtpMutation,  useRequestPasswordResetMutation, useResetPasswordMutation,   useGetDashboardQuery} = api;

export default api;
