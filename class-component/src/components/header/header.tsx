import { FormEvent } from 'react';
import styles from './header.module.css';
import InputSearch from './input/input-search';
import Button from './button/button';
import SwitchTheme from './switchTheme/switchTheme';
import useTheme from '../../hooks/useTheme';

interface HeaderProps {
  inputValue: string;
  onInput: (e: FormEvent) => void;
  onClick: () => void;
}

export default function Header({ inputValue, onInput, onClick }: HeaderProps) {
  const { theme } = useTheme();
  return (
    <div
      id="header"
      className={`${styles.header} ${theme ? styles.light : ''}`}
    >
      <div className={styles.inner_search}>
        <InputSearch value={inputValue} onInput={onInput} />
        <Button onClick={onClick} />
      </div>
      <SwitchTheme />
    </div>
  );
}
