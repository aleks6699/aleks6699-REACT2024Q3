import { Component, FormEvent } from 'react';
import './input-search.css';

type InputSearchProps = {
  value?: string;
  onInput?: (event: FormEvent) => void;
};

export default class InputSearch extends Component<InputSearchProps> {
  render() {
    return (
      <input
        className="input-search"
        type="text"
        placeholder="Search"
        value={this.props.value}
        onInput={this.props.onInput}
      />
    );
  }
}
