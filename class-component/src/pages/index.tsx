import Pages from '../view/pages';
import { GetServerSideProps } from 'next';

export default function Home() {
  return <Pages />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search = '', page = '1', details = '' } = context.query;
  console.log(context.query);
  console.log(search, page, details);

  const peopleDataPromise = fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  ).then((res) => res.json());
  const personDetailsPromise = details
    ? fetch(`https://swapi.dev/api/people/${details}`).then((res) => res.json())
    : Promise.resolve(null);

  const [peopleData, personDetailsData] = await Promise.all([
    peopleDataPromise,
    personDetailsPromise,
  ]);

  return {
    props: {
      data: peopleData,
      personDetails: personDetailsData,
    },
  };
};
