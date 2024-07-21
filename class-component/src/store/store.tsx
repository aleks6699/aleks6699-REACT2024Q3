import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { starWarsApi } from '../services/dataPersons';
import { ResponseList } from '../view/page';

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: {
      count: 0,
      next: null || '',
      previous: null,
      results: [],
    },
  },
  reducers: {
    setPeopleData: (
      state: { people: ResponseList },
      action: PayloadAction<ResponseList, string>
    ) => {
      state.people = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,

    people: peopleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export const { setPeopleData } = peopleSlice.actions;
export default peopleSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
