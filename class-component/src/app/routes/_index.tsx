import { Home } from '../../Home';
import { fetchPeopleData, fetchPersonDetails } from '../../data/data';
import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.get('page') || '1';
  const details = url.searchParams.get('details');

  try {
    const promises = [
      fetchPeopleData(search, page),
      details ? fetchPersonDetails(details) : Promise.resolve(null), // Если нет details, возвращаем null
    ];

    const [data, personDetails] = await Promise.all(promises);

    return json({ data, personDetails });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return json(
      {
        peopleData: { results: [], count: 0, next: null, previous: null },
        personDetails: null,
      },
      { status: 500 }
    );
  }
};

export default function Index() {
  return <Home />;
}
