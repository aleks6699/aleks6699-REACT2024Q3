import { createSlice, configureStore } from '@reduxjs/toolkit';
import countries from '../data/dataCountry';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { countries: countries },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
