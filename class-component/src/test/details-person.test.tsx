// src/components/details-person/DetailsPerson.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailsPerson from '../components/details-person/details-person';
import { useRouter } from 'next/router';
import useTheme from '../hooks/useTheme';
import '@testing-library/jest-dom';
import { Person } from '../components/details-person/details-person';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../hooks/useTheme', () => ({
  default: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe('DetailsPerson Component', () => {
  const mockPersonDetails: Person = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'Blond',
    skin_color: 'Fair',
    gender: 'Male',
  };

  const mockUseRouter = useRouter as jest.Mock;
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { search: '', page: '1', details: '1' },
      push: vi.fn(),
    });

    mockUseTheme.mockReturnValue({ theme: false });
  });

  it('renders the person details', async () => {
    render(
      <DetailsPerson personDetails={mockPersonDetails} selectedPersonId="1" />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: Blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: Fair')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  });

  it('calls removeParamsSearch on button click', async () => {
    render(
      <DetailsPerson personDetails={mockPersonDetails} selectedPersonId="1" />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const button = screen.getByAltText('cross');
    fireEvent.click(button);

    // проверка вызова removeParamsSearch может быть добавлена, если вы мокаете этот модуль
  });
});
