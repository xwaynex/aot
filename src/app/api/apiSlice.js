

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
      query: ({ page = 1, perPage = 25 }) => ({
        url: `v1/admin/users?page=${page}&per_page=${perPage}`,
        method: 'GET',
      }),
    }),

    getPromoCodes: builder.query({
      query: () => ({
        url: '/v1/admin/discounts', // Adjust the endpoint URL as needed
        method: 'GET',
      }),
    }),

    createPromotion: builder.mutation({
      query: (body) => ({
        url: '/v1/admin/discounts', // Adjust the endpoint URL as needed
        method: 'POST',
        body,
      }),
      onError: (error) => {
        console.error('Create Promotion mutation error:', error);
      },
      onSuccess: (response) => {
        console.log('Create Promotion mutation success:', response);
      },
    }),

    getFAQs: builder.query({
      query: () => ({
        url: '/v1/admin/faq', // Adjust the endpoint URL as needed
        method: 'GET',
      }),
    }),

    createFAQ: builder.mutation({
      query: (body) => ({
        url: '/v1/admin/faq/create', // Adjust the endpoint URL as needed
        method: 'POST',
        body,
      }),
      onError: (error) => {
        console.error('Create FAQ mutation error:', error);
      },
      onSuccess: (response) => {
        console.log('Create FAQ mutation success:', response);
      },
    }),

    getUserDetails: builder.query({
      query: (user_id) => ({
        // url: `/v1/admin/riders/${riderId}/details`,
        url: `api/v1/admin/users/${user_id}`,
        method: 'GET',
      }),
      onError: (error) => {
        console.error('Error fetching rider details:', error);
      },
      onSuccess: (response) => {
        console.log('Rider details fetched successfully:', response);
      },
    }),

    // Add this to your existing api setup
createUser: builder.mutation({
  query: (body) => ({
    url: '/v1/admin/users/create', // Adjust the endpoint URL as needed
    method: 'POST',
    body,
  }),
  onError: (error) => {
    console.error('Create User mutation error:', error);
  },
  onSuccess: (response) => {
    console.log('Create User mutation success:', response);
  },

  // Gets order details
  getOrderDetails: builder.query({
    query: () => ({
      url: `/v1/customer/order/book`,
      method: 'POST',
    }),
    onError: (error) => {
      console.error('Error getting order details:', error);
    },
    onSuccess: (response) => {
      console.log('Got order details successfully:', response);
    },
  }),
}),

verifyUser: builder.mutation({
  query: ({ type, otp, device_name }, userId) => ({
    url: `/auth/${userId}/verify`,
    method: 'PATCH',
    body: { type, otp, device_name },
  }),
  onError: (error) => {
    console.error('Verify User mutation error:', error);
  },
  onSuccess: (response) => {
    console.log('Verify User mutation success:', response);
  },
}),

    
  


  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyUserMutation, useResendOtpMutation,  useRequestPasswordResetMutation, useResetPasswordMutation,   useGetDashboardQuery, useGetPromoCodesQuery, useCreatePromotionMutation, useGetFAQsQuery, useCreateFAQMutation, useGetUserDetailsQuery,
useLazyGetUserDetailsQuery, useCreateUserMutation,useGetOrderDetails} = api;

export default api;
