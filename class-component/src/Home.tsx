import './App.css';
import React, { FormEvent, useState, useEffect } from 'react';
import Header from './components/header/header';
import { Main } from './components/main/result';
import {
  useSearchParams,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import useLocalStorageAndFetch from './hooks/useLocalStorageAndFetch';
import useTheme from './hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { setPeopleData, RootState } from './store/store';
import Loading from './components/loading/loading';

export interface People {
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
  eye_color?: string;
}
export interface ResponseList {
  count: number;
  next: string | null;
  previous: null;
  results: People[];
}

export function Home() {
  const { theme } = useTheme();
  const { data }: { data: ResponseList } = useLoaderData();
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const { state } = useNavigation();

  const currentPage = searchParams.get('page') || '1';
  const searchTerm = searchParams.get('search') || '';

  const dispatch = useDispatch();
  const peopleData = useSelector((state: RootState) => state.people.people);

  useLocalStorageAndFetch(
    currentPage,
    searchTerm,
    setInputValue,
    setSearchParams
  );
  useEffect(() => {
    if (state === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state]);

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

  return (
    <div className={`wrapper ${theme ? 'light' : 'dark'}`}>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />

      {loading && <Loading />}

      <Main
        results={peopleData}
        activePage={currentPage}
        clickPagination={clickPagination}
      />
    </div>
  );
}
