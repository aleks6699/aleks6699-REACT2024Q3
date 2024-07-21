import React, { FormEvent, useState, useEffect } from 'react';
import Header from '../components/header/header';
import { Main } from '../components/main/result';
import Loading from '../components/loading/loading';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';
import useTheme from '../hooks/useTheme';
import { useGetPeopleQuery } from '../services/dataPersons';
import { useSelector, useDispatch } from 'react-redux';
import { setPeopleData, RootState } from '../store/store';

export interface People {
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
  previous: null;
  results: People[];
}

export function Page() {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    page: '1',
  });

  const currentPage = searchParams.get('page') || '1';
  const searchTerm = searchParams.get('search') || '';

  const { data, isFetching } = useGetPeopleQuery({
    searchTerm,
    currentPage,
  });

  useLocalStorageAndFetch(
    currentPage,
    searchTerm,
    setInputValue,
    setSearchParams
  );

  const dispatch = useDispatch();
  const peopleData = useSelector((state: RootState) => state.people.people);

  useEffect(() => {
    if (data) {
      dispatch(setPeopleData(data));
    }
  }, [data, dispatch]);

  const handleInput = (event: FormEvent) => {
    event.preventDefault();
    setInputValue((event.target as HTMLInputElement).value.trim());
  };

  const handleClick = () => {
    setSearchParams({ search: inputValue, page: '1' });
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    setSearchParams({ search: inputValue, page: newPage });
  };

  if (isFetching) return <Loading />;

  return (
    <div className={`wrapper ${theme ? 'light' : 'dark'}`}>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />
      {isFetching && <Loading />}
      <Main
        results={peopleData}
        activePage={currentPage}
        clickPagination={clickPagination}
      />
    </div>
  );
}
