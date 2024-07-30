import { describe, it, expect } from 'vitest';
import { ResponseList } from '../pages';
import { peopleSlice } from '../store/store';

describe('peopleSlice', () => {
  it('should handle initial state', () => {
    expect(peopleSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      people: {
        count: 0,
        next: '',
        previous: null,
        results: [],
      },
    });
  });

  it('should handle setPeopleData', () => {
    const initialState = peopleSlice.getInitialState();
    const payload: ResponseList = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          url: 'url1',
          skin_color: 'fair',
          eye_color: 'blue',
          gender: 'male',
          mass: '77',
          height: '172',
          hair_color: '',
        },
        {
          name: 'Leia Organa',
          url: 'url2',
          skin_color: 'light',
          eye_color: 'brown',
          gender: 'female',
          mass: '49',
          height: '150',
          hair_color: '',
        },
      ],
    };

    const action = { type: 'people/setPeopleData', payload };
    const newState = peopleSlice.reducer(initialState, action);

    expect(newState).toEqual({
      people: payload,
    });
  });
});
