import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import Pagination from '../components/pagination/pagination';

// Mock useTheme hook
vi.mock('../hooks/useTheme.tsx', () => ({
  __esModule: true,
  default: () => ({
    theme: false,
  }),
}));

describe('Pagination component', () => {
  it('should call clickPagination when a page button is clicked', () => {
    const clickPaginationMock = vi.fn();

    render(
      <Pagination
        pages="3"
        activePage="1"
        clickPagination={clickPaginationMock}
      />
    );

    const buttons = screen.getAllByRole('button');

    // Click the second button
    fireEvent.click(buttons[1]);

    expect(clickPaginationMock).toHaveBeenCalled();
  });

  it('should not render pagination if pages is 0', () => {
    render(<Pagination pages="0" clickPagination={() => {}} />);

    // Check if the pagination container is not in the document
    expect(screen.queryByRole('region')).toBeNull();
  });
});
