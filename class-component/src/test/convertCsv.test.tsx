import { describe, it, expect } from 'vitest';
import convertToCSV from '../utils/convertCsv';
import { People } from '../app/clientPage';

const peopleData: People[] = [
  {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    skin_color: 'fair',
    eye_color: 'blue',
    gender: 'male',
    mass: '77',
    height: '172',
    hair_color: '',
  },
  {
    name: 'Leia Organa',
    url: 'https://swapi.dev/api/people/5/',
    skin_color: 'light',
    eye_color: 'brown',
    gender: 'female',
    mass: '49',
    height: '150',
    hair_color: '',
  },
];

describe('convertToCSV', () => {
  it('should correctly convert people data to CSV format', () => {
    const expectedCSV =
      'data:text/csv;charset=utf-8,Name;URL;Skin;Eye;Gender;Mass;Height%0ALuke%20Skywalker;https://swapi.dev/api/people/1/;fair;blue;male;77;172%0ALeia%20Organa;https://swapi.dev/api/people/5/;light;brown;female;49;150';

    const csv = convertToCSV(peopleData);
    expect(csv).toBe(expectedCSV);
  });
});
