import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { starWarsApi } from '../services/dataPersons';
import { ResponseList, People } from '../App';
export const peopleSlice = createSlice({
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

export const detailsPersonSlice = createSlice({
  name: 'detailsPerson',
  initialState: {
    personDetails: {} as People,
  },
  reducers: {
    setSelectedPerson: (state, action: PayloadAction<People>) => {
      state.personDetails = action.payload;
    },
  },
});

export const favoritesListSlice = createSlice({
  name: 'favoritesList',
  initialState: {
    favoritesList: [],
  },
  reducers: {
    addFavorite: (
      state: { favoritesList: People[] },
      action: PayloadAction<People>
    ) => {
      if (action.payload) {
        if (
          !state.favoritesList.some((item) => item.name === action.payload.name)
        ) {
          state.favoritesList.push(action.payload);
        }
      }
    },
    removeFavorite: (
      state: { favoritesList: People[] },
      action: PayloadAction<string>
    ) => {
      state.favoritesList = state.favoritesList.filter(
        (item) => item.name !== action.payload
      );
    },

    clearFavorites: (state: { favoritesList: People[] }) => {
      state.favoritesList = [];
    },
  },
});

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,

    people: peopleSlice.reducer,

    favoritesList: favoritesListSlice.reducer,

    detailsPerson: detailsPersonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export const { setSelectedPerson } = detailsPersonSlice.actions;

export const detailsPersonReducer = detailsPersonSlice.reducer;

export const { setPeopleData } = peopleSlice.actions;
export default peopleSlice.reducer;

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesListSlice.actions;
export const favoritesListReducer = favoritesListSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
