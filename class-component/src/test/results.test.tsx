import React, { useState } from 'react';
import './main.css';
import NotFound from '../components/not-found/not-found';
import { Outlet } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import Loading from '../components/loading/loading';
import { ResponseList } from '../view/page';
import Pagination from '../components/pagination/pagination';

interface MainProps {
  results: ResponseList;
  clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  activePage?: string;
}

export function Main({ results, clickPagination, activePage }: MainProps) {
  const [personDetails, setPersonDetails] = useState({});
  const { isLoading, setIsLoading } = useLoader();
  const totalPages = Math.ceil(results.count / 10).toString();

  const dataPerson = async (id: string) => {
    setIsLoading(true);
    try {
      if (!id) return;
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  async function clickCard(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('data-id');
    if (!id) return;

    const person = await dataPerson(id);
    setPersonDetails({ ...person, id });
    const params = new URLSearchParams(window.location.search);
    params.set('details', id);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
    return person;
  }

  return (
    <main className="main">
      <div className="wrapper">
        <div className="results">
          {results.count === 0 ? (
            <NotFound />
          ) : (
            results.results.map((result, index) => {
              const url = result.url;
              const match = url.match(/\d+\/$/);
              const id = match ? match[0].replace('/', '') : null;

              return (
                <button
                  className="result-item"
                  key={index}
                  data-id={id}
                  onClick={(event) => clickCard(event)}
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt={result.name}
                  />
                  <h2>{result.name}</h2>
                </button>
              );
            })
          )}
        </div>
        {isLoading ? (
          <Loading />
        ) : Object.keys(personDetails).length === 0 ? null : (
          <Outlet context={personDetails} />
        )}
      </div>

      <Pagination
        pages={totalPages}
        clickPagination={(event) => clickPagination && clickPagination(event)}
        activePage={activePage}
      />
    </main>
  );
}
