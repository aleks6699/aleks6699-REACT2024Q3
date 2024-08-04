import ClientPage from './clientPage';

export async function fetchPeopleData(search: string, page: string) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  return res.json();
}

export async function fetchPersonDetails(details: string) {
  const res = await fetch(`https://swapi.dev/api/people/${details}`);
  return res.json();
}

export default async function Page({
  searchParams = {},
}: {
  searchParams?: { search?: string; page?: string; details?: string };
}) {
  const search = searchParams.search || '';
  const page = searchParams.page || '1';
  const details = searchParams.details || '';

  const peopleData = await fetchPeopleData(search, page);
  const personDetails = await fetchPersonDetails(details);

  return (
    <div>
      <ClientPage
        data={peopleData || null}
        personDetails={personDetails}
        search={search}
        page={page}
      />
    </div>
  );
}
