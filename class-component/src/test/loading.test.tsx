import { render, screen } from '@testing-library/react';
import Loading from '../app/loading';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Loading component', () => {
  it('renders Loading component correctly', () => {
    render(<Loading />);

    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });
});
