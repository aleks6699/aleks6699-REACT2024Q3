import { Component } from 'react';
import './loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="loading"
        />
      </div>
    );
  }
}
