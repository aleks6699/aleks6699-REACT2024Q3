import './main.css';
import NotFound from '../not-found/not-found';
import Pagination from '../pagination/pagination';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../loading/loading';
import { ResponseList } from '../../view/page';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../../utils/controlsParamsSearch';
import useTheme from '../../hooks/useTheme';
import { MagicCheckbox } from '../checkedCards/checkedCards';
import { useGetPersonByIdQuery } from '../../services/dataPersons';

export interface MainProps {
  results: ResponseList;
  clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  activePage?: string;
}

export function Main({ results, clickPagination, activePage }: MainProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const { theme } = useTheme();
  const {
    data: personDetails,
    isLoading,
    error,
    isFetching,
  } = useGetPersonByIdQuery(selectedPersonId, {
    skip: !selectedPersonId,
  });

  console.log('Selected Person ID:', selectedPersonId);
  console.log('Person Details:', personDetails);
  console.log('Error:', error);
  console.log('Loading:', isLoading);
  console.log('Fetching:', isFetching);

  const totalPages = Math.ceil(results.count / 10).toString();

  function closeDetailsCard(event: React.MouseEvent): void {
    event.stopPropagation();
    // setSelectedPersonId(null);
    removeParamsSearch('details');
  }

  function clickCard(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('data-id');
    if (id) {
      console.log('Clicked ID:', id); // Лог для проверки
      setSelectedPersonId(id);
      addParamsSearch(id, 'details');
    }
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
              const url = result.url;
              const match = url.match(/\d+\/$/);
              const id = match ? match[0].replace('/', '') : null;

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
                  <MagicCheckbox />
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

// export interface MainProps {
//   results: ResponseList;
//   clickPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   activePage?: string;
// }

// export function Main({ results, clickPagination, activePage }: MainProps) {
//   const [personDetails, setPersonDetails] = useState({});
//   const { isLoading, setIsLoading } = useLoader();
//   const { theme } = useTheme();
//   const totalPages = Math.ceil(results.count / 10).toString();
//   const dataPerson = async (id: string) => {
//     setIsLoading(true);
//     try {
//       if (!id) return;
//       const response = await fetch(`https://swapi.dev/api/people/${id}/`);
//       const data = await response.json();

//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   function closeDetailsCard(event: React.MouseEvent): void {
//     event.stopPropagation();
//     setPersonDetails({});
//     removeParamsSearch('details');
//   }
//   console.log(personDetails);

//   async function clickCard(event: React.MouseEvent<HTMLButtonElement>) {
//     const target = event.currentTarget as HTMLElement;
//     const id = target.getAttribute('data-id');
//     if (!id) return;

//     const person = await dataPerson(id);
//     setPersonDetails({ ...person, id });
//     addParamsSearch(id, 'details');
//     return person;
//   }

//   return (
//     <main className={`main ${theme ? 'light' : 'dark'}`}>
//       <div className="wrapper-main">
//         <div
//           className="results"
//           onClick={(event) => closeDetailsCard(event)}
//           aria-hidden="true"
//           role="button"
//           tabIndex={0}
//         >
//           {results.count === 0 ? (
//             <NotFound />
//           ) : (
//             results.results.map((result, index) => {
//               const url = result.url;
//               const match = url.match(/\d+\/$/);
//               const id = match ? match[0].replace('/', '') : null;

//               return (
//                 <button
//                   className="result-item"
//                   key={index}
//                   data-id={id}
//                   onClick={(event) => clickCard(event)}
//                 >
//                   <img
//                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
//                     alt={result.name}
//                   />
//                   <h2>{result.name}</h2>
//                   <MagicCheckbox />
//                 </button>
//               );
//             })
//           )}
//         </div>
//         {isLoading ? (
//           <Loading />
//         ) : Object.keys(personDetails).length === 0 ? null : (
//           <Outlet context={personDetails} />
//         )}
//       </div>

//       <Pagination
//         pages={totalPages}
//         clickPagination={(event) => clickPagination && clickPagination(event)}
//         activePage={activePage}
//       />
//     </main>
//   );
// }
