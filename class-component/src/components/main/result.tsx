import './main.css';
import NotFound from '../not-found/not-found';
import Pagination from '../pagination/pagination';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../loading/loading';
import { ResponseList, People } from '../../view/page';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../../utils/controlsParamsSearch';
import useTheme from '../../hooks/useTheme';
import { MagicCheckbox } from '../checkedCards/checkedCards';
import { useGetPersonByIdQuery } from '../../services/dataPersons';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavorite,
  RootState,
  AppDispatch,
  removeFavorite,
} from '../../store/store';

export interface MainProps {
  results: ResponseList;
  clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  activePage?: string;
}

export function Main({ results, clickPagination, activePage }: MainProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const { theme } = useTheme();
  const { data: personDetails, isFetching } = useGetPersonByIdQuery(
    selectedPersonId,
    {
      skip: !selectedPersonId,
    }
  );

  const dispatch = useDispatch<AppDispatch>();

  const { favoritesList } = useSelector((state: RootState) => state);
  console.log(favoritesList);
  function checkFavorite(id: string) {
    if (!id) return false;
    return favoritesList.favoritesList.some(
      (item: People) => getId(item.url) === id
    );
  }

  const totalPages = Math.ceil(results.count / 10).toString();

  function changeFavorite(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget as HTMLInputElement;
    const parentElement = target.closest('[data-id]');
    const id = parentElement?.getAttribute('data-id');
    if (id) {
      if (target.checked) {
        setSelectedPersonId(id);
        dispatch(addFavorite(personDetails));
      }
    }

    if (!target.checked) {
      dispatch(removeFavorite(personDetails.name as string));
    }
  }

  function closeDetailsCard(event: React.MouseEvent): void {
    event.stopPropagation();
    removeParamsSearch('details');
  }

  function clickCard(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('data-id');
    if (id) {
      setSelectedPersonId(id);
      addParamsSearch(id, 'details');
    }
  }
  function getId(url: string | null): string | null {
    if (!url) return null;
    const match = url.match(/\d+\/$/);
    const id = match ? match[0].replace('/', '') : null;
    return id;
  }

  return (
    <main className={`main ${theme ? 'light' : 'dark'}`}>
      <div className="wrapper-main">
        <div
          className="results"
          onClick={closeDetailsCard}
          aria-hidden="true"
          role="button"
          tabIndex={0}
        >
          {results.count === 0 ? (
            <NotFound />
          ) : (
            results.results.map((result, index) => {
              const id = getId(result.url);
              if (!id) return null;
              const isFavorite = checkFavorite(id);

              return (
                <button
                  className="result-item"
                  key={index}
                  data-id={id}
                  onClick={clickCard}
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt={result.name}
                  />
                  <h2>{result.name}</h2>
                  <MagicCheckbox
                    onCange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      changeFavorite(event)
                    }
                    checked={isFavorite}
                  />
                </button>
              );
            })
          )}
        </div>
        {isFetching ? (
          <Loading />
        ) : selectedPersonId && personDetails ? (
          <Outlet context={{ personDetails, selectedPersonId }} />
        ) : null}
      </div>

      <Pagination
        pages={totalPages}
        clickPagination={clickPagination}
        activePage={activePage}
      />
    </main>
  );
}
