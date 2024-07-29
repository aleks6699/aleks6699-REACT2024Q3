import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
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
