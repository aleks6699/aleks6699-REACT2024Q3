import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import InputSearch from '../components/header/input/input-search';
describe('InputSearch', () => {
  it('renders input field with placeholder', () => {
    render(<InputSearch />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onInput function with input event', () => {
    const handleInput = vi.fn();
    render(<InputSearch onInput={handleInput} />);
    const inputElement = screen.getByPlaceholderText('Search');

    fireEvent.input(inputElement, { target: { value: 'Luke Skywalker' } });
    expect(handleInput).toHaveBeenCalledTimes(1);
  });

  it('displays correct initial value', () => {
    render(<InputSearch value="Initial Value" />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toHaveValue('Initial Value');
  });
});
