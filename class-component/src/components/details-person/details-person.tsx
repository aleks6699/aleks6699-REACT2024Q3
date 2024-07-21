import './details-person.css';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { removeParamsSearch } from '../../utils/controlsParamsSearch';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
}
interface ContextValue {
  personDetails: Person;
  selectedPersonId: string;
}
export default function DetailsPerson() {
  const { personDetails, selectedPersonId }: ContextValue = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDetails, setShowDetails] = useState(true);

  const searchTerm = searchParams.get('search');
  const pageCurrent = searchParams.get('page');
  const details = searchParams.get('details');
  console.log(personDetails);

  useEffect(() => {
    if (details !== selectedPersonId) {
      setSearchParams({
        search: searchTerm || '',
        page: pageCurrent || '1',
        details: selectedPersonId,
      });
    }
  }, [details, selectedPersonId, searchTerm, pageCurrent, setSearchParams]);

  const handleClick = () => {
    setShowDetails(!showDetails);
    removeParamsSearch('details');
  };

  useEffect(() => {
    setShowDetails(true);
  }, [personDetails]);

  return (
    <>
      {showDetails ? (
        <div className="details-person">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${selectedPersonId}.jpg`}
            alt={personDetails.name}
          />
          <button className="cross" onClick={handleClick}>
            <img src="./cross.png" alt="cross" />
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
