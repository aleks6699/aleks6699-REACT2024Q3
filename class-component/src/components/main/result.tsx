import './main.css';
import Pagination from '../pagination/pagination';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ResponseList, People } from '../../App';
import getId from '../../utils/getId';

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
  setSelectedPerson,
} from '../../store/store';
import Flyout from '../flyout/flyout';
import Loading from '../loading/loading';

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
  const favoritesList = useSelector(
    (state: RootState) => state.favoritesList.favoritesList
  );

  function checkFavorite(id: string) {
    if (!id) return false;
    return favoritesList.some(
      (item: People) => item.url !== undefined && getId(item.url) === id
    );
  }
  dispatch(setSelectedPerson(personDetails as People));

  const totalPages = Math.ceil(results.count / 10).toString();

  function changeFavorite(
    event: React.ChangeEvent<HTMLInputElement>,
    person: People
  ) {
    event.stopPropagation();
    if (event.target.checked) {
      dispatch(addFavorite(person));
    } else {
      dispatch(removeFavorite(person.name));
    }
  }

  function clickCard(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' &&
      (target as HTMLInputElement).type === 'checkbox'
    ) {
      return;
    }
    const parentElement = event.currentTarget as HTMLElement;
    const id = parentElement.getAttribute('data-id');
    if (id) {
      setSelectedPersonId(id);
      addParamsSearch(id, 'details');
    }
  }

  function closeDetailsCard(event: React.MouseEvent): void {
    event.stopPropagation();
    removeParamsSearch('details');
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
          {results.results.map((result, index) => {
            const id = result.url ? getId(result.url) : null;
            if (!id) return null;
            const isFavorite = checkFavorite(id);

            return (
              <div
                className="result-item"
                key={index}
                data-id={id}
                onClick={(event) => clickCard(event)}
                aria-hidden="true"
                role="button"
                tabIndex={0}
              >
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                  alt={result.name}
                />
                <h2>{result.name}</h2>
                <MagicCheckbox
                  onCange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changeFavorite(event, result)
                  }
                  checked={isFavorite}
                />
              </div>
            );
          })}
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
      <Flyout />
    </main>
  );
}
