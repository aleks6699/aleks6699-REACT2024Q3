'use client';
export function addParamsSearch(id: string, name: string) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, id);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

export function removeParamsSearch(name: string) {
  const params = new URLSearchParams(window.location.search);
  params.delete(name);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}
