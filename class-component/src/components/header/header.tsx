import { FormEvent } from 'react';
import './header.css';
import InputSearch from './input/input-search';
import Button from './button/button';

interface HeaderProps {
  inputValue: string;
  onInput: (e: FormEvent) => void;
  onClick: () => void;
}

export default function Header({ inputValue, onInput, onClick }: HeaderProps) {
  return (
    <div className="header">
      <InputSearch value={inputValue} onInput={onInput} />
      <Button onClick={onClick} />
    </div>
  );
}
