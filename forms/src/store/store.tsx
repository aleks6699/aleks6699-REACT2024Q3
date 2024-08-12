import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import countries from '../data/dataCountry';
import IForms from '../types/types';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { countries: countries },
  reducers: {},
});
const formsSlice = createSlice({
  name: 'countries',
  initialState: { forms: [] as IForms[] },
  reducers: {
    createUserData: (state, action: PayloadAction<IForms>) => {
      state.forms.push(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    forms: formsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const { createUserData } = formsSlice.actions;
