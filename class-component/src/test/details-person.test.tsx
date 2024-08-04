import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import DetailsPerson from '../components/details-person/details-person';
import ThemeProvider from '../context/context';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: (key: string) => (key === 'details' ? '1' : ''),
  })),
}));

vi.mock('../app/loading', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

const TestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider>{children}</ThemeProvider>;

describe('DetailsPerson component', () => {
  it('should display person details correctly', () => {
    render(
      <TestProvider>
        <DetailsPerson
          personDetails={{
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            gender: 'male',
          }}
          selectedPersonId="1"
        />
      </TestProvider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('should handle button click and toggle details visibility', () => {
    render(
      <TestProvider>
        <DetailsPerson
          personDetails={{
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            gender: 'male',
          }}
          selectedPersonId="1"
        />
      </TestProvider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Luke Skywalker')).toBeNull();
  });
});
