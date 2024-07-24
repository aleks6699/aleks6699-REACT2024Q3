import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ThemeProvider, ThemeContext } from '../context/context';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)!;
  return (
    <div>
      <span>Current Theme: {theme ? 'Dark' : 'Light'}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should provide the theme context and toggle the theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current Theme: Light')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(screen.getByText('Current Theme: Dark')).toBeInTheDocument();
  });
});
