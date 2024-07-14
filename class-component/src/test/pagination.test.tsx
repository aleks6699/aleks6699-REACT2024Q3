import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/pagination';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Pagination component', () => {
  it('renders correct number of page buttons', () => {
    const pages = '5';
    render(<Pagination pages={pages} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it('calls clickPagination function when a page button is clicked', () => {
    const pages = '3';
    const mockClickPagination = vi.fn();

    render(<Pagination pages={pages} clickPagination={mockClickPagination} />);

    const firstButton = screen.getByText('1');
    fireEvent.click(firstButton);

    expect(mockClickPagination).toHaveBeenCalled();
  });

  it('applies active class to the active page button', () => {
    const pages = '4';
    const activePage = '2';

    render(<Pagination pages={pages} activePage={activePage} />);

    const activeButton = screen.getByText('2');
    expect(activeButton).toHaveClass('active');
  });
});
