import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ searchTerm = '', currentPage = '1' }) =>
        `people/?search=${searchTerm}&page=${currentPage}`,
    }),
    getPersonById: builder.query({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = starWarsApi;
