// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.navingtechnologies.com/alto/public/api' }), // Adjust the baseUrl as needed
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (body) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body,
//       }),
//     }),
//     register: builder.mutation({
//       query: (body) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body,
//       }),
//     }),
//     // Define other endpoints here
//   }),
// });

// export const { useLoginMutation, useRegisterMutation } = api;
// export default api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.navingtechnologies.com/alto/public/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    // Define other endpoints here
  }),
});

export const { useLoginMutation } = api;
export default api;
