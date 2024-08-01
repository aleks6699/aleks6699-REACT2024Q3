import ClientPage from './clientPage';

async function fetchPeopleData(search: string, page: string) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  return res.json();
}

async function fetchPersonDetails(details: string) {
  const res = await fetch(`https://swapi.dev/api/people/${details}`);
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const search = searchParams.search || '';
  const page = searchParams.page || '1';
  const details = searchParams.details || '1';

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
