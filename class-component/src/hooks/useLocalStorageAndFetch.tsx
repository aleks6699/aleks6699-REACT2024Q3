'use client';
import { useEffect } from 'react';

const useLocalStorageAndFetch = (
  currentPage: string,
  searchTerm: string | null,
  setInputValue: (value: string) => void,
  setSearchParams: (params: URLSearchParams) => void
) => {
  useEffect(() => {
    localStorage.setItem('inputValue', searchTerm || '');
    const savedValue = localStorage.getItem('inputValue');
    setInputValue(savedValue || '');

    const params = new URLSearchParams();
    params.set('search', savedValue || '');
    params.set('page', currentPage || '1');
    setSearchParams(params);

    return () => {
      localStorage.setItem('inputValue', searchTerm || '');
    };
  }, [currentPage]);
};

export default useLocalStorageAndFetch;
