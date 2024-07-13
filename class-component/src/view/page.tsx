import React, { FormEvent, useState, useCallback } from 'react';
import Header from '../components/header/header';
import { Main } from '../components/main/result';
import Loading from '../components/loading/loading';
import { useLoader } from '../hooks/useLoader';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';

interface People {
  url: string;
  name: string | undefined;
  results: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    gender: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    created?: string;
    edited?: string;
    url?: string;
    id?: string;
  };
}
export interface ResponseList {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
}

//
export function Page() {
  const [inputValue, setInputValue] = useState<string>('');
  const { isLoading, setIsLoading } = useLoader();
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    page: '1',
  });
  const [searchResults, setSearchResults] = useState<ResponseList>({
    count: 1,
    next: null,
    previous: null,
    results: [],
  });
  const currentPage = searchParams.get('page') as string;
  const searchTerm = searchParams.get('search');
  const getData = useCallback(
    async (currentPage: string, searchTerm: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${searchTerm.trim()}&page=${currentPage}`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
        return true;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setSearchResults]
  );
  useLocalStorageAndFetch(
    currentPage,
    searchTerm,
    getData,
    setInputValue,
    setSearchParams
  );
  const handleInput = (event: FormEvent) => {
    event.preventDefault();
    setInputValue((event.target as HTMLInputElement).value.trim());
  };

  const handleClick = () => {
    getData('1', inputValue.trim());
    setSearchParams({ search: inputValue, page: '1' });
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    setSearchParams({ search: inputValue, page: newPage });
  };

  // useEffect(() => {
  //   localStorage.setItem('inputValue', searchTerm || '');
  //   const savedValue = localStorage.getItem('inputValue');
  //   setInputValue(savedValue || '');
  //   setSearchParams({ search: savedValue || '', page: currentPage || '1' });
  //   getData(currentPage || '1', searchTerm || '');

  //   return () => {
  //     localStorage.setItem('inputValue', searchTerm || '');
  //   };
  // }, [currentPage, getData]);

  return (
    <>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Main
          results={searchResults}
          activePage={currentPage}
          clickPagination={clickPagination}
        />
      )}
    </>
  );
}
