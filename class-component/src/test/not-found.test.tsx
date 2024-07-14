import { render, screen } from '@testing-library/react';
import NotFound from '../components/not-found/not-found';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('NotFound component', () => {
  it('renders NotFound component correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
