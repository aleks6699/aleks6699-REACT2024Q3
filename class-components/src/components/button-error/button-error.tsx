import { Component } from 'react';
import './button-error.css';
interface ButtonErrorProps {
  onClick: () => void;
}
export default class ButtonError extends Component<ButtonErrorProps> {
  render() {
    return (
      <button
        className="button-error"
        type="button"
        onClick={this.props.onClick}
      >
        Error
      </button>
    );
  }
}
