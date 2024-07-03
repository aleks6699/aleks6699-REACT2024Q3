import { Component } from 'react';
import './header.css';
import InputSearch from './input/input-search';
import Button from './button/button';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <InputSearch />
        <Button />
      </div>
    );
  }
}
