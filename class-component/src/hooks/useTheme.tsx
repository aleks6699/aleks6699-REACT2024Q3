import { useContext } from 'react';
import { ThemeContext } from '../context/context';
import { IThemeContext } from '../context/context';

export default function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
