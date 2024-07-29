// import './App.css';
import React, { FormEvent, useState, useEffect } from 'react';
import Header from '../components/header/header';
import { Main } from '../components/main/result';
import Loading from '../components/loading/loading';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';
import { useRouter } from 'next/router';
import useTheme from '../hooks/useTheme';
import { useGetPeopleQuery } from '../services/dataPersons';
import { useSelector, useDispatch } from 'react-redux';
import { setPeopleData, RootState } from '../store/store';

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

export default function Pages() {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();
  const { search = '', page = '1' } = router.query;

  const { data, isFetching } = useGetPeopleQuery({
    searchTerm: search as string,
    currentPage: page as string,
  });

  useLocalStorageAndFetch(
    page as string,
    search as string,
    setInputValue,
    (newParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...Object.fromEntries(newParams) },
      });
    }
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
    router.push({ query: { search: inputValue, page: '1' } });
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    router.push({ query: { search: inputValue, page: newPage } });
  };

  return (
    <div className={`wrapper ${theme ? 'light' : ''}`}>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />
      {isFetching && <Loading />}
      <Main
        results={peopleData}
        activePage={page as string}
        clickPagination={clickPagination}
      />
    </div>
  );
}
