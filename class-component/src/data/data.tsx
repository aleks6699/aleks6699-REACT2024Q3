// src/services/api.ts

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
