'use client';
import { FormEvent } from 'react';
import styles from './input-search.module.css';
import useTheme from '../../../hooks/useTheme';

type InputSearchProps = {
  value?: string;
  onInput?: (event: FormEvent) => void;
};

export default function InputSearch({ value, onInput }: InputSearchProps) {
  const { theme } = useTheme();
  return (
    <input
      className={`${styles.input_search} ${theme ? styles.light : ''}`}
      type="text"
      placeholder="Search"
      value={value}
      onInput={onInput}
    />
  );
}
