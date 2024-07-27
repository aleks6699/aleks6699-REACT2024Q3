import { render, screen } from '@testing-library/react';
import DetailsPerson from '../components/details-person/details-person';
import { vi } from 'vitest';
import { useOutletContext, useSearchParams } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('DetailsPerson', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useSearchParams as unknown as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
  });

  it('should render person details correctly when showDetails is true', () => {
    const mockPersonDetails = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      gender: 'male',
    };
    const mockContextValue = {
      personDetails: mockPersonDetails,
      selectedPersonId: '1',
    };

    (useOutletContext as unknown as jest.Mock).mockReturnValue(
      mockContextValue
    );

    render(<DetailsPerson />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });
});
