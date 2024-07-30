import React, { FormEvent, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setPeopleData, RootState } from '../store/store';
import Header from '../components/header/header';
import { Main } from '../components/main/result';
import useLocalStorageAndFetch from '../hooks/useLocalStorageAndFetch';
import useTheme from '../hooks/useTheme';
import Loading from '../components/loading/loading';

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
}

export default function Home({ data, personDetails }: HomeProps) {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Добавлено состояние загрузки
  const router = useRouter();
  const { search = '', page = '1' } = router.query;

  useLocalStorageAndFetch(
    page as string,
    search as string,
    setInputValue,
    (newParams) => {
      setLoading(true);
      router
        .push({
          pathname: router.pathname,
          query: { ...router.query, ...Object.fromEntries(newParams) },
        })
        .finally(() => setLoading(false));
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
    setLoading(true);
    router
      .push({ query: { search: inputValue, page: '1' } })
      .finally(() => setLoading(false));
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    setLoading(true);
    router
      .push({ query: { search: inputValue, page: newPage } })
      .finally(() => setLoading(false));
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
        activePage={page as string}
        clickPagination={clickPagination}
        personDetails={personDetails}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search = '', page = '1', details = '' } = context.query;

  const peopleDataPromise = fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  ).then((res) => res.json());
  const personDetailsPromise = details
    ? fetch(`https://swapi.dev/api/people/${details}`).then((res) => res.json())
    : Promise.resolve(null);

  const [peopleData, personDetailsData] = await Promise.all([
    peopleDataPromise,
    personDetailsPromise,
  ]);

  return {
    props: {
      data: peopleData,
      personDetails: personDetailsData,
    },
  };
};
