import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailsPerson from '../components/details-person/details-person';

vi.mock('@remix-run/react', () => ({
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

vi.mock('../utils/controlsParamsSearch', () => ({
  removeParamsSearch: vi.fn(),
}));

describe('DetailsPerson Component', () => {
  const personDetails = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('renders person details correctly', () => {
    render(
      <DetailsPerson personDetails={personDetails} selectedPersonId="1" />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('toggles the visibility of the details when clicking the cross button', () => {
    render(
      <DetailsPerson personDetails={personDetails} selectedPersonId="1" />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
