import Index, { loader } from '../app/routes/_index';
import { fetchPeopleData, fetchPersonDetails } from '../data/data';
import { ThemeProvider } from '../context/context';
import { vi } from 'vitest';
import { LoaderFunctionArgs } from '@remix-run/router';
import { AppLoadContext } from '@remix-run/node';

vi.mock('../data/data', () => ({
  fetchPeopleData: vi.fn(),
  fetchPersonDetails: vi.fn(),
}));

describe('Index Component and Loader', () => {
  const mockPeopleData = { results: [], count: 0, next: null, previous: null };
  const mockPersonDetails = { name: 'Luke Skywalker', height: '172' };

  beforeEach(() => {
    (fetchPeopleData as jest.Mock).mockResolvedValue(mockPeopleData);
    (fetchPersonDetails as jest.Mock).mockResolvedValue(mockPersonDetails);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches people data and person details correctly', async () => {
    const request = new Request(
      'http://localhost:3000/?search=&page=1&details=1'
    );
    const loaderArgs: LoaderFunctionArgs & { context: AppLoadContext } = {
      request,
      params: {},
      context: {},
    };
    const response = await loader(loaderArgs);
    if (response) {
      const data = await (response as Response).json();
      expect(data).toEqual({
        data: mockPeopleData,
        personDetails: mockPersonDetails,
      });
      expect(fetchPeopleData).toHaveBeenCalledWith('', '1');
      expect(fetchPersonDetails).toHaveBeenCalledWith('1');
    }
  });

  it('handles errors during data fetching', async () => {
    (fetchPeopleData as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );
    const request = new Request(
      'http://localhost:3000/?search=&page=1&details=1'
    );
    const loaderArgs: LoaderFunctionArgs & { context: AppLoadContext } = {
      request,
      params: {},
      context: {},
    };
    const response = await loader(loaderArgs);
    if (response) {
      const data = await (response as Response).json();
      expect(data).toEqual({
        peopleData: { results: [], count: 0, next: null, previous: null },
        personDetails: null,
      });
      expect((response as Response).status).toBe(500);
    }
  });
});
