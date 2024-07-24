import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReactNode, FC } from 'react';

import useTheme from '../hooks/useTheme';
import { IThemeContext, ThemeContext } from '../context/context';

const TestComponent: FC = () => {
  const context = useTheme();
  return <div>{context.theme ? 'true' : 'false'}</div>;
};

const TestThemeProvider: FC<{ value: IThemeContext; children: ReactNode }> = ({
  value,
  children,
}) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

describe('useTheme', () => {
  it('should throw an error when used outside of a ThemeProvider', () => {
    const TestComponentWithInvalidContext: FC = () => {
      try {
        // eslint-disable-next-line react-compiler/react-compiler
        useTheme();
        return <div>Should throw error</div>;
      } catch (error) {
        return <div>{(error as Error).message}</div>;
      }
    };

    render(<TestComponentWithInvalidContext />);
    expect(
      screen.getByText('useTheme must be used within a ThemeProvider')
    ).toBeInTheDocument();
  });

  it('should return the correct context value', () => {
    const themeContextValue: IThemeContext = {
      theme: true,
      toggleTheme: () => {},
    };

    render(
      <TestThemeProvider value={themeContextValue}>
        <TestComponent />
      </TestThemeProvider>
    );

    expect(screen.getByText('true')).toBeInTheDocument();
  });
});
