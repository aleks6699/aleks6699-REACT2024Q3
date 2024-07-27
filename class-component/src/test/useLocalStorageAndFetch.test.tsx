import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';

const mockSetItem = vi.fn();
const mockGetItem = vi.fn();
const mockSetSearchParams = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  global.localStorage = {
    setItem: mockSetItem,
    getItem: mockGetItem,
  } as unknown as Storage;
});

describe('useLocalStorageAndFetch', () => {
  it('should update localStorage and call setters correctly', () => {
    const currentPage = '2';
    const searchTerm = 'test';
    const setInputValue = vi.fn();
    const setSearchParams = mockSetSearchParams;

    mockGetItem.mockReturnValue(searchTerm);

    renderHook(() =>
      useLocalStorageAndFetch(
        currentPage,
        searchTerm,
        setInputValue,
        setSearchParams
      )
    );

    expect(mockSetItem).toHaveBeenCalledWith('inputValue', searchTerm);

    expect(setInputValue).toHaveBeenCalledWith(searchTerm);

    const params = new URLSearchParams();
    params.set('search', searchTerm);
    params.set('page', currentPage);
    expect(mockSetSearchParams).toHaveBeenCalledWith(params);
  });
});
