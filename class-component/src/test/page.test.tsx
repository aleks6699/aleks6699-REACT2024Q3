import { describe, it, expect, vi } from 'vitest';
import { fetchPeopleData, fetchPersonDetails } from '../app/page';

describe('API functions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetchPeopleData should call fetch with the correct URL and return data', async () => {
    const mockResponse = {
      results: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const data = await fetchPeopleData('Luke', '1');

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke&page=1'
    );
    expect(data).toEqual(mockResponse);
  });

  it('fetchPersonDetails should call fetch with the correct URL and return data', async () => {
    const mockResponse = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const data = await fetchPersonDetails('1');

    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    expect(data).toEqual(mockResponse);
  });
});
