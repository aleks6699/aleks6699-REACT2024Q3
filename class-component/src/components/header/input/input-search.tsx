import { FormEvent } from 'react';
import './input-search.css';

type InputSearchProps = {
  value?: string;
  onInput?: (event: FormEvent) => void;
};

export default function InputSearch({ value, onInput }: InputSearchProps) {
  return (
    <input
      className="input-search"
      type="text"
      placeholder="Search"
      value={value}
      onInput={onInput}
    />
  );
}
