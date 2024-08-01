'use client';

import styles from './main.module.css';
import Pagination from '../pagination/pagination';
import { useEffect, useState } from 'react';
import { People, ResponseList } from '../../app/clientPage';
import DetailsPerson from '../details-person/details-person';
import getId from '../../utils/getId';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../../utils/controlsParamsSearch';
import useTheme from '../../hooks/useTheme';
import MagicCheckbox from '../checkedCards/checkedCards';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavorite,
  RootState,
  AppDispatch,
  removeFavorite,
  setSelectedPerson,
} from '../../store/store';
import Flyout from '../flyout/flyout';

export interface MainProps {
  results: ResponseList;
  clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  activePage?: string;
  personDetails?: People | null;
}

export default function Main({
  results,
  clickPagination,
  activePage,
  personDetails,
}: MainProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const { theme } = useTheme();

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

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

  useEffect(() => {
    if (personDetails) {
      dispatch(setSelectedPerson(personDetails));
    }
  }, [dispatch, personDetails]);

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
    <main className={styles.main + ` ${theme ? styles.light : ''}`}>
      <div className={styles.wrapper_main}>
        <div
          className={styles.results}
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
                className={styles.result_item}
                key={index}
                data-id={id}
                onClick={(event) => clickCard(event)}
                aria-hidden="true"
                role="button"
                tabIndex={0}
              >
                <Link
                  className={styles.link_result}
                  href={{
                    pathname: '/',
                    query: {
                      search,
                      page,
                      details: id,
                    },
                  }}
                >
                  <Image
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt={result.name}
                    width={150}
                    height={200}
                    priority
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <h2>{result.name}</h2>
                  <MagicCheckbox
                    onCange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      changeFavorite(event, result)
                    }
                    checked={isFavorite}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        {selectedPersonId && personDetails ? (
          <DetailsPerson
            personDetails={personDetails}
            selectedPersonId={selectedPersonId}
          />
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
