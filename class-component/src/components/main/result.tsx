import './main.css';
import NotFound from '../not-found/not-found';
import Pagination from '../pagination/pagination';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLoader } from '../../hooks/useLoader';
import Loading from '../loading/loading';
import { ResponseList } from '../../view/page';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../../utils/controlsParamsSearch';

export interface MainProps {
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
  function closeDetailsCard(event: React.MouseEvent): void {
    event.stopPropagation();
    setPersonDetails({});
    removeParamsSearch('details');
  }

  async function clickCard(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('data-id');
    if (!id) return;

    const person = await dataPerson(id);
    setPersonDetails({ ...person, id });
    addParamsSearch(id, 'details');
    return person;
  }

  return (
    <main className="main">
      <div className="wrapper">
        <div
          className="results"
          onClick={(event) => closeDetailsCard(event)}
          aria-hidden="true"
          role="button"
          tabIndex={0}
        >
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
