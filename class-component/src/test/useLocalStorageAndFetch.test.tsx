import { vi, describe, it, expect } from 'vitest';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';
import { renderHook } from '@testing-library/react';

describe('useLocalStorageAndFetch', () => {
  it('sets and gets localStorage value correctly', () => {
    const currentPage = '1';
    const searchTerm = '';
    const mockGetData = vi.fn<(page: string, search: string) => void>();
    const mockSetInputValue = vi.fn<(value: string) => void>();
    const mockSetSearchParams = vi.fn<(params: URLSearchParams) => void>();

    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    const mockStorage = {
      getItem: (key: string) => localStorageMock.getItem(key),
      setItem: (key: string, value: string) =>
        localStorageMock.setItem(key, value),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
    });

    renderHook(() =>
      useLocalStorageAndFetch(
        currentPage,
        searchTerm,
        mockGetData,
        mockSetInputValue,
        mockSetSearchParams
      )
    );

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'inputValue',
      searchTerm
    );
    expect(localStorageMock.getItem).toHaveBeenCalledWith('inputValue');

    expect(mockSetInputValue).toHaveBeenCalledWith(searchTerm);

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockSetSearchParams.mock.calls.length).toBe(1);
    const params = mockSetSearchParams.mock.calls[0][0] as URLSearchParams;
    expect(params.get('search')).toEqual(searchTerm);
    expect(params.get('page')).toEqual(currentPage);

    expect(mockGetData).toHaveBeenCalledWith(currentPage, searchTerm);
  });
});
