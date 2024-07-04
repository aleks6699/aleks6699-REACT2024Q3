import { Component, FormEvent } from 'react';
import './header.css';
import InputSearch from './input/input-search';
import Button from './button/button';

interface HeaderProps {
  inputValue: string;
  onInput: (e: FormEvent) => void;
  onClick: () => void;
}

export default class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="header">
        <InputSearch
          value={this.props.inputValue}
          onInput={this.props.onInput}
        />
        <Button onClick={this.props.onClick} />
      </div>
    );
  }
}
