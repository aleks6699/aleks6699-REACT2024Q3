import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import Header from '../components/header/header';
import Main from '../components/main/result';
import Loading from '../components/loading/loading';
import ButtonError from '../components/button-error/button-error';
import Pagination from '../components/pagination/pagination';

// Интерфейс для планеты
export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  diameter: string;
  rotation_period: string;
}

const Page: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<string>('1');
  const [activePage, setActivePage] = useState<string>('1');
  // const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const handleInput = (event: FormEvent) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const getData = useCallback(
    async (searchTerm: string, currentPage: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://swapi.dev/api/planets/?search=${searchTerm.trim()}&page=${currentPage}`
        );
        const data = await response.json();
        setSearchResults(data.results);
        localStorage.setItem('inputValue', searchTerm);
        localStorage.setItem('searchResults', JSON.stringify(data.results));
        const totalPages = Math.ceil(data.count / 10).toString();
        setPage(totalPages);
        localStorage.setItem('page', totalPages);
        localStorage.setItem('activePage', currentPage);
        setActivePage(currentPage);

        return console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleClick = async () => {
    return await getData(inputValue, '1');
  };

  const throwError = () => {
    setHasError(true);
  };

  const clickPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent ?? '1';
    setActivePage(newPage);
    getData(inputValue, newPage);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('inputValue');
    const savedResults = localStorage.getItem('searchResults');
    const savedPage = localStorage.getItem('page');
    const savedActivePage = localStorage.getItem('activePage'); // Восстанавливаем активную страницу
    if (savedValue && savedResults && savedPage && savedActivePage) {
      setInputValue(savedValue);
      setSearchResults(JSON.parse(savedResults));
      setPage(savedPage || '1');
      setActivePage(savedActivePage || '1'); // Устанавливаем активную страницу
    } else {
      getData('', '1');
    }
  }, [getData]);

  if (hasError) {
    throw new Error('Why did you break everything?)');
  }

  return (
    <>
      <Header
        inputValue={inputValue}
        onInput={handleInput}
        onClick={handleClick}
      />
      {isLoading ? <Loading /> : <Main results={searchResults} />}
      <Pagination
        pages={page}
        activePage={activePage}
        clickPagination={clickPagination}
      />
      <ButtonError onClick={throwError} />
    </>
  );
};

export default Page;
