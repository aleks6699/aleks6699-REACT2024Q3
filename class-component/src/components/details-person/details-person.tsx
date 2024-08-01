'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './details-person.module.css';
import { removeParamsSearch } from '../../utils/controlsParamsSearch';
import useTheme from '../../hooks/useTheme';
import Loading from '../../app/loading';

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  url?: string;
}

interface ContextValue {
  personDetails: Person;
  selectedPersonId: string;
}

export default function DetailsPerson({
  personDetails,
  selectedPersonId,
}: ContextValue) {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDetails, setShowDetails] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentPage = searchParams.get('page') || '1';
    const currentDetails = searchParams.get('details');

    if (currentDetails !== selectedPersonId) {
      setLoading(true);
      const updatedSearchParams = new URLSearchParams({
        search: currentSearch,
        page: currentPage,
        details: selectedPersonId,
      }).toString();

      router.push(`?${updatedSearchParams}`);
      setLoading(false);
    }
  }, [selectedPersonId, searchParams, router]);
  const handleClick = () => {
    setShowDetails(!showDetails);
    removeParamsSearch('details');
  };

  useEffect(() => {
    setShowDetails(true);
  }, [personDetails]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : showDetails ? (
        <div
          className={`${styles.details_person} ${theme ? styles.light : ''}`}
        >
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${selectedPersonId}.jpg`}
            alt={personDetails.name}
            priority
            width={300}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          />

          <button className={styles.cross} onClick={handleClick}>
            <Image src="/cross.png" alt="cross" width={60} height={60} />
          </button>

          <h1>{personDetails.name}</h1>
          <p>Height: {personDetails.height}</p>
          <p>Mass: {personDetails.mass}</p>
          <p>Hair color: {personDetails.hair_color}</p>
          <p>Skin color: {personDetails.skin_color}</p>
          <p>Gender: {personDetails.gender}</p>
        </div>
      ) : null}
    </>
  );
}
