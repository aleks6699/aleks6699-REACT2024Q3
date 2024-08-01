'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setPeopleData, RootState } from '../store/store';
import Header from '../components/header/header';
import Main from '../components/main/result';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';
import useTheme from '../hooks/useTheme';
import Loading from './loading';

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

export interface HomeProps {
  data: ResponseList;
  personDetails: People | null;
  search: string;
  page: string;
}

function ClientPage({ data, personDetails, search, page }: HomeProps) {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>(search);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useLocalStorageAndFetch(page, search, setInputValue, (newParams) => {
    setLoading(true);
    const searchParams = new URLSearchParams(newParams);
    router.push(`/?${searchParams.toString()}`);
    setLoading(false);
  });

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
    setLoading(true);
    const searchParams = new URLSearchParams({ search: inputValue, page: '1' });
    console.log('Searching with params:', searchParams.toString());
    router.push(`/?${searchParams.toString()}`);
    setLoading(false);
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    setLoading(true);
    const searchParams = new URLSearchParams({
      search: inputValue,
      page: newPage,
    });
    router.push(`/?${searchParams.toString()}`);
    setLoading(false);
  };

  return (
    <div className={`wrapper ${theme ? 'light' : ''}`}>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />
      {loading && <Loading />}
      <Main
        results={peopleData}
        activePage={page}
        clickPagination={clickPagination}
        personDetails={personDetails}
      />
    </div>
  );
}

export default ClientPage;
