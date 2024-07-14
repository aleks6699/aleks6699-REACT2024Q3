import './details-person.css';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { removeParamsSearch } from '../../utils/controlsParamsSearch';

interface Person {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
}

export default function DetailsPerson() {
  const person: Person = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDetails, setShowDetails] = useState(true);

  const searchTerm = searchParams.get('search');
  const pageCurrent = searchParams.get('page');
  const details = searchParams.get('details');

  useEffect(() => {
    if (details !== person.id) {
      setSearchParams({
        search: searchTerm || '',
        page: pageCurrent || '1',
        details: person.id,
      });
    }
  }, [details, person.id, searchTerm, pageCurrent, setSearchParams]);

  const handleClick = () => {
    setShowDetails(!showDetails);
    removeParamsSearch('details');
  };

  useEffect(() => {
    setShowDetails(true);
  }, [person]);

  return (
    <>
      {showDetails ? (
        <div className="details-person">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
            alt={person.name}
          />
          <button className="cross" onClick={handleClick}>
            <img src="./cross.png" alt="cross" />
          </button>

          <h1>{person.name}</h1>
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          <p>Hair color: {person.hair_color}</p>
          <p>Skin color: {person.skin_color}</p>
          <p>Gender: {person.gender}</p>
        </div>
      ) : null}
    </>
  );
}
