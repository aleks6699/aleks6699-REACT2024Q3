import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  peopleSlice,
  detailsPersonSlice,
  favoritesListSlice,
  RootState,
} from '../store/store';
import { People, ResponseList } from '../Home'; // Убедитесь, что путь корректный

describe('Redux Store', () => {
  let store: ReturnType<typeof configureStore>;
  let initialState: RootState;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        people: peopleSlice.reducer,
        favoritesList: favoritesListSlice.reducer,
        detailsPerson: detailsPersonSlice.reducer,
      },
    });
    initialState = store.getState() as RootState;
  });

  it('should handle setting people data', () => {
    const responseList: ResponseList = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          gender: 'male',
          homeworld: 'Tatooine',
        },
      ],
    };

    store.dispatch(peopleSlice.actions.setPeopleData(responseList));

    const state = store.getState() as RootState;
    expect(state.people.people).toEqual(responseList);
  });

  it('should handle setting selected person details', () => {
    const person: People = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      gender: 'male',
      homeworld: 'Tatooine',
    };

    store.dispatch(detailsPersonSlice.actions.setSelectedPerson(person));

    const state = store.getState() as RootState;
    expect(state.detailsPerson.personDetails).toEqual(person);
  });

  it('should handle adding a favorite', () => {
    const person: People = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      gender: 'male',
      homeworld: 'Tatooine',
    };

    store.dispatch(favoritesListSlice.actions.addFavorite(person));

    const state = store.getState() as RootState;
    expect(state.favoritesList.favoritesList).toContainEqual(person);
  });

  it('should handle removing a favorite', () => {
    const person: People = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      gender: 'male',
      homeworld: 'Tatooine',
    };

    store.dispatch(favoritesListSlice.actions.addFavorite(person));
    store.dispatch(favoritesListSlice.actions.removeFavorite(person.name));

    const state = store.getState() as RootState;
    expect(state.favoritesList.favoritesList).not.toContainEqual(person);
  });

  it('should handle clearing favorites', () => {
    const person: People = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      gender: 'male',
      homeworld: 'Tatooine',
    };

    store.dispatch(favoritesListSlice.actions.addFavorite(person));
    store.dispatch(favoritesListSlice.actions.clearFavorites());

    const state = store.getState() as RootState;
    expect(state.favoritesList.favoritesList).toHaveLength(0);
  });
});
