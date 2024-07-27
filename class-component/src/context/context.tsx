import { createContext } from 'react';
import { useState } from 'react';
export interface IThemeContext {
  theme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<boolean>(false);
  const toggleTheme = () => setTheme((prevTheme: boolean) => !prevTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
