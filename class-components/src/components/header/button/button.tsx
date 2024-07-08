import { Component } from 'react';
import './button.css';
type ButtonProps = {
  onClick?: () => void | undefined;
};

export default class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className="button" type="button" onClick={this.props.onClick}>
        Search
      </button>
    );
  }
}
